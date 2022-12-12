
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useState, useContext } from 'react'
import EditorContext from "../../editor";


function ExportModal({isOpen, setIsOpen, map, mapTitle, tileset, tilesetTitle}) {
    const [selected, setSelected] = useState('json')
    const { store } = useContext(EditorContext);


    function tilesetExportPng() {
        const tileSize = store.tileset.tileSize;
        const canvas = document.createElement('canvas')
        canvas.width = tileSize * 8;
        canvas.height = tileSize * 8;
        const context = canvas.getContext('2d')

        const tiles = store.tilesetImage.tiles;

        for (let tileCount = 0; tileCount < tiles.length; tileCount++) {
            const currentTile = tiles[tileCount];

            const pixelOffsetX = (tileCount % 8) * tileSize;
            const pixelOffsetY = Math.floor(tileCount / 8) * tileSize;

            //formatted as [r, g, b, a, r, g, b, a, ...]


            const data = new Uint8ClampedArray(Object.values(currentTile.data));
            for (let y = 0; y < tileSize; y++) {
                for (let x = 0; x < tileSize; x++) {
                    const index = (y * tileSize + x) * 4;
                    context.fillStyle = `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${data[index + 3]})`;
                    context.fillRect(x + pixelOffsetX, y + pixelOffsetY, 1, 1);
                }
            }

        }

        const dataUrl = canvas.toDataURL('image/png', 1.0)
        const link = document.createElement('a')
        link.download = `${store.tileset.title}.png`
        link.href = dataUrl
        link.click()

        const image = new Image();
        image.src = dataUrl;
        
        image.onload = () => {
        
            let exportTileset = {
                    name: store.tileset.title,
                    tilewidth: store.tileset.tileSize,
                    tileheight: store.tileset.tileSize,
                    tilecount: tiles.length,
                    image: `${store.tileset.title}.png`,
                    imageheight: image.naturalHeight,
                    imagewidth: image.naturalWidth
                }
            const blob = new Blob([JSON.stringify(exportTileset)], {type: "text/json"});
            const t = document.createElement("a");
            t.download = tilesetTitle+".json";
            t.href = URL.createObjectURL(blob);
            const clickEvt = new MouseEvent("click", {
                view: window,
                bubbles: false,
                cancelable: true
            });
            t.dispatchEvent(clickEvt);
            t.remove();
            setIsOpen(false)
        }
    }

    function mapExportPng() {

        let exportMap = {
            compressionlevel: -1,
            height: store.map.height,
            infinite: false,
            layers: [],
            nextlayerid: 1,
            nextobjectid: 1,
            orientation: "orthogonal",
            renderorder: "right-down",
            tileheight: store.map.tileSize,
            tilesets: [],
            tilewidth: store.map.tileSize,
            type: "map",
            width: store.map.width
        }

        //store has a state value, layers, which is an array of layer objects
        //iterate through each one and create a new layer to be added to the exportMap.layers array

        for (let i = 0; i < store.layers.length; i++) {
            let layer = store.layers[i];
            let visiblityProp = false
            // if layer.visible is defined, read its value. if it is undefined, then use visibilityPropr
            if (layer.visible !== undefined) {
                visiblityProp = layer.visible
            }
            let dataProp = []
            // we have layer.data. Layer.data is an array of objects
            // each object has a tilesetIndex property and a tileIndex property
            // iterate through each object in Layer.data
            // for each object, 
            for (let j = 0; j < layer.data.length; j++) {
                let tile = layer.data[j];
                if (tile.tilesetIndex === -1) {
                    dataProp.push(0)
                } else if (tile.tilesetIndex === 0) {
                    dataProp.push(tile.tileIndex + 1)
                } else {
                    let tilesetIndex = tile.tilesetIndex
                    let tileIndex = tile.tileIndex
                    let tilesetLength = 0
                    for (let k = 0; k < tilesetIndex; k++) {
                        tilesetLength += store.tilesets[k].tiles.length
                    }
                    dataProp.push(tilesetLength + tileIndex + 1)
                }
            }
            let exportLayer = {
                data: dataProp,
                properties: [],
                height: store.map.height,
                name: layer.name,
                opacity: 1,
                type: "tilelayer",
                visible: visiblityProp,
                width: store.map.width,
                x: 0,
                y: 0
            }
            for (let j = 0; j < layer.properties.length ; j++) {
                let property = layer.properties[j];
                let nameProp = property.name
                let typeProp = property.type
                if (typeProp === "Boolean") {
                    typeProp = "bool"
                }
                let valueProp = property.value
                if (valueProp === "false") {
                    valueProp = false
                } else if (valueProp === "true") {
                    valueProp = true
                }
                exportLayer.properties.push({
                    name: nameProp,
                    type: typeProp,
                    value: valueProp
                })
            }
            exportMap.layers.push(exportLayer);
        }

        //iterate through tilesets, download png for each and extract info for json
        for (let i = 0; i < store.mapTilesets.length; i++) {
            let tileset = store.mapTilesets[i];
            const tileSize = tileset.tileSize;
            const canvas = document.createElement('canvas')
            canvas.width = tileSize * 8;
            canvas.height = tileSize * 8;
            const context = canvas.getContext('2d')

            const tiles = tileset.imageData.tiles;

            for (let tileCount = 0; tileCount < tiles.length; tileCount++) {
                const currentTile = tiles[tileCount];

                const pixelOffsetX = (tileCount % 8) * tileSize;
                const pixelOffsetY = Math.floor(tileCount / 8) * tileSize;

                //formatted as [r, g, b, a, r, g, b, a, ...]
                const data = new Uint8ClampedArray(Object.values(currentTile.data));
                for (let y = 0; y < tileSize; y++) {
                    for (let x = 0; x < tileSize; x++) {
                        const index = (y * tileSize + x) * 4;
                        context.fillStyle = `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${data[index + 3]})`;
                        context.fillRect(x + pixelOffsetX, y + pixelOffsetY, 1, 1);
                    }
                }
            }
            const dataUrl = canvas.toDataURL('image/png', 1.0)
            const link = document.createElement('a')
            link.download = `${tileset.title}.png`
            link.href = dataUrl
            link.click()

            let exportTileset = {
                name: tileset.title,
                tilewidth: tileset.tileSize,
                tileheight: tileset.tileSize,
                tilecount: tiles.length,
                image: `${tileset.title}.png`,
                imageheight: 256,
                imagewidth: 256,
                columns: 8,
                margin: 0,
                spacing: 0,
                firstgid: 1
            }
            exportMap.tilesets.push(exportTileset)
        }

        const blob = new Blob([JSON.stringify(exportMap)], {type: "text/json"});
        console.log("exportmap.tilesets", exportMap.tilesets)
        const a = document.createElement("a");
        a.download = store.map.title+".json";
        a.href = URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: false,
            cancelable: true
        });
        a.dispatchEvent(clickEvt);
        a.remove();
        setIsOpen(false)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function handleDownload() {
        if (map!=null && tileset==null)  {
            mapExportPng();
        } else if (tileset!=null && map==null) {
            tilesetExportPng();
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>


                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-3xl font-medium leading-6 text-white text-center bg-editor-primary p-3"
                                    >
                                        Export
                                    </Dialog.Title>
                                    <div className="bg-editor-background">
                                        <div className="text-black text-center font-medium text-lg">
                                            Image(s) and a JSON file will be downloaded.
                                        </div>
                                        
                                        <div className="pt-4 pb-4 flex items-center justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-full border border-transparent bg-editor-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                                                onClick={handleDownload}
                                            >
                                            Export
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-full border border-transparent bg-editor-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                                                onClick={closeModal}
                                            >
                                            Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ExportModal;
