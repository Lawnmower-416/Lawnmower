import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
function ColorSidebar({ colors, currentColor, setCurrentColor, addColor }) {
    return (
        <div className="bg-editor-primary h-screen w-64">
            <div className="flex flex-col h-full">
                <div className="flex flex-col flex-1">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 justify-between">
                            <h1 className="text-3xl text-white">Colors</h1>
                            <ChevronLeftIcon className="h-10 w-10 text-white"/>
                        </div>
                        <div className="mt-5 flex-1 px-2 flex-col bg-editor-background space-y-1">
                            <div className="grid grid-cols-4">
                                {colors.map((item) => (
                                    <div 
                                        className="p-4 hover:cursor-pointer" 
                                        style={{backgroundColor: `rgba(${item.red}, ${item.blue}, ${item.green}, ${item.alpha})`}}
                                        onClick={() => setCurrentColor(item)}/>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <PlusCircleIcon className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer" onClick={() => addColor(currentColor)}/>
                            </div>
                            <div className="absolute bottom-0">
                                <span className="grid grid-cols-3">
                                    <span>
                                        R 
                                    </span>
                                    <span>
                                        G 
                                    </span>
                                    <span>
                                        B 
                                    </span>
                                    <input min="0" max="255" className="w-10" value={currentColor.red} onChange={(e) => setCurrentColor({...currentColor, red: e.target.value})}/>
                                    <input min="0" max="255" className="w-10" value={currentColor.green} onChange={(e) => setCurrentColor({...currentColor, green: e.target.value})}/>
                                    <input min="0" max="255" className="w-10" value={currentColor.blue} onChange={(e) => setCurrentColor({...currentColor, blue: e.target.value})}/>
                                </span>
                                <div className="p-20 mt-5" style={{backgroundColor: `rgba(${currentColor.red}, ${currentColor.blue}, ${currentColor.green}, ${currentColor.alpha})`}}></div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorSidebar;