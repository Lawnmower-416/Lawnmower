import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function ImportTilesetModal({isOpen, setIsOpen, tilesets}) {
    const [publicTab, setPublicTab] = useState(false);
    const [selectedTileset, setSelectedTileset] = useState(null);
  function closeModal() {
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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-medium leading-6 text-white bg-editor-primary p-3 flex justify-between items-center"
                                >
                                    <div>Settings</div>
                                    <div className="grid grid-cols-2">
                                        <div 
                                            className={"text-lg text-center p-1 hover:cursor-pointer hover:opacity-30 " + (publicTab ? "bg-editor-tertiary" : "bg-editor-highlight")}
                                            onClick={() => setPublicTab(false)}
                                        >
                                            My Tilesets
                                        </div>
                                        <div 
                                            className={"text-lg text-center p-1 hover:cursor-pointer hover:opacity-30 " + (publicTab ? "bg-editor-highlight" : "bg-editor-tertiary")}
                                            onClick={() => setPublicTab(true)}
                                        >
                                            Public Tilesets
                                        </div>
                                    </div>
                                </Dialog.Title>

                                <div className="bg-editor-background">
                                    {publicTab ? <PublicTilesets /> : <UserTilesets tilesets={tilesets} selectedTileset={selectedTileset} setSelectedTileset={setSelectedTileset}/>}
                                    <div className="pt-4 pb-4 flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-full border border-transparent bg-editor-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                                            onClick={closeModal}
                                        >
                                        Import
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

function PublicTilesets() {
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-rows-2">
                Enter Public Tileset ID
                <input type="text" />
            </div>
        </div>
    )
}

function UserTilesets({tilesets, selectedTileset, setSelectedTileset}) {
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-4">
                {tilesets.map((tileset) => {
                    return (
                        <div 
                            className={"p-2 m-2 rounded-full hover:bg-editor-highlight " + (selectedTileset && tileset._id === selectedTileset._id ? "bg-editor-highlight" : "bg-editor-secondary")}
                            onClick={() => setSelectedTileset(tileset)}
                        >
                            <div className="text-center text-white">{tileset.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default ImportTilesetModal;
