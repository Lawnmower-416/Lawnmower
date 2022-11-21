import Toolbar from './Toolbar';
import {useRef, useEffect, useContext, useState} from 'react';
import EditorContext, {EditorTool} from "../../../editor";

function MainEditor(props) {
    const { store } = useContext(EditorContext);

    const [dragStart, setDragStart] = useState(null);
    const [lastHoverTile, setLastHoverTile] = useState(null);

    const layers = store.layers;
    const currentLayer = store.layers[store.currentLayer];

    let cameraOffset = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    let cameraZoom = 1;
    const MAX_ZOOM = 4;
    const MIN_ZOOM = 0.25;
    const ZOOM_SPEED = 0.1;

    const canvasHeight = 576;
    const canvasWidth = 1024;


    const ref = useRef(null);
    const highlightRef = useRef(null);
    useEffect(() => {
        drawMap();
    }, [layers, currentLayer && currentLayer.data, currentLayer && currentLayer.visible]);

    useEffect(() => {
        highlightPixels();
    }, [store.selectedPixels]);

    const drawMap = () => {
        const mapHeight = store.map.height;
        const mapWidth = store.map.width;
        const tileSize = store.map.tileSize;

        // number of tiles that can fix in the canvas
        const tilesPerRow = Math.floor(canvasWidth / tileSize);
        const tilesPerColumn = Math.floor(canvasHeight / tileSize);

        const context = ref.current.getContext('2d');

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        console.log("cleared")
        //context.translate(innerWidth / 2, innerHeight / 2);
        context.scale(cameraZoom, cameraZoom);

        for(let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if(!layer.visible) continue;
            for(let j = 0; j < mapHeight; j++) {
                for(let i = 0; i < mapWidth; i++) {
                    const index = j * mapWidth + i;
                    const tileIndex = layer.data[index];
                    if(tileIndex === -1) continue;
                    const tile = store.tiles[tileIndex];
                    const colorData = new Uint8ClampedArray(Object.values(tile.data));
                    for(let y = 0; y < tileSize; y++) {
                        for(let x = 0; x < tileSize; x++) {
                            const index = (y * tileSize + x) * 4;
                            context.fillStyle = `rgba(${colorData[index]}, ${colorData[index+1]}, ${colorData[index+2]}, ${colorData[index+3]})`;
                            context.fillRect(x + (i * tileSize), y + (j * tileSize), 1, 1);
                        }
                    }
                }
            }
        }
    }

    const redrawCoordinate = (i,j) => {
        const mapHeight = store.map.height;
        const mapWidth = store.map.width;
        const tileSize = store.map.tileSize;
        const context = ref.current.getContext('2d');
        const layer = layers[store.currentLayer];
        const index = j * mapWidth + i;
        const tileIndex = layer.data[index];
        context.clearRect(i*tileSize, j*tileSize, tileSize, tileSize);
        if(tileIndex === -1) return;
        const tile = store.tiles[tileIndex];
        const colorData = new Uint8ClampedArray(Object.values(tile.data));
        for(let y = 0; y < tileSize; y++) {
            for(let x = 0; x < tileSize; x++) {
                const index = (y * tileSize + x) * 4;
                context.fillStyle = `rgba(${colorData[index]}, ${colorData[index+1]}, ${colorData[index+2]}, ${colorData[index+3]})`;
                context.fillRect(x + (i * tileSize), y + (j * tileSize), 1, 1);
            }
        }
    }

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
                store.placeTile(x, y).then(() => {
                    redrawCoordinate(x,y);
                });
            break;

            case EditorTool.FILL:
                store.mapFloodFill(x, y).then((rerenderList) => {
                    for (let i = 0; i < rerenderList.length; i++) {
                        redrawCoordinate(rerenderList[i].x, rerenderList[i].y);
                    }
                });
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
            highlight.clearRect(lastHoverTile.x * tileSize, lastHoverTile.y * tileSize, tileSize, tileSize);
        }
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
                console.log(store.layers[store.currentLayer].data[j * store.map.width + i]);
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