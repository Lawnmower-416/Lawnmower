import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {useRef, useState, useEffect, useContext} from 'react';
import EditorContext from "../../../editor";
import {Tile} from "./TileSidebar";
function TilesetSidebar({ setImportOpen }) {

    const { store } = useContext(EditorContext);

    const tilesets = store.mapTilesets;

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
                            
                        <div>
                            {tilesets.map((tileset) => (
                                <TilesetContent 
                                    key={tileset._id}
                                    name={tileset.title}
                                    current={tileset.current}
                                    tiles={tileset.imageData.tiles}
                                    tileSize={store.map.tileSize}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center">
                             <PlusCircleIcon
                                 className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer"
                                 onClick={() => setImportOpen(true)}
                             />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TilesetContent({name, current, tiles, tileSize}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-white">
            <div className="bg-editor-secondary" onClick={() => setOpen(!open)}>
                <div className="text-white flex items-center">
                    {name}
                    {open ? <ChevronDownIcon className="h-6 w-6 text-white"/> : <ChevronRightIcon className="h-6 w-6 text-white"/>}
                </div>
            </div>
            {
                open && (
                    <div className="grid grid-cols-3">
                        {tiles.map((tile, tileIndex) => (
                            <Tile
                                key={tileIndex}
                                tile={tile}
                                index={tileIndex}
                                tileSize={tileSize}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default TilesetSidebar;