import { ChevronDownIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as LikedIcon, HandThumbDownIcon as DislikedIcon, ChevronDoubleUpIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CommentCard from "./CommentCard";
import { DeleteMapModal } from "./modals/DeleteMapModal";
import { Menu } from '@headlessui/react';
import ReportModal from "./modals/ReportModal";
import ForkModal from "./modals/ForkModal";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";


/**
 *  Needs to pass in the following objects:
 *  {likes: Number, dislikes: Number, title: String, owner: String, created: Date,
 *  visibility: String, views: Number, comments: [String], thumbnail: URL}
 * @param {any} props 
 * @returns render
 */
export default function ItemCard(props) {
    const { auth } = useContext(AuthContext);
    const user = auth.user;
    const { store } = useContext(GlobalStoreContext);
    const [deleteMapModal, setDeleteMapModal] = useState(false);
    const [openReportModal, setReportModal] = useState(false);
    const [openForkModal, setForkModal] = useState(false);
    const [expandComments , setExpandComments] = useState(false);

    const location = useLocation();
    const path = location.pathname;
    const postType = props.postType;

    // props.map is defined if the item card is being used for maps
    // props.tileset is defined if the item card is being used for tilesets
    const currentData = props.map || props.tileset;

    const title = currentData.title || "Error Loading Title";
    const owner = currentData.owner ||"Error Loading Owner"; //this is owner._id
    const ownerUsername = currentData.ownerUsername || "Error Loading Owner Username";
    const creationDate = new Date(currentData.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) || "Error Loading Creation Date";
    const publicStatus = currentData.public || false
    const comments = currentData.comments || "Error Loading Comments";

    const thumbnail = currentData.thumbnail || "Error Loading Thumbnail";

    const ownerProfileLink = "/profile/" + owner

    let numLikes = 0;
    if (currentData.likedUsers) {
        numLikes = currentData.likedUsers.length;
    }
    let numDislikes = 0;
    if (currentData.dislikedUsers) {
        numDislikes = currentData.dislikedUsers.length;
    }
    let numViews = 0;
    if (currentData.viewers) {
        numViews = currentData.viewers.length;
    }

    const handleLike = () => {
        if (props.map) {
            store.updateMapLikes(currentData._id);
        } else {
            store.updateTilesetLikes(currentData._id);
        }
    }
    const handleDislike = () => {
        if (props.map) {
            store.updateMapDislikes(currentData._id);
        } else {
            store.updateTilesetDislikes(currentData._id);
        }
    }
    const handleView = () => {
        setExpandComments(!expandComments);
        if (!user || auth.guestMode) {
            return;
        } else {
            if (props.map) {
                store.updateMapViewCount(currentData._id);
            } else {
                store.updateTilesetViewCount(currentData._id);
            }
        }
    }

    let likeButton
    let dislikeButton

    if (!user || auth.guestMode) {
        likeButton = <LikedIcon className="w-12 cursor-pointer text-black text-opacity-50" /> 
        dislikeButton = <DislikedIcon className="w-12 align-middle cursor-pointer text-black text-opacity-50" />
    } else {
        if (currentData.likedUsers && currentData.likedUsers.includes(user._id)) {
            likeButton = <LikedIcon className="w-12 cursor-pointer text-dark-green" onClick={handleLike} />
        } else {
            likeButton = <HandThumbUpIcon className="w-12 cursor-pointer" onClick={handleLike}/>
        }
        if (currentData.dislikedUsers && currentData.dislikedUsers.includes(user._id)) {
            dislikeButton = <DislikedIcon className="w-12 align-middle cursor-pointer text-red" onClick={handleDislike} /> 
        } else {
            dislikeButton = <HandThumbDownIcon className="w-12 align-middle cursor-pointer" onClick={handleDislike}/>
        }
    }

    let trashCanIcon
    if (path == "/profile/" + owner) {
        trashCanIcon = <TrashIcon className={`w-12 cursor-pointer fill-red ${(auth.user && user._id !== owner) ? "hidden" : ""}`} 
        onClick={() => setDeleteMapModal((prev) => !prev)} 
        />
    }

    return (
        <><DeleteMapModal modalOpen={deleteMapModal} setModalOpen={setDeleteMapModal} content={currentData} />
        <div className="snap-start flex flex-col">
            <div className="flex flex-row p-1 max-w bg-light-grey rounded-t-xl shadow-lg items-center space-x-4">
                {/* Column 1: Likes/Dislikes */}
                    <div className="order-1 items-center p-2 ml-2">
                            <div className="align-middle text-center items-center">
                                {
                                    likeButton
                                }
                                <span className="text-xl">{numLikes - numDislikes}</span>
                                {
                                    dislikeButton
                                }
                            </div>
                    </div>
                {/* Column 2: Image */}
                    <div className="flex order-2 align-middle content-center items-center p-2">
                        {/* Col 2 */}
                            <div className="flex">
                                {
                                    thumbnail
                                    ? <img className="object-cover h-48 w-48 content-center border-2" src={thumbnail} alt="thumbnail" />
                                    : <QuestionMarkCircleIcon className="w-32" /> }
                            </div>
                    </div>
                {/* Column 3: Map/Tileset Name, Author, Creation Date */}
                    <div className="flex flex-col flex-grow order-3 align-middle p-2">
                        <Link className="text-3xl font-bold" to={(props.map ? "/mapEditor/"+currentData._id : "/tilesetEditor/"+currentData._id)}>{
                        
                        title
                        
                        }</Link>
                            <Menu as="div" className="relative">
                                <Menu.Button>
                                    <p className="text-xl text-left">By: {ownerUsername}</p>
                                </Menu.Button>
                                <Menu.Items className="absolute translate-x-0 bg-darker-gray rounded-xl shadow-lg border-2">
                                    <Menu.Item>
                                            {({ active }) => (
                                                <Link to={ownerProfileLink} className="text-white block px-4 py-2 text-md hover:bg-darker-gray rounded-t-xl w-full border-b-2 border-dark-gray" state={{contentBefore: currentData}}
                                                >Profile                                            
                                                </Link>
                                            )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {/*TODO: this menu is dynamic based on if the user is logged in or not*/}
                                            {({ active }) => (
                                                <button className="text-white block px-4 py-2 text-md hover:bg-darker-gray w-full border-b-2 border-dark-gray"
                                                onClick={() => setReportModal(!openReportModal)}>Report                                            
                                                </button>
                                            )}
                                    </Menu.Item>
                                    {<Menu.Item>
                                            {({ active }) => (
                                                <button 
                                                    className={"text-white block px-4 py-2 text-md hover:bg-darker-gray rounded-b-xl w-full"}
                                                    onClick={() => setForkModal(!openForkModal)}
                                                >
                                                    Fork                                            
                                                </button>
                                            )}
                                    </Menu.Item>}
                                </Menu.Items>
                            </Menu>

                        <p className="text-xl">Created: {creationDate}</p>
                    </div>

                    
                {/* Column 4: Public/Private, Views, Delete, Show Comments */}
                    <div className="flex flex-col order-last text-left space-y-3">
                        <p className="text-xl font-bold">
                            {
                                publicStatus
                                ? "Public" 
                                : "Private"
                            }
                        </p>
                        <p className="text-xl">Views: {numViews}</p>

                        { trashCanIcon }



{/* frontend*2. commentout line 199-206 & addded line 193-197 */}

                        {/* Comments Part */}   
                        <Link to={`/expandedcommunity?id=${props.tileset?._id || props.map?._id}&postType=${postType}`}>
                            <p className="font-bold relative bottom-0 cursor-pointer">
                                Show Comments
                            </p>
                        </Link>
                        
                        {/* <p className="font-bold relative bottom-0 cursor-pointer" onClick={handleView}>
                            Show Comments
                            {
                                expandComments 
                                ? <ChevronDoubleUpIcon className="w-6" style={{"display": "inline"}} /> 
                                : <ChevronDownIcon className="w-6" style={{"display": "inline"}} />
                            }
                        </p> */}
                    </div>
            </div>
            {/* Displaying Comments */}
            <div className={`flex flex-col p-1 pt-3 ${expandComments ? 'h-[32rem]' : '' } max-w-full ${!expandComments ? 'bg-light-grey' : 'bg-light-green' } overflow-y-auto overflow-x-hidden rounded-b-xl shadow-lg space-y-4`}>
                {
                    expandComments ?
                    (currentData ? currentData.comments.map(comment => <CommentCard key={Math.random() * 100} inProfile={props.inProfile} comment={comment} />) : <CommentCard inProfile={props.inProfile} key={Math.random() * 100} />)
                    : <div></div>
                }
            </div>
            <ReportModal modalOpen={openReportModal} setModalOpen={setReportModal} />
            <ForkModal modalOpen={openForkModal} setModalOpen={setForkModal} mapId={props.map ? props.map._id : null } tilesetId={props.tileset ? props.tileset._id : null}/>
        </div>
        </>
    )
}