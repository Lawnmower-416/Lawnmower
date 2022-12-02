import {useContext, useEffect, useState} from "react";
import EditHistoryModal from "../modals/EditHistoryModal";
import ExportModal from "../modals/Export";
import ShareModal from "../modals/ShareModal";
import TilesetSettingsModal from "../modals/TilesetSettingsModal";
import ColorSidebar from "./editor/ColorSidebar";
import Headerbar from "./editor/Headerbar";
import TileEditor from "./editor/TileEditor";
import TileSidebar from "./editor/TileSidebar";
import {useParams} from "react-router-dom";
import EditorContext from "../../editor";
import DeleteTileModal from "../modals/DeleteTileModal";
import NotificationHandler from "./editor/NotificationHandler";

function TilesetEditor() {
    const { tilesetId } = useParams();

    const { store } = useContext(EditorContext);

    useEffect(() => {
        store.setTileset(tilesetId);

        return () => {
            store.reset();
        }
    }, [tilesetId]);

    const tileset = store.tileset;
    const tilesetImage = store.tilesetImage;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [deleteTileOpen, setDeleteTileOpen] = useState(false);

    //TODO: Loading Icon
    if(!tileset) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <NotificationHandler />
            <TilesetSettingsModal isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
            <EditHistoryModal isOpen={historyOpen} setIsOpen={setHistoryOpen} />
            <ExportModal isOpen={exportOpen} setIsOpen={setExportOpen} />
            <ShareModal modalOpen={shareOpen} setModalOpen={setShareOpen} />
            <DeleteTileModal isOpen={deleteTileOpen} setIsOpen={setDeleteTileOpen} />

            <Headerbar
                title={tileset.title}
                setSettingsOpen={setSettingsOpen} 
                setHistoryOpen={setHistoryOpen} 
                setExportOpen={setExportOpen} 
                setShareOpen={setShareOpen}
            />
            <div className="flex h-screen">
                <ColorSidebar/>
                <TileEditor />
                <TileSidebar tiles={tilesetImage.tiles} openDeleteTileModal={() => setDeleteTileOpen(true)} />
            </div>
        </div>
        
    )
}

export default TilesetEditor;