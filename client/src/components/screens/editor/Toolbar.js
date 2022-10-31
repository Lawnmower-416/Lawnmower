import { 
    ArrowUpRightIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, RectangleGroupIcon, ScissorsIcon,
    ClipboardIcon, DocumentDuplicateIcon, PaintBrushIcon
} from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

function Toolbar() {
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
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
                                    <ArrowUpRightIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
                                    <RectangleGroupIcon className="h-6 w-6 text-black"/>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
                                    <PaintBrushIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
                                    <span className="material-symbols-outlined">
                                        format_color_fill
                                    </span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
                                    <DocumentDuplicateIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
                                    <ScissorsIcon className="h-6 w-6 text-black"/>
                                </button>
                                <button className="w-10 h-10 bg-white flex justify-center items-center hover:bg-editor-highlight">
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