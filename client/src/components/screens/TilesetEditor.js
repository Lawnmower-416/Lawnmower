

import { useState } from "react";
import TilesetSettingsModal from "../modals/TilesetSettingsModal";
import ColorSidebar from "./editor/ColorSidebar";
import Headerbar from "./editor/Headerbar";
import TileEditor from "./editor/TileEditor";
import TileSidebar from "./editor/TileSidebar";

function TilesetEditor() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState({red: 0, green: 0, blue: 0, alpha: 255});
    const [currentTile, setCurrentTile] = useState(null);

    function addColor({red, blue, green}) {
        colors.push({red, blue, green, alpha: 255});
    }

    function addTile() {
        const newTileData = [];

        for(let i = 0; i < 3; i++) {
            const row = [];
            for(let j = 0; j < 3; j++) {
                row.push({red: 0, green: 0, blue: 0, alpha: 255});
            }
            newTileData.push(row);
        }
        tiles.push({_id: tiles.length.toString(), data: newTileData});
    }

    const colors = [
        {
            red: 255,
            green: 0,
            blue: 0,
            alpha: 255,
        },
        {
            red: 0,
            green: 255,
            blue: 0,
            alpha: 255,
        },
        {
            red: 0,
            green: 0,
            blue: 255,
            alpha: 255,
        },
    ]

    const tiles = [
        { _id: "0", 
            data: [
                [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
                [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
                [[255, 0, 0], [0, 255, 0], [0, 0, 255]]
            ] 
        },
        { _id: "1",
            data: [
                [[255, 255, 0], [0, 255, 255], [255, 255, 255]],
                [[255, 0, 0], [0, 0, 0], [0, 0, 255]],
                [[128, 128, 128], [55, 128, 100], [236, 23, 190]]
            ]
        },
    ]

    console.log(tiles);

    return (
        <div>
            <TilesetSettingsModal isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
            <Headerbar setSettingsOpen={setSettingsOpen}/>
            <div className="flex h-screen">
                <ColorSidebar colors={colors} currentColor={currentColor} setCurrentColor={setCurrentColor} addColor={addColor} />
                <TileEditor currentTile={currentTile}/>
                <TileSidebar tiles={tiles} setCurrentTile={setCurrentTile} addTile={addTile}/>
            </div>
        </div>
        
    )
}

export default TilesetEditor;