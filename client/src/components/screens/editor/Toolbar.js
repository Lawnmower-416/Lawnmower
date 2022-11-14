import { 
    ArrowUpRightIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, RectangleGroupIcon, ScissorsIcon,
    ClipboardIcon, DocumentDuplicateIcon, PaintBrushIcon
} from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import {useContext} from "react";
import EditorContext, {EditorTool} from "../../../editor";

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
            [new ClipboardItem({ 'text/plain': new Blob([JSON.stringify(store.selectedPixels)], { type: 'text/plain' }) })
            ]);
    }

    const handleCut = () => {
        handleCopy();
    }

    const handlePaste = () => {

    }



    return (
        <Disclosure as="div" className="bg-editor-tertiary h-10">
            {() => (
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-10 items-center justify-between">
                        <div className="flex flex-1 items-center justify-around sm:items-stretch">
                            <div className="flex items-center justify-between">
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
                                    <ArrowUturnLeftIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
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