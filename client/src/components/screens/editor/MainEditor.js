import Toolbar from './Toolbar';
import {useRef, useEffect, useContext, useState} from 'react';
import EditorContext, {EditorTool} from "../../../editor";

import { io } from "socket.io-client";
import AuthContext from "../../../auth";


function MainEditor() {
    const { store } = useContext(EditorContext);
    const { auth } = useContext(AuthContext);

    const [socket, setSocket] = useState(null);

    const [dragStart, setDragStart] = useState(null);
    const [lastHoverTile, setLastHoverTile] = useState(null);
    const [worker, setWorker] = useState(null);

    const [socketConfigured, setSocketConfigured] = useState(false);

    const layers = store.layers;
    const currentLayer = store.layers[store.currentLayer];

    let cameraOffset = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    let cameraZoom = 1;
    let isDragging = false;
    const MAX_ZOOM = 5;
    const MIN_ZOOM = 0.01;
    const ZOOM_SPEED = 0.0005;

    const canvasHeight = 576;
    const canvasWidth = 1024;


    const ref = useRef(null);
    const highlightRef = useRef(null);

    useEffect(() => {
        const socket = io("http://localhost:3000");



        socket.on("disconnect", () => {
            store.setNotification({
                message: "Disconnected from server",
                type: "error"
            });
        });

        socket.on("newUserJoin", (data) => {
            store.setNotification(data);
        });

        socket.on("userLeft", (data) => {
            store.setNotification(data);
        });

        socket.on("userConnected", (data) => {
            store.setNotification(data);
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
                worker.postMessage({type: 'redrawCoordinate', data: {x, y, currentLayer: layer, tiles: store.tiles}});
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
            layers: layers,
            tiles: store.tiles
        }}, [offscreenCanvas]);

        const handleScroll = event => {
            //const timer = setTimeout(() => {
                cameraZoom += event.deltaY * ZOOM_SPEED;
                cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
                cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
                worker.postMessage({type: 'drawMap', data: {
                    layers: layers,
                    tiles: store.tiles,
                    cameraZoom: cameraZoom
               }});
            //}, 3000);
        };

        //window.addEventListener('wheel', handleScroll);

        return () => {
            //window.removeEventListener('wheel', handleScroll);
            worker.terminate();
        };
    }, [store.mapHeight]);


    useEffect(() => {
        if (worker) {
            worker.postMessage({type: 'drawMap', data: {layers, tiles: store.tiles, cameraZoom}});
        }
    }, [currentLayer && currentLayer.visible]);

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
                store.placeTile(x, y)
                worker.postMessage({type: 'redrawCoordinate', data: {x, y, currentLayer, tiles: store.tiles}});
                socket.emit("place", {
                    x,
                    y,
                    tileIndex: store.currentTileIndex,
                    layerId: currentLayer._id
                });
            break;

            case EditorTool.FILL:
                const rerenderList = store.mapFloodFill(x, y);
                if (rerenderList.length > 100) {
                    worker.postMessage({type: 'drawMap', data: {layers, tiles: store.tiles, cameraZoom}});
                } else{
                    for (let i = 0; i < rerenderList.length; i++) {
                        worker.postMessage({type: 'redrawCoordinate', data: {x: rerenderList[i].x, y: rerenderList[i].y, currentLayer, tiles: store.tiles}});
                    }
                }
            break;

            default:
                console.log("Not implemented");
                break;
        }
    }

    const handleHover = (e) => {
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
        if(store.currentTool !== EditorTool.REGION) return;

        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / store.map.tileSize);
        const y = Math.floor((e.clientY - rect.top) / store.map.tileSize);
        setDragStart({x, y});
    }

    const handleDragEnd = (e) => {
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