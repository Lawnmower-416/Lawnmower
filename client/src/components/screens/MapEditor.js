import Headerbar from "./editor/Headerbar";
import LayerSidebar from "./editor/LayerSidebar";
import MainEditor from "./editor/MainEditor";
import TilesetSidebar from "./editor/TilesetSidebar";
import { useState } from "react";
import MapSettingsModal from "../modals/MapSettingsModal";
import ExportModal from "../modals/Export";
import EditHistoryModal from "../modals/EditHistoryModal";


function MapEditor() {    
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);

    const layers = [
        { name: 'Layer 1', current: true, isLocked: false, isVisible: true },
        { name: 'Layer 2', current: false, isLocked: true, isVisible: false },
        { name: 'Layer 3', current: false, isLocked: false, isVisible: true },
    ]

    const tilesets = [
        { _id: "1", name: 'Tileset 1', current: true, ref: null, src: "https://global.discourse-cdn.com/standard10/uploads/processingfoundation1/original/3X/8/4/8425ec0b68f8645ac72a02c2cd7b9d45f0467ff2.jpeg" }
    ]

    return (
        <div>
            <MapSettingsModal isOpen={settingsOpen} setIsOpen={setSettingsOpen}/>
            <EditHistoryModal isOpen={historyOpen} setIsOpen={setHistoryOpen} />
            <ExportModal isOpen={exportOpen} setIsOpen={setExportOpen} />
            <Headerbar setSettingsOpen={setSettingsOpen} setHistoryOpen={setHistoryOpen} setExportOpen={setExportOpen}/>
            <div className="flex h-screen">
                <LayerSidebar layers={layers}/>
                <MainEditor />
                <TilesetSidebar tilesets={tilesets}/>
            </div>
        </div>
        
    )
}

export default MapEditor;