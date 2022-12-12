import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { BsFilter } from 'react-icons/bs';
import { Menu } from '@headlessui/react';
import ItemCard from '../ItemCard';
import TagModal from '../modals/TagModal';
import { generateRandomMaps } from '../../utils/mockData/ItemCard_MockData';
import { getMaps, getTilesets } from '../../requests/store-request';
import StoreErrorModal from "../modals/StoreErrorModal";
import GlobalStoreContext from "../../store"
import AuthContext from '../../auth';

export default function CommunityScreen() {

    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [text, setText] = useState("");

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
    const [tagModalOpen, setTagModalOpen] = React.useState(false);

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
        store.sortPublicContent("Likes");
    }

    const handleCreatorFilter = () => {
        console.log("creator filter");
        store.sortPublicContent("Creator");
    }

    const handleDateCreatedFilter = () => {
        console.log("date filter");
        store.sortPublicContent("Date Created");
    }

    const handleCommentsFilter = () => {
        console.log("comment filter");
        store.sortPublicContent("Comments");
    }

    const handleViewsFilter = () => {
        console.log("view filter");
        store.sortPublicContent("Views");
    }

    const handleTagsFilter = () => {
        console.log("tag filter");
        // this is a whole other can of worms
    }

    const handleUpdateText = (event) => {
        console.log(event.target.value);
        setText(event.target.value);
    }



    // items are default sorted by points (likes - dislikes)
    console.log("rendering community screen");
    return (
        <div>
            <Header/>
            <StoreErrorModal />
            <div className="main-background min-h-screen flex-col flex items-center">
                
                <div className="flex flex-row justify-center w-full">
                    <div className="w-1/3"/>  

                    <form className="flex justify-center w-1/3 p-10">   
                        <label htmlFor="search" className="sr-only">Search by title</label>
                        <input type="text" id="search" placeholder="Search by title"
                            className="text- hover:bg-blackgray-900 text-xl rounded-xl p-2.5 w-full outline-none border-none"
                            onChange = {handleUpdateText}
                            defaultValue={text}
                            />
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
                                        onClick={() => setTagModalOpen(!tagModalOpen)}>Tags                                            
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
                                        ?   (publicMaps.filter((map) => map.title.toLowerCase().includes(text.toLowerCase()))).map((d, i) => <ItemCard map={d} key={i} inProfile={true} postType = "map" />)
                                        :   (publicTilesets.filter((tileset) => tileset.title.toLowerCase().includes(text.toLowerCase()))).map((d, i) => <ItemCard tileset={d} key={i} inProfile={true} postType = "tileset" />)

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TagModal modalOpen={tagModalOpen} setModalOpen={setTagModalOpen} />
        </div>
    );
}
