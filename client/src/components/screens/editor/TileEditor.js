import Toolbar from './Toolbar';
import {useRef, useEffect, useContext} from 'react';
import EditorContext from "../../../editor";
function TileEditor({currentTile}) {
    const { store } = useContext(EditorContext);

    const ref = useRef(null);

    useEffect(() => {
        if(ref && currentTile) {
            drawTile();
        }
    });

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
        const pixelSize = 100;
        let y = pixelSize
        for(let y = 0; y < tileSize; y++) {
            for(let x = 0; x < tileSize; x++) {
                const index = (y * tileSize + x) * 4;
                context.fillStyle = `rgba(${data[index]}, ${data[index+1]}, ${data[index+2]}, ${data[index+3]})`;
                context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
        }
    }

    const highlightPixel = (e) => {
        drawTile();
        const context = ref.current.getContext('2d');
        const rect = ref.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / 100);
        const y = Math.floor((e.clientY - rect.top) / 100);
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.fillRect(x*100, y*100, 100, 100);
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
                    />
                }
            </div>
      </main>
    )
}

export default TileEditor;