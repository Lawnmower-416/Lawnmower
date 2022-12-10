import {Dialog, Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import {Fragment, useContext, useState} from 'react'
import EditorContext from "../../editor";

function ExportModal({isOpen, setIsOpen}) {
    const { store } = useContext(EditorContext);

    const [selected, setSelected] = useState('json')

    const exportOptions = [
        { name: 'Export as PNG', value: 'png' },
        //{ name: 'Export as JPG', value: 'jpg' },
        { name: 'Export as JSON', value: 'json' },
    ]

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

        const dataUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = `${store.tileset.title}.png`
        link.href = dataUrl
        link.click()
    }

    function mapExportPng() {
        const canvas = store.mapCanvasRef;
        console.log(canvas);
        const dataUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = `${store.map.title}.png`
        link.href = dataUrl;
        link.click()
    }

    function handleExportPng() {
        if(store.map) {
            mapExportPng();
        } else {
            tilesetExportPng()
        }
    }



    function closeModal() {
        switch (selected) {
            case 'png':
                handleExportPng();
                break;
        }

        setIsOpen(false)
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
                                        className="text-3xl font-medium leading-6 text-white bg-editor-primary p-3"
                                    >
                                        Export
                                    </Dialog.Title>
                                    <div className="bg-editor-background">
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
                                        <div className="pt-4 pb-4 flex items-center justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-full border border-transparent bg-editor-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                                                onClick={closeModal}
                                            >
                                            Export
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
