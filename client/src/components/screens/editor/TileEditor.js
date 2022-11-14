import Toolbar from './Toolbar';
import {useRef, useEffect, useContext} from 'react';
import EditorContext, {EditorTool} from "../../../editor";
function TileEditor() {
    const { store } = useContext(EditorContext);

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
    }, [store.currentTileIndex]);

    const drawTile = () => {
        const tileSize = store.tileset.tileSize;

        const colorData = new Uint8ClampedArray(Object.values(currentTile.data));
        //formatted as [r, g, b, a, r, g, b, a, ...]

        //context.putImageData(new ImageData(colorData, store.tileset.tileSize, store.tileset.tileSize), 0, 0);
        const context = ref.current.getContext('2d');
        //draw rgba data from colorData to canvas and scale it to fit the canvas
        // const imageData = context.createImageData(tileSize, tileSize);
        // for(let i = 0; i < colorData.length; i++) {
        //     imageData.data[i] = colorData[i];
        // }
        // context.putImageData(imageData, 0, 0);
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

            case EditorTool.REGION:
                store.addSelectedPixel({x, y});
                break;

            case EditorTool.PAINT:
                changePixel(e);
                break;
        }
    }

    const changePixel = (e) => {
        if(store.currentTool !== EditorTool.PAINT) return;
        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / pixelSize);
        const y = Math.floor((e.clientY - rect.top) / pixelSize);
        const color = store.currentColor;
        const index = (y * store.tileset.tileSize + x) * 4;
        const data = currentTile.data;
        data[index] = color.red;
        data[index+1] = color.green;
        data[index+2] = color.blue;
        data[index+3] = color.alpha;
        drawTile();

        const context = ref.current.getContext('2d');

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
                        onMouseMove={(e) => highlightPixel(e)}
                        onClick={handleClick}
                    />
                }
            </div>
      </main>
    )
}

export default TileEditor;