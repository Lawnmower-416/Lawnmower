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
                <ColorSidebar />
                <TileEditor currentTile={tilesetImage.tiles[0]}/>
                <TileSidebar tiles={[]} setCurrentTile={setCurrentTile} />
            </div>
        </div>
        
    )
}

export default TilesetEditor;