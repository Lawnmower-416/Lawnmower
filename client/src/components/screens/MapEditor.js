import Headerbar from "./editor/Headerbar";
import LayerSidebar from "./editor/LayerSidebar";
import MainEditor from "./editor/MainEditor";
import TileSidebar from "./editor/TileSidebar";

function MapEditor() {
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
            <Headerbar />
            <div className="flex h-screen">
                <LayerSidebar layers={layers}/>
                <MainEditor />
                <TilesetSidebar tilesets={tilesets}/>
            </div>
        </div>
        
    )
}

export default MapEditor;