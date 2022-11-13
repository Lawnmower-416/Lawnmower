import {useContext, useEffect, useState} from "react";
import EditHistoryModal from "../modals/EditHistoryModal";
import ExportModal from "../modals/Export";
import ModalOne from "../modals/ShareModal/Share";
import TilesetSettingsModal from "../modals/TilesetSettingsModal";
import ColorSidebar from "./editor/ColorSidebar";
import Headerbar from "./editor/Headerbar";
import TileEditor from "./editor/TileEditor";
import TileSidebar from "./editor/TileSidebar";
import {useParams} from "react-router-dom";
import EditorContext from "../../editor";

function TilesetEditor() {
    const { tilesetId } = useParams();

    const { store } = useContext(EditorContext);

    useEffect(() => {
        store.setTileset(tilesetId);

    }, [tilesetId]);

    const tileset = store.tileset;
    const tilesetImage = store.tilesetImage;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

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

    //TODO: Loading Icon
    if(!tileset) {
        return <div>Loading...</div>
    }

    console.log(tilesetImage)

    return (
        <div>
            <TilesetSettingsModal isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
            <EditHistoryModal isOpen={historyOpen} setIsOpen={setHistoryOpen} />
            <ExportModal isOpen={exportOpen} setIsOpen={setExportOpen} />
            <ModalOne modalOpen={shareOpen} setModalOpen={setShareOpen} />

            <Headerbar
                title={tileset.title}
                setSettingsOpen={setSettingsOpen} 
                setHistoryOpen={setHistoryOpen} 
                setExportOpen={setExportOpen} 
                setShareOpen={setShareOpen}
            />
            <div className="flex h-screen">
                <ColorSidebar colors={colors} addColor={addColor} />
                <TileEditor currentTile={tilesetImage.tiles[0]}/>
                <TileSidebar tiles={[]} setCurrentTile={setCurrentTile} addTile={addTile}/>
            </div>
        </div>
        
    )
}

export default TilesetEditor;