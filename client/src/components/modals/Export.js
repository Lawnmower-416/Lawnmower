
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useState, useContext } from 'react'
import EditorContext from "../../editor";


function ExportModal({isOpen, setIsOpen, map, mapTitle, tileset, tilesetTitle}) {
    const [selected, setSelected] = useState('json')
    const { store } = useContext(EditorContext);


    // const exportOptions = [
    //     { name: 'Export as PNG', value: 'png' },
    //     //{ name: 'Export as JPG', value: 'jpg' },
    //     { name: 'Export as JSON', value: 'json' },
    // ]

/*
  const closeModal = (e) => {
    e.preventDefault();

    if (map!=null && tileset==null) {
        let exportLayers = []
        let exportTilesets = []

        //let gottenLayers = store.getLayersForExport(map)
        //console.log("gottenLayers", gottenLayers)

        store.getLayersForExport(map).then((gottenLayers) => {
        
            for (let i = 0; i < gottenLayers.length; i++) {
                let layer = gottenLayers[i]
                exportLayers.push({
                    name: layer.name,
                    locked: layer.locked,
                    properties: layer.properties,
                    height: layer.height,
                    width: layer.width,
                    data: layer.data,
                })
            }

            //let gottenTilesets = store.getMapsTilesetsForExport(map)
            //console.log("gottenTilesets", gottenTilesets)

            store.getMapsTilesetsForExport(map).then((gottenTilesets) => {
                for (let i = 0; i < gottenTilesets.length; i++) {
                    let tileset = gottenTilesets[i]
                    exportTilesets.push({
                        name: tileset.title,
                        tilewidth: tileset.tileSize,
                        tileheight: tileset.tileSize,
                        tilecount: tileset.tileCount,
                        image: tileset.image,
                        imageheight: tileset.imageHeight,
                        imagewidth: tileset.imageWidth,
                    }
                    )
                }

                let exportMap = {
                    height: map.height,
                    layers: exportLayers,
                    tilesets: exportTilesets,
                    nextobjectid: 1,
                    orientation: "isometric",
                    tileheight: map.tileSize,
                    tilewidth: map.tileSize,
                    version: 1,
                    tiledversion: "1.7.2",
                    width: map.width
                }

                const blob = new Blob([JSON.stringify(exportMap)], {type: "text/json"});

                const a = document.createElement("a");
                a.download = mapTitle+".json"; //filename
                a.href = URL.createObjectURL(blob);
                const clickEvt = new MouseEvent("click", {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });
                a.dispatchEvent(clickEvt);
                a.remove();
                setIsOpen(false)
            })
        })
    }
    if (tileset!= null && map==null) {
        
        //let gottenTileset = store.getTilesetForExport(tileset)
        //console.log("gottenTileset", gottenTileset)

        store.getTilesetForExport(tileset).then((payload) => {
            let exportTileset = {
                    name: payload.tileset.title,
                    tilewidth: payload.tileset.tileSize,
                    tileheight: payload.tileset.tileSize,
                    tilecount: payload.tileset.tileCount,
                    image: payload.imageData,
                    imageheight: payload.tileset.imageHeight,
                    imagewidth: payload.tileset.imageWidth,
                }
            console.log("exportTileset:", exportTileset)
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
            setIsOpen(false)
        })
    }
  }
  */

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
        /*
        const canvas = store.mapCanvasRef;
        console.log(canvas);
        const dataUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = `${store.map.title}.png`
        link.href = dataUrl;
        link.click()
        */
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
                exportLayer.properties.push({
                    name: property.name,
                    type: property.type,
                    value: property.value
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

                const dataUrl = canvas.toDataURL('image/png', 1.0)
                const link = document.createElement('a')
                link.download = `${tileset.title}.png`
                link.href = dataUrl
                link.click()

                const image = new Image();
                image.src = dataUrl;
                image.onload = () => {
                    let exportTileset = {
                        name: tileset.title,
                        tilewidth: tileset.tileSize,
                        tileheight: tileset.tileSize,
                        tilecount: tiles.length,
                        image: `${tileset.title}.png`,
                        imageheight: image.naturalHeight,
                        imagewidth: image.naturalWidth
                    }
                    exportMap.tilesets.push(exportTileset);
                }
            }
        }

        const blob = new Blob([JSON.stringify(exportMap)], {type: "text/json"});
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
                                        {/*
                                        <Listbox value={selected} onChange={setSelected} className="relative mt-1" as="div">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-editor-highlight focus:border-editor-highlight sm:text-sm">
                                                <span className="block truncate">{selected}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-white"/>
                                                </span>
                                            </Listbox.Button>
                                            <Listbox.Options>
                                                {exportOptions.map((option) => (
                                                    <Listbox.Option
                                                        as="div"
                                                        key={option.value}
                                                        className={({ active }) =>
                                                            `${active ? 'text-white bg-editor-highlight' : 'text-gray-900'}
                                                                cursor-default select-none relative py-2 pl-10 pr-4`
                                                        }
                                                        value={option.value}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span
                                                                    className={`${
                                                                        selected ? 'font-medium' : 'font-normal'
                                                                    } block truncate`}
                                                                >
                                                                    {option.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span
                                                                        className={`${
                                                                            active ? 'text-white' : 'text-white'
                                                                        }
                                                                            absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                    >
                                                                        <CheckIcon className="h-6 w-6 text-editor-secondary" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                            </Listbox>
                                            */}
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
