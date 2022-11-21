import Toolbar from './Toolbar';
import {useRef, useEffect, useContext} from 'react';
import EditorContext, {EditorTool} from "../../../editor";

function MainEditor(props) {
    const { store } = useContext(EditorContext);

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
    useEffect(() => {
        drawMap();
    }, [currentLayer.visible]);

    const drawMap = () => {
        const mapHeight = store.map.height;
        const mapWidth = store.map.width;
        const tileSize = store.map.tileSize;

        // number of tiles that can fix in the canvas
        const tilesPerRow = Math.floor(canvasWidth / tileSize);
        const tilesPerColumn = Math.floor(canvasHeight / tileSize);

        const context = ref.current.getContext('2d');

        context.clearRect(0, 0, canvasHeight, canvasWidth);
        //context.translate(innerWidth / 2, innerHeight / 2);
        context.scale(cameraZoom, cameraZoom);
        let count = 0

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
                    count += 1
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
        console.log(count);
    }

    const redrawCoordinate = (i,j) => {
        console.log(i,j, store.layers[store.currentLayer].data[j * store.map.width + i]);
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

    const handleClick = (e) => {
        switch(store.currentTool) {
            case EditorTool.PAINT:
                const rect = ref.current.getBoundingClientRect();
                const x = Math.floor((e.clientX - rect.left) / store.map.tileSize);
                const y = Math.floor((e.clientY - rect.top) / store.map.tileSize);
                store.placeTile(x, y).then(() => {
                    redrawCoordinate(x,y);
                });
            break;
        }
    }



    return (
        <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <Toolbar />
            <div className="flex w-full mx-auto px-6 py-8 justify-center">
                {ref === null ? <div /> : (
                    <>
                        <canvas
                            ref={ref}
                            width={canvasWidth}
                            height={canvasHeight}
                            onClick={handleClick}
                        />
                    </>)
                }
            </div>
      </main>
    )
}

export default MainEditor;