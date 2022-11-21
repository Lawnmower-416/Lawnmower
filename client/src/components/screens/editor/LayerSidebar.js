import { LockClosedIcon, LockOpenIcon, ChevronLeftIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Switch } from "@headlessui/react";
import {useContext, useEffect, useState} from "react";
import EditorContext from "../../../editor";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
function LayerSidebar() {
    const [renameTimer, setRenameTimer] = useState(null);

    const { store } = useContext(EditorContext);

    useEffect(() => {

    }, [store.layers])

    const layers = store.layers;
    const currentLayer = store.layers[store.currentLayer];

    function displayLockIcon(isLocked, index) {
        if (isLocked) {
            return (
                <LockClosedIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    onClick={() => store.toggleLayerLock(index)}
                />
            );
        } 
        return (
            <LockOpenIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
                onClick={() => store.toggleLayerLock(index)}
            />);
    }

    function displayEyeIcon(isVisible, index) {
        if (isVisible) {
            return (
                <EyeIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    onClick={() => store.toggleLayerHide(index)}
                />
            );
        } 
        return (
            <EyeSlashIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
                onClick={() => store.toggleLayerHide(index)}
            />
        );
    }

    function displayCustomPropertyField(property) {
        if (property.type === "Boolean") {
            return (
                <div className="bg-editor-tertiary flex items-center justify-center">
                    <Switch as="div" className="">
                        <Switch
                            checked={property.value === "true"}
                            onChange={() => {
                                let newValue = property.value === "true" ? "false" : "true";
                                store.changePropValue(property, newValue);
                            }}
                            className={`${
                                property.value ? "bg-editor-highlight" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                className={`${
                                    property.value === "true" ? "translate-x-6" : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                        </Switch>
                    </Switch>
                </div>

            );
        }
    }

    function handleRename(e) {
        clearTimeout(renameTimer);

        const newTimer = setTimeout(() => {
            store.renameLayer(e.target.value);
        }, 500);

        setRenameTimer(newTimer);
    }

    return (
        <div className="bg-editor-primary h-screen w-64">
            <div className="grid grid-rows-2 h-full">
                    <div className="bg-editor-background overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 pb-4 justify-between bg-editor-primary">
                            <h1 className="text-3xl text-white">Layers</h1>
                            <ChevronLeftIcon className="h-10 w-10 text-white"/>
                        </div>
                        <div className="mt-5 flex-1 px-2 bg-editor-background space-y-1">
                            {layers.map((item, index) => (
                                <div
                                    key={item.name}
                                    className={
                                        "group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md text-white" +
                                        (index === store.currentLayer ?
                                            " bg-editor-highlight" :
                                            (item.visible ? " bg-editor-secondary" : " bg-editor-tertiary"))
                                    }
                                    onClick={() => store.selectLayer(index)}
                                >
                                    {item.name}
                                    <div className="group flex items-center justify-between">
                                        {displayEyeIcon(item.visible, index)}
                                        {displayLockIcon(item.locked, index)}
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center">
                                <PlusCircleIcon
                                    className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer"
                                    onClick={() => {store.addLayer()}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-editor-background overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 py-2 justify-between bg-editor-primary">
                            <h1 className="text-3xl text-white">Properties</h1>
                        </div>
                        <div className="grid grid-cols-2 bg-editor-background">
                            <h1 className="bg-editor-secondary text-xl text-white">Name</h1>
                            <div className="flex items-center justify-center bg-editor-tertiary">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={currentLayer.name}
                                    onChange={handleRename}
                                />
                            </div>
                            <div className="bg-editor-primary col-span-2">
                                <h1 className="text-xl text-white">Custom Properties</h1>
                            </div>
                            {currentLayer.properties.map((item, index) => (
                                <>
                                    <h3 className="bg-editor-secondary text-white col-span-1">{item.name}</h3>
                                    {displayCustomPropertyField(item)}
                                </>
                            ))}
                            <div className="flex justify-center col-span-2">
                                <PlusCircleIcon
                                    className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer"
                                    onClick={() => {store.addProperty()}}
                                />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default LayerSidebar;