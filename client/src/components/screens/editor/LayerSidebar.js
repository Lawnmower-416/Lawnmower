import { LockClosedIcon, LockOpenIcon, ChevronLeftIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Switch } from "@headlessui/react";
import {useContext, useEffect, useState} from "react";
import EditorContext from "../../../editor";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
function LayerSidebar() {
    const [renameTimer, setRenameTimer] = useState(null);

    const [addingLayer, setAddingLayer] = useState(false);

    const [addingProperty, setAddingProperty] = useState(false);

    const { store } = useContext(EditorContext);

    const layers = store.layers;
    const currentLayer = store.layers[store.currentLayer];

    useEffect(() => {

    }, [store.layers, currentLayer && currentLayer.properties]);

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
        switch(property.type) {
            case "Boolean":
                return (
                    <div
                        className="bg-editor-tertiary flex items-center justify-center"
                        onDoubleClick={() => store.changePropType(property, "String")}
                    >
                        <Switch as="div" className="">
                            <Switch
                                checked={property.value === "true"}
                                onChange={() => {
                                    let newValue = property.value === "true" ? "false" : "true";
                                    store.changePropValue(property, newValue);
                                }}
                                className={`${
                                    property.value === "true" ? "bg-editor-highlight" : "bg-black"
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

            case "String":
                return (
                    <div
                        className="bg-editor-tertiary flex items-center justify-center"
                        onDoubleClick={() => store.changePropType(property, "Boolean")}
                    >
                        <input
                            className="bg-editor-tertiary text-white text-center w-full"
                            type="text"
                            value={property.value}
                            onChange={(e) => store.changePropValue(property, e.target.value)}
                        />
                    </div>
                );

            default:
                console.log("Unknown property type");
        }
    }

    function handleRename(e) {
        clearTimeout(renameTimer);

        const newTimer = setTimeout(() => {
            store.renameLayer(e.target.value);
        }, 500);

        setRenameTimer(newTimer);
    }

    function handleAddLayer() {
        async function addLayer() {
            await store.addLayer();
        }

        if(addingLayer) {
            toast.error("You're already adding a layer");
            return;
        }

        if(layers.length >= 10) {
            toast.error("You can't have more than 10 layers");
            return;
        }

        setAddingLayer(true);
        toast.promise(addLayer(), {
            loading: "Adding layer...",
            success: "Layer added!",
            error: "Error adding layer",
        }).then(r => {
            setAddingLayer(false);
        });
    }

    function handleAddProperty() {
        async function addProperty() {
            await store.addProperty();
        }

        if(addingProperty) {
            toast.error("You're already adding a property");
            return;
        }

        if(currentLayer.properties.length >= 10) {
            toast.error("You can't have more than 10 properties");
            return;
        }

        setAddingProperty(true);

        toast.promise(addProperty(), {
            loading: "Adding property...",
            success: "Property added!",
            error: "Error adding property",
        }).then(r => {
            setAddingProperty(false);
        });
    }

    return (
        <div className="bg-editor-primary h-screen w-64">
            <div className="grid grid-rows-2 h-full">
                    <div className="bg-editor-background">
                        <div className="flex items-center flex-shrink-0 px-4 pb-4 justify-between bg-editor-primary">
                            <h1 className="text-3xl text-white">Layers</h1>
                            <ChevronLeftIcon className="h-10 w-10 text-white"/>
                        </div>
                        <div className="flex-1 px-2 bg-editor-background space-y-1 overflow-y-auto h-[85%]">
                            {layers.map((item, index) => (
                                <div
                                    key={item._id}
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
                                    className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer "
                                    onClick={handleAddLayer}
                                />
                            </div>
                        </div>
                    </div>

                {currentLayer !== undefined &&
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
                                <div
                                    key={item._id}
                                    className="col-span-2 grid grid-cols-2"
                                >
                                    <h3
                                        className="bg-editor-secondary text-white col-span-1"
                                    >
                                        {item.name}
                                    </h3>
                                    {displayCustomPropertyField(item)}
                                </div>
                            ))}
                            <div className="flex justify-center col-span-2">
                                <PlusCircleIcon
                                    className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer"
                                    onClick={handleAddProperty}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default LayerSidebar;