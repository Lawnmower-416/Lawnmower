import Toolbar from './Toolbar';
import { useRef, useEffect } from 'react';
function TileEditor({currentTile}) {
    const ref = useRef(null);
    useEffect(() => {
        if(ref && currentTile) {
            const pixelSize = 200;

            const data = currentTile.data;
            const context = ref.current.getContext('2d');
            for(let i = 0; i < data.length; i++) {
                for(let j = 0; j < data[i].length; j++) {
                    context.fillStyle = `rgb(${data[i][j][0]}, ${data[i][j][1]}, ${data[i][j][2]})`;
                    context.fillRect(i*pixelSize,j*pixelSize, pixelSize, pixelSize)
                }
            }
            
        }
    })
    
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