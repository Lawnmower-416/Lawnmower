import Toolbar from './Toolbar';
import {useRef, useEffect, useContext, useState} from 'react';
import EditorContext, {EditorTool} from "../../../editor";

import { io } from "socket.io-client";
import AuthContext from "../../../auth";

import toast from 'react-hot-toast';


function MainEditor() {
    const { store } = useContext(EditorContext);
    const { auth } = useContext(AuthContext);

    const MAX_ZOOM = 5;
    const MIN_ZOOM = 0.01;
    const ZOOM_SPEED = 0.005;

    const canvasHeight = 576;
    const canvasWidth = 1024;

    const [socket, setSocket] = useState(null);

    const [dragStart, setDragStart] = useState(null);
    const [lastHoverTile, setLastHoverTile] = useState(null);
    const [worker, setWorker] = useState(null);

    const [socketConfigured, setSocketConfigured] = useState(false);

    const [cameraOffset, setCameraOffset] = useState({x: canvasWidth / 2, y: canvasHeight / 2});
    const [lastPoint , setLastPoint] = useState({x: window.innerWidth / 2, y: window.innerHeight / 2});
    const [translateDragStart, setTranslateDragStart] = useState(null);

    const [lastRedraw, setLastRedraw] = useState(null);

    const layers = store.layers;
    const currentLayer = store.layers[store.currentLayer];

    let cameraZoom = 1;
    let isDragging = false;




    const ref = useRef(null);
    const highlightRef = useRef(null);

    useEffect(() => {
        const socket = io("http://34.193.24.27:3000");//"http://localhost:3000");

        socket.on("disconnect", () => {
            toast.error("Disconnected from server");
        });

        socket.on("newUserJoin", (data) => {
            toast(data.message);
        });

        socket.on("userLeft", (data) => {
            toast(data.message);
        });

        socket.on("userConnected", (data) => {
            toast.success(data.message);
        });

        socket.emit("join", {
            id:store.map._id,
            username: auth.user.username
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, [store.map && store.map._id]);

    useEffect(() => {
        if(socket && worker && !socketConfigured) {
            socket.on("place", (data) => {
                console.log(data);
                const {x, y, tileIndex, layerId} = data;
                store.placeTile(x, y, tileIndex, layerId, true);
                const layer = store.layers.find(layer => layer._id === layerId);
                worker.postMessage({type: 'redrawCoordinate', data: {
                    x,
                    y,
                    currentLayer: layer,
                    mapTilesets: store.mapTilesets
                }});
            });
            setSocketConfigured(true);
        }
    }, [worker]);

    useEffect(() => {
        const canvas = ref.current;
        const offscreenCanvas = canvas.transferControlToOffscreen();

        const worker = new Worker(new URL('../../../canvasWorker/worker.js', import.meta.url), {type: 'module'});
        setWorker(worker);
        worker.onmessage = (e) => {
            console.log(e.data);
        }

        worker.postMessage({type: 'INIT', data: {
            canvas: offscreenCanvas,
            mapHeight: store.map.height,
            mapWidth: store.map.width,
            tileSize: store.map.tileSize,
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
        }}, [offscreenCanvas]);

        const handleScroll = event => {
            //const timer = setTimeout(() => {
            const mousex = event.clientX - canvas.offsetLeft;
            const mousey = event.clientY - canvas.offsetTop;

                cameraZoom += event.deltaY * ZOOM_SPEED;
                cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
                cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
                console.log(cameraZoom);
                worker.postMessage({type: 'drawMap', data: {
                    layers: layers,
                    mapTilesets: store.mapTilesets,
                    cameraZoom: cameraZoom,
                    cameraOffset
               }});
            //}, 3000);
        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            worker.terminate();
        };
    }, [store.mapHeight]);


    useEffect(() => {
        if (worker) {
            worker.postMessage({type: 'drawMap', data: {
                layers,
                mapTilesets: store.mapTilesets,
                cameraZoom,
                cameraOffset
            }});
        }
    }, [currentLayer && currentLayer.visible]);

    useEffect(() => {
        if(worker) {
            worker.postMessage({type: 'drawMap', data: {
                layers,
                mapTilesets: store.mapTilesets,
                cameraZoom,
                cameraOffset
            }});
        }
    }, [store.dataPasted]);

    useEffect(() => {
        highlightPixels();
    }, [store.selectedPixels]);

    const highlightPixels = () => {
        const selectedPixels = store.selectedPixels;
        const highlight = highlightRef.current.getContext('2d');
        highlight.clearRect(0, 0, canvasWidth, canvasHeight);
        if(selectedPixels.length >= 2) {
            const {x: startX, y: startY} = selectedPixels[0];
            const {x: endX, y: endY} = selectedPixels[selectedPixels.length - 1];
            const width = endX - startX;
            const height = endY - startY;
            const tileSize = store.map.tileSize;
            highlight.fillStyle = 'rgba(255, 255, 255, 0.5)';
            highlight.fillRect(startX * tileSize, startY * tileSize, width * tileSize, height * tileSize);
        }
    }

    const handleClick = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / store.map.tileSize);
        const y = Math.floor((e.clientY - rect.top) / store.map.tileSize);
        switch(store.currentTool) {
            case EditorTool.SELECT:
                store.setSelectedPixels([{x, y}]);
                break;

            case EditorTool.PAINT:
                if(currentLayer.locked) {
                    toast.error("This layer is locked");
                    return;
                }
                store.placeTile(x, y)
                worker.postMessage({type: 'redrawCoordinate', data: {
                    x,
                    y,
                    currentLayer,
                    mapTilesets: store.mapTilesets
                }});
                socket.emit("place", {
                    x,
                    y,
                    tileIndex: store.currentTileIndex,
                    layerId: currentLayer._id
                });
            break;

            case EditorTool.FILL:
                if(currentLayer.locked) {
                    toast.error("This layer is locked");
                    return;
                }
                const rerenderList = store.mapFloodFill(x, y);
                if (rerenderList.length > 100) {
                    worker.postMessage({type: 'drawMap', data: {
                        layers,
                        mapTilesets: store.mapTilesets,
                        cameraZoom
                    }});
                } else{
                    for (let i = 0; i < rerenderList.length; i++) {
                        worker.postMessage({type: 'redrawCoordinate', data: {
                            x: rerenderList[i].x,
                            y: rerenderList[i].y,
                            currentLayer,
                            mapTilesets: store.mapTilesets
                        }});
                    }
                }
            break;

            default:
                console.log("Not implemented");
                break;
        }
    }

    const handleHover = (e) => {
        if(translateDragStart !== null) {
            let x = e.clientX - translateDragStart.x;
            let y = e.clientY - translateDragStart.y;
            setCameraOffset({x, y});

            //run this only 5 times per second
            if(Date.now() - lastRedraw > 200) {
                worker.postMessage({type: 'drawMap', data: {
                    layers,
                    mapTilesets: store.mapTilesets,
                    cameraZoom,
                    cameraOffset
                }});
                setLastRedraw(Date.now());
            }
        }

        const tileSize = store.map.tileSize;
        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / tileSize);
        const y = Math.floor((e.clientY - rect.top) / tileSize);
        const highlight = highlightRef.current.getContext('2d');
        if(lastHoverTile) {
            if(lastHoverTile.x === x && lastHoverTile.y === y) return;
            if(store.selectedPixels.length >= 2) {
                if(x >= store.selectedPixels[0].x && x <= store.selectedPixels[store.selectedPixels.length - 1].x && y >= store.selectedPixels[0].y && y <= store.selectedPixels[store.selectedPixels.length - 1].y) return;
            }
            //highlight.clearRect(lastHoverTile.x * tileSize, lastHoverTile.y * tileSize, tileSize, tileSize);
            highlight.clearRect(0, 0, canvasWidth, canvasHeight);
        }
        highlightPixels();
        highlight.fillStyle = "rgba(255, 255, 255, 0.5)";
        highlight.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        setLastHoverTile({x, y});
    }

    const handleDragStart = (e) => {
        if(store.currentTool === EditorTool.SELECT) {
            let x = e.clientX / cameraZoom - cameraOffset.x;
            let y = e.clientY / cameraZoom - cameraOffset.y;
            setTranslateDragStart({x,y});
        }
        if(store.currentTool !== EditorTool.REGION) return;

        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / store.map.tileSize);
        const y = Math.floor((e.clientY - rect.top) / store.map.tileSize);
        setDragStart({x, y});
    }

    const handleDragEnd = (e) => {
        if(store.currentTool === EditorTool.SELECT) {
            setTranslateDragStart(null);
        }
        if(store.currentTool !== EditorTool.REGION) return;

        const rect = ref.current.getBoundingClientRect();
        const endX = Math.floor((e.clientX - rect.left) / store.map.tileSize);
        const endY = Math.floor((e.clientY - rect.top) / store.map.tileSize);

        const {x: startX, y: startY} = dragStart;
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);
        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);

        const selectedTiles = [];
        for(let i = minX; i <= maxX; i++) {
            for(let j = minY; j <= maxY; j++) {
                selectedTiles.push({x: i, y: j});
            }
        }
        store.setSelectedPixels(selectedTiles);
    }

    return (
        <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <Toolbar />
            <div className="flex w-full mx-auto px-6 py-8 justify-center">
                {ref === null || highlightRef === null ? <div /> : (
                    <>
                        <canvas
                            ref={highlightRef}
                            width={canvasWidth}
                            height={canvasHeight}
                            onMouseMove={handleHover}
                            onMouseDown={handleDragStart}
                            onMouseUp={handleDragEnd}
                            onClick={handleClick}
                            className="border-dark-gray border-2 absolute z-10"
                        />
                        <canvas
                            className="border-dark-gray border-2 absolute z-[0]"
                            ref={ref}
                            width={canvasWidth}
                            height={canvasHeight}
                        />
                    </>)
                }
            </div>
      </main>
    )
}

export default MainEditor;