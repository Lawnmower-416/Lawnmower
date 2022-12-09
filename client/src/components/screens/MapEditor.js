import Headerbar from "./editor/Headerbar";
import LayerSidebar from "./editor/LayerSidebar";
import MainEditor from "./editor/MainEditor";
import TilesetSidebar from "./editor/TilesetSidebar";
import {useContext, useEffect, useState} from "react";
import MapSettingsModal from "../modals/MapSettingsModal";
import ExportModal from "../modals/Export";
import EditHistoryModal from "../modals/EditHistoryModal";
import ImportTilesetModal from "../modals/ImportTilesetModal";
import {useNavigate, useParams} from "react-router-dom";
import EditorContext from "../../editor";
import ShareModal from "../modals/ShareModal";

import {Toaster} from "react-hot-toast";



function MapEditor() {
    const { mapId } = useParams();

    const { store } = useContext(EditorContext);

    const navigator = useNavigate();

    useEffect(() => {
        async function loadMap() {
            store.reset();
            return await store.setMap(mapId);
        }

        loadMap().then(success => {
            if(!success) {
                navigator('/unauthorized');
            }
        });

        return () => {
            store.reset();
        }
    }, [mapId]);

    const map = store.map;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);

    const [shareOpen, setShareOpen] = useState(false);

    if(!map) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <MapSettingsModal isOpen={settingsOpen} setIsOpen={setSettingsOpen}/>
            <EditHistoryModal isOpen={historyOpen} setIsOpen={setHistoryOpen} />
            <ExportModal isOpen={exportOpen} setIsOpen={setExportOpen} map={mapId} mapTitle={store.map.title} tileset={null} tilesetTitle={null}/>
            <ImportTilesetModal isOpen={importOpen} setIsOpen={setImportOpen} />
            <ShareModal modalOpen={shareOpen} setModalOpen={setShareOpen} />

            <Headerbar
                title={store.map.title}
                setSettingsOpen={setSettingsOpen} 
                setHistoryOpen={setHistoryOpen} 
                setExportOpen={setExportOpen} 
                setShareOpen={setShareOpen} 
            />
            <div className="flex h-screen">
                <LayerSidebar/>
                <MainEditor/>
                <TilesetSidebar setImportOpen={setImportOpen}/>
            </div>
        </div>
        
    )
}

export default MapEditor;