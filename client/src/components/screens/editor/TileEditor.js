import Toolbar from './Toolbar';
import {useRef, useEffect, useContext, useState} from 'react';
import EditorContext, {EditorTool} from "../../../editor";
import TileEditTransaction from "../../../transactions/TileEditTransaction";
function TileEditor() {
    const { store } = useContext(EditorContext);

    const [dragStart, setDragStart] = useState(null);

    const ref = useRef(null);

    const pixelSize = Math.ceil(600 / store.tileset.tileSize);

    const currentTile = store.tilesetImage.tiles[store.currentTileIndex];

    useEffect(() => {
        if(ref && currentTile) {
            drawTile();
        }
    });

    useEffect(() => {
        drawTile();
    }, [store.currentTileIndex, store.tilesetImage, store.selectedPixels]);

    const drawTile = () => {
        const tileSize = store.tileset.tileSize;

        const colorData = new Uint8ClampedArray(Object.values(currentTile.data));
        //formatted as [r, g, b, a, r, g, b, a, ...]

        const context = ref.current.getContext('2d');

        const data = colorData;
        for(let y = 0; y < tileSize; y++) {
            for(let x = 0; x < tileSize; x++) {
                const index = (y * tileSize + x) * 4;
                context.fillStyle = `rgba(${data[index]}, ${data[index+1]}, ${data[index+2]}, ${data[index+3]})`;
                context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
        }

        const selectedPixels = store.selectedPixels;
        if(selectedPixels) {
            for(let i = 0; i < selectedPixels.length; i++) {
                const pixel = selectedPixels[i];
                context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                context.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
            }
        }
    }

    const highlightPixel = (e) => {
        if(!currentTile) return;
        drawTile();
        const context = ref.current.getContext('2d');
        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / pixelSize);
        const y = Math.floor((e.clientY - rect.top) / pixelSize);
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    }

    const handleClick = (e) => {
        if(!currentTile) return;

        const context = ref.current.getContext('2d');
        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / pixelSize);
        const y = Math.floor((e.clientY - rect.top) / pixelSize);

        switch (store.currentTool) {
            case EditorTool.SELECT:
                store.selectPixel({x, y});
                drawTile();
                context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
                break;

            case EditorTool.PAINT:
                changePixel(e);
                break;

            case EditorTool.FILL:
                store.floodFill(x, y)
                break;
        }
    }

    const changePixel = (e) => {
        if(store.currentTool !== EditorTool.PAINT) return;

        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / pixelSize);
        const y = Math.floor((e.clientY - rect.top) / pixelSize);

        const color = store.currentColor;
        const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;

        const oldColor = {
            red: currentTile.data[redIndex],
            green: currentTile.data[greenIndex],
            blue: currentTile.data[blueIndex],
            alpha: currentTile.data[alphaIndex]
        }

        store.addTransaction(new TileEditTransaction(
            oldColor,
            color,
            x,
            y,
            store.editTile
        ));

        drawTile();
    }

    const handleDragStart = (e) => {
        if(store.currentTool !== EditorTool.REGION) return;

        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / pixelSize);
        const y = Math.floor((e.clientY - rect.top) / pixelSize);
        setDragStart({x, y});
    }

    const handleDragEnd = (e) => {
        if(store.currentTool !== EditorTool.REGION) return;

        const rect = ref.current.getBoundingClientRect();
        const endX = Math.floor((e.clientX - rect.left) / pixelSize);
        const endY = Math.floor((e.clientY - rect.top) / pixelSize);

        const {x: startX, y: startY} = dragStart;
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);
        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);

        const selectedPixels = [];
        for(let y = minY; y <= maxY; y++) {
            for(let x = minX; x <= maxX; x++) {
                selectedPixels.push({x, y});
            }
        }

        store.setSelectedPixels(selectedPixels);
    }
    
    return (
        <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <Toolbar />
            <div className="flex w-full mx-auto px-6 py-8 justify-center">
                {ref &&
                    <canvas
                        ref={ref}
                        width="600"
                        height="600"
                        onMouseMove={highlightPixel}
                        onClick={handleClick}
                        onMouseDown={handleDragStart}
                        onMouseUp={handleDragEnd}
                    />
                }
            </div>
      </main>
    )
}

export default TileEditor;