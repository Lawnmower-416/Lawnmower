import {
    HomeIcon,
    CloudIcon,
    UserPlusIcon,
    ArrowDownTrayIcon,
    Cog6ToothIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import EditorContext from "../../../editor";
import AuthContext from "../../../auth";

function Headerbar({title, setSettingsOpen, setHistoryOpen, setExportOpen, setShareOpen}) {
    const { store } = useContext(EditorContext);
    const { auth } = useContext(AuthContext);

    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        if(!auth.user) {
            setCanEdit(false);
            return;
        } else {
            if(store.map) {
                if (store.map.owner === auth.user._id || store.collaborators.find(c => c.id === auth.user.id)) {
                    setCanEdit(true);
                }
            } else {
                if(store.tileset.owner === auth.user._id || store.collaborators.find(c => c.id === auth.user.id)) {
                    setCanEdit(true);
                }
            }
        }
    }, []);

    const userProfileRoute = auth.user ? ("/profile/" + auth.user._id) : "/community";

    return (
        <Disclosure as="nav" className="bg-editor-primary h-14">
            {() => (
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" >
                    <div className="relative flex h-14 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <Link
                                className="bg-editor-highlight px-2 py-2 rounded-full"
                                to={userProfileRoute}
                            >
                                <HomeIcon className="h-10 w-10 text-white"/>
                            </Link>

                            <h1 className="text-5xl text-white">
                                {title}
                            </h1>
                            <div className="flex items-center">
                                { canEdit && (
                                    <Cog6ToothIcon
                                        className="h-10 w-10 text-white hover:text-editor-highlight hover:cursor-pointer"
                                        onClick={() => setSettingsOpen(true)}/>
                                )}
                                <ArrowDownTrayIcon className="h-10 w-10 text-white hover:text-editor-highlight" onClick={() => setExportOpen(true)} />
                                { canEdit && (
                                    <RocketLaunchIcon className="h-10 w-10 text-white hover:text-editor-highlight" onClick={() => {
                                        if(store.tileset) {
                                            store.saveTileset()
                                        } else {
                                            store.saveMap();
                                        }
                                    }} />
                                )}


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
                                <div className="flex justify-between items-center" onClick={() => setShareOpen(true)}>
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