import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

function EditHistoryModal({isOpen, setIsOpen}) {
    const [selected, setSelected] = useState()

    const previousVersions = [
        { id: 1, name: 'Version 1', date: '2021-01-01' },
        { id: 2, name: 'Version 2', date: '2021-01-02' },
        { id: 3, name: 'Version 3', date: '2021-01-03' },
    ]
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-medium leading-6 text-white bg-editor-primary p-3"
                                >
                                    Edit History
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
                                            {previousVersions.map((version) => (
                                                <Listbox.Option
                                                    as="div"
                                                    key={version.id}
                                                    className={({ active }) =>
                                                        `${active ? 'text-white bg-editor-highlight' : 'text-gray-900'}
                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                    }
                                                    value={version.name}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span
                                                                className={`${
                                                                    selected ? 'font-medium' : 'font-normal'
                                                                } block truncate`}
                                                            >
                                                                <span className="font-bold pr-2">{version.name}</span>
                                                                {version.date}
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
                                        Export JSON
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

export default EditHistoryModal;