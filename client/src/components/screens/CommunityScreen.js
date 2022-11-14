import React, { useEffect, useContext, useState } from 'react';
import Header from './Header';
import { BsFilter } from 'react-icons/bs';
import { Menu } from '@headlessui/react';
import ItemCard from '../ItemCard';
import ModalTwo from '../modals/TagModal/ModalTwo';
import { generateRandomMaps } from '../../utils/mockData/ItemCard_MockData';
import { getMaps, getTilesets } from '../../requests/store-request';
import GlobalStoreContext from "../../store"
import AuthContext from '../../auth';

export default function CommunityScreen() {

    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    // if true, then current Tab is the maps
    // if false, then current Tab is tilesets
    const [mapTabBool, setMapTabBool] = React.useState(true);

    // this is such a terrible way of doing it but it works so oh well
    let mapTabCSS = 'text-2xl bg-darker-green text-white rounded-t-3xl w-48 h-12 text-center';
    let tilesetTabCSS = 'text-2xl bg-darker-green text-white rounded-t-3xl w-48 h-12 text-center';

    if (mapTabBool) {
        mapTabCSS = 'text-2xl bg-darker-green text-white rounded-t-3xl w-48 h-12 text-center';
        tilesetTabCSS = 'text-2xl bg-dark-green text-white rounded-t-3xl w-48 h-12 text-center';
    } else {
        mapTabCSS = 'text-2xl bg-dark-green text-white rounded-t-3xl w-48 h-12 text-center';
        tilesetTabCSS = 'text-2xl bg-darker-green text-white rounded-t-3xl w-48 h-12 text-center';
    }

    // copied directly from website and it worked somehow
    const [modalOpen2, setModalOpen2] = React.useState(false);

    useEffect(() => {
        async function getTheContent() {
            await store.loadPublicContent();
        }
        getTheContent();
    }, [])

    let publicMaps = store.publicMaps;
    let publicTilesets = store.publicTilesets;

    const handleMapToTilesetTab = () => {
        if (!mapTabBool) {
            // guard statement to prevent re-rendering
            return
        }
        setMapTabBool(false);
        
    }
    const handleTilesetToMapTab = () => {
        if (mapTabBool) {
            // guard statement to prevent re-rendering
            return
        }
        setMapTabBool(true);
    }
    
    const handleLikesFilter = () => {
        console.log("like filter");
    }

    const handleCreatorFilter = () => {
        console.log("creator filter");
    }

    const handleDateCreatedFilter = () => {
        console.log("date filter");
    }

    const handleCommentsFilter = () => {
        console.log("comment filter");
    }

    const handleViewsFilter = () => {
        console.log("view filter");
    }

    const handleTagsFilter = () => {
        console.log("tag filter");
    }

    return (
        <div>
            <Header/>
            <div className="main-background min-h-screen flex-col flex items-center">
                
                <div className="flex flex-row justify-center w-full">
                    <div className="w-1/3"/>  

                    <form className="flex justify-center w-1/3 p-10">   
                        <label htmlFor="search" className="sr-only">Search</label>
                        <input type="text" id="search" placeholder="Search"
                            className="text- hover:bg-blackgray-900 text-xl rounded-xl p-2.5 w-full outline-none border-none"/>
                    </form>

                    <div className="flex w-1/3 flexbox">
                        <Menu>
                            <Menu.Button>
                                <div className="flex bg-dark-gray hover:bg-darker-gray rounded-xl justify-center pr-5">
                                    <h1 className="align-middle my-auto text-3xl px-6 pr-3 font-inter font-bold">Sort</h1>
                                    <BsFilter className="text-5xl"/>
                                </div>
                            </Menu.Button>
                            <Menu.Items className="absolute translate-y-[88.7px] translate-x-9 bg-dark-gray rounded-xl shadow-lg w-">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className="block px-4 py-2 text-md hover:bg-darker-gray rounded-t-xl w-full border-b-2 border-darker-gray"
                                        onClick={handleLikesFilter}>Likes</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className="block px-4 py-2 text-md hover:bg-darker-gray w-full border-b-2 border-darker-gray"
                                        onClick={handleCreatorFilter}>Creator</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className="block px-4 py-2 text-md hover:bg-darker-gray w-full border-b-2 border-darker-gray"
                                        onClick={handleDateCreatedFilter}>Date Created</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className="block px-4 py-2 text-md hover:bg-darker-gray w-full border-b-2 border-darker-gray"
                                        onClick={handleCommentsFilter}>Comments</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className="block px-4 py-2 text-md hover:bg-darker-gray w-full border-b-2 border-darker-gray"
                                        onClick={handleViewsFilter}>Views</button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className="block px-4 py-2 text-md hover:bg-darker-gray rounded-b-xl w-full"
                                        onClick={() => setModalOpen2(!modalOpen2)}>Tags                                            
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>

                <div className="flex justify-center w-full h-screen">
                    <div className=" flex-col justify-center w-full sm:mx-10 xl:mx-96">

                        <div className="flex flex-row justify-start">
                            <button onClick={handleTilesetToMapTab}className={mapTabCSS}>Maps</button>
                            <button onClick={handleMapToTilesetTab}className={tilesetTabCSS}>Tilesets</button>
                        </div>

                        {/*item cards are hard-coded for now*/}
                        <div className="flex bg-darker-green w-auto h-5/6 rounded-tr-3xl rounded-b-3xl">
                            <div className="w-full h-auto mx-10 my-4 overflow-y-auto">
                                <div className='mr-5 space-y-3'>
                                    {
                                        mapTabBool 
                                        ?   publicMaps.map((d, i) => <ItemCard map={d} key={i} inProfile={true}/>)
                                        :   publicTilesets.map((d, i) => <ItemCard tileset={d} key={i} inProfile={true}/>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalTwo modalOpen={modalOpen2} setModalOpen={setModalOpen2} />
        </div>
    );
}
