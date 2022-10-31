import { HomeIcon, CloudIcon, UserPlusIcon, ArrowDownTrayIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
function Headerbar(props) {
    return (
        <Disclosure as="nav" className="bg-editor-primary h-14">
            {() => (
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-14 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <button
                                type="button"
                                className="bg-editor-highlight px-2 py-2 rounded-full"
                            >
                                <HomeIcon className="h-10 w-10 text-white"/>
                            </button>

                            <h1 className="text-5xl text-white">Title</h1>
                            <div className="flex items-center">
                                <Cog6ToothIcon className="h-10 w-10 text-white hover:text-editor-highlight"/>
                                <CloudIcon className="h-10 w-10 text-white hover:text-editor-highlight"/>
                                <ArrowDownTrayIcon className="h-10 w-10 text-white hover:text-editor-highlight" />
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="bg-editor-highlight px-6 py-1 rounded-full text-white"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="material-symbols-outlined h-5 w-5">
                                        alt_route
                                    </span>
                                    Fork
                                </div>
                                
                            </button>
                            <button
                                type="button"
                                className="bg-editor-highlight px-5 py-1 rounded-full text-white"
                            >
                                <div className="flex justify-between items-center">
                                    <UserPlusIcon className="h-5 w-5 text-white hover:text-editor-highlight"/>
                                    Share
                                </div>
                                
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    )
}

export default Headerbar;