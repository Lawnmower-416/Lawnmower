import { Dialog, Listbox, Transition } from '@headlessui/react'
import {Fragment, useContext, useState} from 'react'
import EditorContext from "../../editor";

function DeleteTileModal({isOpen, setIsOpen}) {
    const { store } = useContext(EditorContext);
    function closeModal(acceptDelete) {
        if(acceptDelete) {
            store.deleteTile();
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
                                        Delete Tile?
                                    </Dialog.Title>
                                    <div className="bg-editor-background">
                                        <div className="pt-4 pb-4 flex items-center justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-full border border-transparent bg-editor-tertiary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                                                onClick={() => closeModal(false)}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-full border border-transparent bg-editor-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                                                onClick={() => closeModal(true)}
                                            >
                                                Delete
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

export default DeleteTileModal;
