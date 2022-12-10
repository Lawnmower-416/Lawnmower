import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {useRef, useEffect, useContext} from 'react';
import EditorContext from "../../../editor";
import toast from "react-hot-toast";
function TileSidebar({ tiles, openDeleteTileModal }) {

    const { store } = useContext(EditorContext);

    function handleAddTile() {
        if(store.tilesetImage.tiles.length >= 64) {
            toast.error("You can't have more than 64 tiles in a tileset");
            return;
        }
        store.addTile();
        toast.success("Added tile");
    }

    return (
        <div className="bg-editor-primary h-screen w-64">
            <div className="flex flex-col h-full">
                <div className="flex flex-col flex-1">
                    <div className="flex-1 flex flex-col pt-5 pb-4">
                        <div className="flex items-center flex-shrink-0 px-4 justify-between">
                            <ChevronRightIcon className="h-10 w-10 text-white"/>
                            <h1 className="text-3xl text-white">Tiles</h1>
                        </div>
                        <div className="mt-5 flex-1 bg-editor-background">
                            
                        <div className="grid grid-cols-3 overflow-y-auto">
                            {tiles.map((tile, tileIndex) => (
                                <Tile 
                                    key={tileIndex}
                                    tile={tile}
                                    openDeleteTileModal={openDeleteTileModal}
                                    tileSize={store.tileset.tileSize}
                                    clickHandler={() => {
                                        store.setCurrentTile(tileIndex);
                                        store.clearTransactions();
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center">
                             <PlusCircleIcon
                                 className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer"
                                 onClick={handleAddTile}
                             />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Tile({ tile, openDeleteTileModal, tileSize, clickHandler }) {
    const ref = useRef(null);

    const { store } = useContext(EditorContext);

    useEffect(() => {
        if(ref) {
            const data = tile.data;
            const context = ref.current.getContext('2d');
            const pixelSize = Math.ceil(60 / tileSize);
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
        <canvas
            width="60"
            height="60"
            ref={ref}
            className="m-0 p-0 border-2 border-editor-background hover:border-editor-highlight hover:cursor-pointer"
            onClick={clickHandler}
            onDoubleClick={() => {
                if(store.tilesetImage && store.tilesetImage.tiles.length > 1) {
                    openDeleteTileModal();
                }
            }}
        />
    )

}

export default TileSidebar;