import Toolbar from './Toolbar';
import {useRef, useEffect, useContext} from 'react';
import EditorContext from "../../../editor";
function TileEditor({currentTile}) {
    const { store } = useContext(EditorContext);

    const ref = useRef(null);
    useEffect(() => {
        if(ref && currentTile) {
            const tileSize = store.tileset.tileSize;

            const colorData = new Uint8ClampedArray(Object.values(currentTile.data));
            //formatted as [r, g, b, a, r, g, b, a, ...]

            const context = ref.current.getContext('2d');
            //context.putImageData(new ImageData(colorData, store.tileset.tileSize, store.tileset.tileSize), 0, 0);

            //draw rgba data from colorData to canvas and scale it to fit the canvas
            const imageData = context.createImageData(tileSize, tileSize);
            for(let i = 0; i < colorData.length; i++) {
                imageData.data[i] = colorData[i];
            }
            context.putImageData(imageData, 0, 0);


        }
    })

    const zoom = (ctx, x, y) => {
        ctx.drawImage(ref,
            Math.min(Math.max(0, x - 5), 32 - 10),
            Math.min(Math.max(0, y - 5), 32 - 10),
            10, 10,
            0, 0,
            200, 200);
    };
    
    return (
        <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <Toolbar />
            <div className="flex w-full mx-auto px-6 py-8 justify-center">
                {ref && <canvas ref={ref} width="600" height="600" />}
            </div>
      </main>
    )
}

export default TileEditor;