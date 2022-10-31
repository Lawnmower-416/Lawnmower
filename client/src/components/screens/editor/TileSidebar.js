import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useRef, useState, useEffect } from 'react';
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
                                    key={tile._id}
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

    useEffect(() => {
        if(ref) {
            const data = tile.data;
            const context = ref.current.getContext('2d');
            for(let i = 0; i < data.length; i++) {
                for(let j = 0; j < data[i].length; j++) {
                    context.fillStyle = `rgb(${data[i][j][0]}, ${data[i][j][1]}, ${data[i][j][2]})`;
                    context.fillRect(i*20,j*20, 20, 20)
                }
            }
            
        }
    })

    return (
        <canvas width="60" height="60" ref={ref} className="m-0" onClick={() => setCurrentTile(tile)}/>
    )

}

export default TileSidebar;