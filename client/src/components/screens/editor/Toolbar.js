import { 
    ArrowUpRightIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, RectangleGroupIcon, ScissorsIcon,
    ClipboardIcon, DocumentDuplicateIcon, PaintBrushIcon
} from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import {useContext} from "react";
import EditorContext, {EditorTool} from "../../../editor";
import BulkTileChangeTransaction from "../../../transactions/BulkTileChangeTransaction";
import toast from "react-hot-toast";

function Toolbar() {

    const { store } = useContext(EditorContext);

    const currentTool = store.currentTool;

    const isSelect = currentTool === EditorTool.SELECT;
    const isRegion = currentTool === EditorTool.REGION;
    const isPaint = currentTool === EditorTool.PAINT;
    const isFill = currentTool === EditorTool.FILL;

    const handleCopy = () => {
        navigator.clipboard.write(
            // eslint-disable-next-line no-undef
            [new ClipboardItem({'text/plain': new Blob([JSON.stringify(store.getCopyData())], {type: 'text/plain'})})
            ]).then(r => {
                toast.success('Copied to clipboard')
        });
     }

    const handleCut = () => {
        const isTileset = store.tileset !== null;

        const minX = Math.min(...store.selectedPixels.map(p => p.x));
        const minY = Math.min(...store.selectedPixels.map(p => p.y));
        //Undo subtracting done in copy calculation to get actual position
        let oldData;
        if(isTileset) {
            oldData = store.getCopyData().map(p => {
                return {
                    x:p.x + minX,
                    y:p.y + minY,
                    color:p.color
                }
            });
        } else {
            oldData = store.getCopyData().map(p => {
                return {
                    x:p.x + minX,
                    y:p.y + minY,
                    tile:p.tile
                }
            });
        }

        let newData = isTileset ?
            oldData.map(pixel => ({...pixel, color: {r: 0, g: 0, b: 0, a: 0}})) :
            oldData.map(pixel => ({...pixel, tile: -1}));
        console.log(oldData);
        console.log(newData);
        handleCopy();
        store.addTransaction(
            new BulkTileChangeTransaction(
                oldData,
                newData,
                store.pasteDataActual
            )
        );
    }

    const handlePaste = () => {
        navigator.clipboard.readText().then(text => {
            try{
                const minX = store.selectedPixels[0].x;
                const minY = store.selectedPixels[0].y;

                const pixels = JSON.parse(text);
                const oldData = [];
                for (let i = 0; i < pixels.length; i++) {
                    const x = pixels[i].x;
                    const y = pixels[i].y;

                    //Undo subtracting done in copy calculation to get actual position
                    if(store.tileset !== null) {
                        const oldColor = store.getPixel(x + minX, y + minY);
                        oldData.push({
                            x: x + minX,
                            y: y + minY,
                            color: oldColor
                        });
                    } else {
                        const oldTile = store.layers[store.currentLayer].data[(y + minY) * store.map.width + (x + minX)];
                        oldData.push({
                            x: x + minX,
                            y: y + minY,
                            tile: oldTile
                        });
                    }
                }

                let newData;
                if(store.tileset !== null) {
                    newData = pixels.map(pixel => ({
                        x: pixel.x + minX,
                        y: pixel.y + minY,
                        color: pixel.color
                    }));
                } else {
                    newData = pixels.map(pixel => ({
                        x: pixel.x + minX,
                        y: pixel.y + minY,
                        tile: pixel.tile
                    }));
                }

                store.addTransaction(
                    new BulkTileChangeTransaction(
                        oldData,
                        newData,
                        store.pasteDataActual
                    )
                );
            } catch (e) {
                console.error(e);
            }
        });
    }



    return (
        <Disclosure as="div" className="bg-editor-tertiary h-10">
            {() => (
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-10 items-center justify-between">
                        <div className="flex flex-1 items-center justify-around sm:items-stretch">
                            <div className="flex items-center justify-between">
                                <button
                                    className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight"
                                    onClick={store.processUndo}
                                >
                                    <ArrowUturnLeftIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button
                                    className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight"
                                    onClick={store.processRedo}
                                >
                                    <ArrowUturnRightIcon className="h-6 w-6 text-black"/>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className={
                                        "w-10 h-10 flex justify-center items-center hover:bg-editor-highlight " +
                                        (isSelect ? "bg-editor-highlight" : "bg-white")
                                    }
                                    onClick={() => store.setCurrentTool(EditorTool.SELECT)}
                                >
                                    <ArrowUpRightIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button
                                    className={
                                        "w-10 h-10 flex justify-center items-center hover:bg-editor-highlight " +
                                        (isRegion ? "bg-editor-highlight" : "bg-white")
                                    }
                                    onClick={() => store.setCurrentTool(EditorTool.REGION)}
                                >
                                    <RectangleGroupIcon className="h-6 w-6 text-black"/>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className={
                                        "w-10 h-10 flex justify-center items-center hover:bg-editor-highlight " +
                                        (isPaint ? "bg-editor-highlight" : "bg-white")
                                    }
                                    onClick={() => store.setCurrentTool(EditorTool.PAINT)}
                                >
                                    <PaintBrushIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button
                                    className={
                                        "w-10 h-10 flex justify-center items-center hover:bg-editor-highlight " +
                                        (isFill ? "bg-editor-highlight" : "bg-white")
                                    }
                                    onClick={() => store.setCurrentTool(EditorTool.FILL)}
                                >
                                    <span className="material-symbols-outlined">
                                        format_color_fill
                                    </span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight"
                                    onClick={handleCopy}
                                >
                                    <DocumentDuplicateIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button
                                    className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight"
                                    onClick={handleCut}
                                >
                                    <ScissorsIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button
                                    className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight"
                                    onClick={handlePaste}
                                >
                                    <ClipboardIcon className="h-6 w-6 text-black"/>
                                </button>
                            </div>


                            
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    )
}

export default Toolbar;