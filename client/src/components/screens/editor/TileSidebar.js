import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {useRef, useEffect, useContext} from 'react';
import EditorContext from "../../../editor";
function TileSidebar({ tiles, setCurrentTile, addTile }) {

    return (
        <div className="bg-editor-primary h-screen w-64">
            <div className="flex flex-col h-full">
                <div className="flex flex-col flex-1">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 justify-between">
                            <ChevronRightIcon className="h-10 w-10 text-white"/>
                            <h1 className="text-3xl text-white">Tiles</h1>
                        </div>
                        <div className="mt-5 flex-1 bg-editor-background">
                            
                        <div className="grid grid-cols-3">
                            {tiles.map((tile) => (
                                <Tile 
                                    key={tile}
                                    tile={tile}
                                    setCurrentTile={setCurrentTile}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center">
                             <PlusCircleIcon className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer" onClick={() => addTile()}/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Tile({tile, setCurrentTile }) {
    const ref = useRef(null);

    const { store } = useContext(EditorContext);

    useEffect(() => {
        if(ref) {
            const data = tile.data;
            const tileSize = store.tileset.tileSize;
            const context = ref.current.getContext('2d');
            const pixelSize = 20;
            for(let y = 0; y < tileSize; y++) {
                for (let x = 0; x < tileSize; x++) {
                    const index = (y * tileSize + x) * 4;
                    context.fillStyle = `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${data[index + 3]})`;
                    context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
                }
            }
            
        }
    })

    return (
        <canvas width="60" height="60" ref={ref} className="m-0" onClick={() => setCurrentTile(tile)}/>
    )

}

export default TileSidebar;