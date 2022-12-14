import { Dialog, Transition } from '@headlessui/react'
import {Fragment, useContext, useState} from 'react'
import EditorContext from "../../editor";

function TilesetSettingsModal({isOpen, setIsOpen}) {
    const { store } = useContext(EditorContext);

    const [title , setTitle] = useState(store.tileset.title);

    function closeModal() {
        store.changeTilesetTitle(title);
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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
                                    Settings
                                </Dialog.Title>
                                <div className="bg-editor-background">
                                    <div className="grid grid-rows-3">
                                        <div className="row-span-1 text-2xl">
                                            Title
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                className="w-full text-black p-2"
                                                value={title}
                                                onChange={(event) => {
                                                    setTitle(event.target.value);
                                                }}/>
                                        </div>
                                    </div>
                                    <div className="pt-4 pb-4 flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-full border border-transparent bg-editor-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                                            onClick={closeModal}
                                        >
                                        Confirm
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

export default TilesetSettingsModal;
