import { LockClosedIcon, LockOpenIcon, ChevronLeftIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'
import {useContext} from "react";
import EditorContext from "../../../editor";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
function LayerSidebar() {

    const { store } = useContext(EditorContext);

    const layers = store.layers;

    function displayLockIcon(isLocked) {
        if (isLocked) {
            return <LockClosedIcon className="h-6 w-6 text-white" aria-hidden="true" />
        } 
        return <LockOpenIcon className="h-6 w-6 text-white" aria-hidden="true" />
    }

    function displayEyeIcon(isVisible) {
        if (isVisible) {
            return <EyeIcon className="h-6 w-6 text-white" aria-hidden="true" />
        } 
        return <EyeSlashIcon className="h-6 w-6 text-white" aria-hidden="true" />
    }

    return (
        <div className="bg-editor-primary h-screen w-64">
            <div className="flex flex-col h-full">
                <div className="flex flex-col flex-1">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 justify-between">
                            <h1 className="text-3xl text-white">Layers</h1>
                            <ChevronLeftIcon className="h-10 w-10 text-white"/>
                        </div>
                        <div className="mt-5 flex-1 px-2 bg-editor-background space-y-1">
                            {layers.map((item) => (
                                <div
                                    key={item.name}
                                    className={
                                        "group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md text-white" + 
                                        (item.current ? 
                                             " bg-editor-highlight" : 
                                             (item.isVisible ? " bg-editor-secondary" : " bg-editor-tertiary"))
                                    } 
                                >
                                    {item.name}
                                    <div className="group flex items-center justify-between">
                                        {displayEyeIcon(item.isVisible)}
                                        {displayLockIcon(item.isLocked)}
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center">
                                <PlusCircleIcon
                                    className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer"
                                    onClick={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayerSidebar;