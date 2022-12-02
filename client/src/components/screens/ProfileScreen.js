import {PencilIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import { useState, useContext, useEffect } from "react";
import { generateRandomMaps, getEmail, getRandomUser } from "../../utils/mockData/ItemCard_MockData";
import ItemCard from "./../ItemCard";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import AuthContext from "../../auth";

import alienIcon from "../modals/images/alien.png";
import monkeyIcon from "../modals/images/monkey.png";
import pirateIcon from "../modals/images/pirate.png";
import poroIcon from "../modals/images/poro.png";

import UpdateAvatarModal from "../modals/UpdateAvatarModal";
import CreateMapModal from "../modals/CreateMapModal";
import CreateTilesetModal from "../modals/CreateTilesetModal";
import DeleteAccount from "../modals/DeleteAccount";
import GlobalStoreContext from "../../store";

export default function Profile() {

    const location = useLocation();
    const contentBefore = location.state ? location.state.contentBefore : null;
    const { store } = useContext(GlobalStoreContext);
    // Get the user...
    const { auth } = useContext(AuthContext);
    // console.log(contentBefore);
    let user;
    if (contentBefore) {
        console.log("EXISTS ", contentBefore);
        user = {username: contentBefore.owner};
    } else {
        user = auth.user;
    }

    const userComments = (contentBefore ? [contentBefore] : (user && user.comments)) || [];

    const [username, setUsername] = useState(user ? user.username : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [joinDate, setJoinDate] = useState(user ?
        new Date(user.joinDate).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) :
        "");
    const [points, setPoints] = useState(0);

    // const [points, setPoints] = useState(0);
    const [currentTab, setCurrentTab] = useState("Maps"); // Select: Maps, Tilesets, or Comments
    const [avatar, setAvatar] = useState(user ? user.avatar : "black");

    const [openCreateMapModal, setCreateMapModal] = useState(false);
    const [tilesetModal, setTilesetModal] = useState(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [updateAvatarModal, setUpdateAvatarModal] = useState(false);

    let userMaps = [];
    let userTilesets = [];

    const getTotalPoints = (content) => {
        let totalPoints = 0;
        for (let i = 0; i < content.length; i++) {
            totalPoints += content[i].likes - content[i].dislikes;
        }
        return totalPoints;
    }

    useEffect(() => {
        async function fetchData() {
            if (user) {
                setUsername(user.username);
                setEmail(user.email);
                setJoinDate(
                    new Date(user.joinDate)
                        .toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
                );
                setAvatar(user.avatar);
                console.log("auth.user was change so useEffect is called store.loadUserContent", auth.user);
                await store.loadUserContent();
            }
        }
        fetchData();
    }, [auth.user]);

    userMaps = store.userMaps;
    userTilesets = store.userTilesets;


    // compare the id in current path url. If auth.user exists, then it is not in guest mode.
    // if auth.user.id === id in current path url, then the user is viewing their own profile.
    // if auth.user.id !== id in current path url, then the user is viewing other's profile.
    // in that case, only show public content

    const path = location.pathname;
    const currentId = path.split("/")[2];

    useEffect(() => {
        async function fetchData() {
            if (user) {
                setUsername(user.username);
                setEmail(user.email);
                setJoinDate(
                    new Date(user.joinDate)
                        .toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
                );
                setAvatar(user.avatar);
                console.log("ID profile was changed", currentId);
                await store.loadUserContent();
            }
        }
        fetchData();
    }, [currentId]);

    useEffect(() => {
        if (auth.user) {
            setAvatar(auth.user.avatar);
        }
    }, [auth.user?auth.user.avatar:""]);


    let viewingOwnPage = false;
    let shownMaps = [];
    let shownTilesets = [];

    if (auth.user && auth.user._id === currentId) {
        viewingOwnPage = true;
        shownMaps = userMaps;
        shownTilesets = userTilesets;
    } else {
        viewingOwnPage = false;
        auth.getAUser(currentId).then((publicInfo) => {
            setUsername(publicInfo.username);
            setJoinDate(new Date(publicInfo.joinDate)
            .toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}));
            setAvatar(publicInfo.avatar);
        });
        shownMaps = store.publicMaps.filter((map) => map.owner === currentId);
        shownTilesets = store.publicTilesets.filter((tileset) => tileset.owner === currentId);

    }


    let avatarIcon = <UserCircleIcon/>
    //switch case for avatar
    switch (avatar) {
        case "black":
            avatarIcon = <UserCircleIcon/>
            break;
        case "red":
            avatarIcon = <UserCircleIcon className="text-red"/>
            break;
        case "green":
            avatarIcon = <UserCircleIcon className="text-darker-green"/>
            break;
        case "blue":
            avatarIcon = <UserCircleIcon className="text-[blue]"/>
            break;
        case "alien":
            avatarIcon = <img src={alienIcon} className="w-50 rounded-full scale-125"/>
            break;
        case "monkey":
            avatarIcon = <img src={monkeyIcon} className="w-50 rounded-full"/>
            break;
        case "pirate":
            avatarIcon = <img src={pirateIcon} className="w-50 rounded-full"/>
            break;
        case "poro":
            avatarIcon = <img src={poroIcon} className="w-50 rounded-full pt-2"/>
            break;
        default:
    }

    const getUserCommentsFromMapsAndTilesets = () => {
        const comments = [];
        if (userMaps) {
            userMaps.filter(c => c.owner === username).forEach(c => comments.push(c));
    }
        userTilesets.filter(c => c.owner === username).forEach(c => comments.push(c));
        return comments;
    }

    const handleUpdateAvatar = () => {
        setUpdateAvatarModal(!updateAvatarModal)
    }

    return (
        <>
            <Header/>
            {deleteAccountModal ? <DeleteAccount setModalOpen={setDeleteAccountModal} modalOpen={deleteAccountModal} /> : <div></div>}
            <div className="w-auto grid grid-cols-2 grid-rows-profile gap-1 bg-gradient-primary p-8">
                {/* Row 1 */}
                    {/* Column 1: User Profile Area */}
                    <div className="col-auto">
                        {/* Left Panel: User Icon and Edit */}
                        <div className="flex flex-col items-center">
                            <div className="w-40 h-40 w-fixed">
                                {avatarIcon}
                            </div>
                            <button 
                                onClick={handleUpdateAvatar}
                                className={"w-fit"+ (viewingOwnPage ? "" : "hidden")}>
                                <PencilIcon className={"w-12" + (viewingOwnPage ? "" : "hidden")}/>
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Right Panel: name, email, date, points */}
                    <div className="col-auto grid grid-rows-4 gap-0 p-5 bg-dark-green-lighter" >
                        <div className={`col-auto grid grid-cols-10 items-center text-2xl text-white`}>
                            <div className="col-span-8 px-2" >{username}</div>
                        </div>
                        <div className="col-auto grid grid-cols-10 content-center align-middle items-center text-2xl text-white" >
                            <div className="col-span-8 px-2" >{email}</div>
                        </div>
                        <span className="col-auto grid px-2 text-2xl content-center align-middle items-center text-white">Join Date: {joinDate}</span>
                        <span className="col-auto grid px-2 text-2xl content-center align-middle items-center text-white">Points: {user ? points : 0}</span>
                    </div>
                
                {/* Row 2 */}
                    {/* Column 1: Tabs Area */}
                    <div className="col-auto grid grid-cols-4 h-min pt-3 text-2xl gap-0" style={{"color": "white"}}>
                        <div className={`col-auto grid text-center ${currentTab === 'Maps' ? 'bg-dark-green-lighter' : 'bg-dark-green'} p-2 rounded-md cursor-pointer`} 
                            onClick={() => setCurrentTab((prev) => "Maps")}>Maps</div>
                        <div className={`col-auto grid text-center ${currentTab === 'Tilesets' ? 'bg-dark-green-lighter' : 'bg-dark-green'} p-2 rounded-md cursor-pointer`} 
                            onClick={() => setCurrentTab((prev) => "Tilesets")}>Tilesets</div>
                        <div className={`col-auto grid text-center ${currentTab === 'Comments' ? 'bg-dark-green-lighter' : 'bg-dark-green'} p-2 rounded-md cursor-pointer`} 
                            onClick={() => setCurrentTab((prev) => "Comments")}>Comments</div>
                    </div>

                    {/* Column 2: Create Map/Tileset Buttons Area */}
                    <div className="col-auto grid grid-cols-2 pt-3 text-2xl gap-12" style={{"color": "white"}}>

                        <div className={"col-auto grid text-center bg-dark-green-lighter p-2 rounded-md cursor-pointer " + (viewingOwnPage ? "visible" : "invisible")} 
                            onClick={() => setCreateMapModal(!openCreateMapModal)}>Create Map</div>
                        <div className={"col-auto grid text-center bg-dark-green-lighter p-2 rounded-md cursor-pointer " + (viewingOwnPage ? "visible" : "invisible")} 
                            onClick={() => setTilesetModal(!tilesetModal)}>Create Tilesets</div>
                    </div>
                {/* Row 3 */}
                    {/* Column 1: Item Cards for List */}
                    <div className="col-span-2 bg-dark-green-lighter rounded-md">
                        <div className="snap-y h-[64rem] overflow-y-auto p-8 space-y-2">
                            {
                                (currentTab === "Maps" && shownMaps) ? shownMaps.map((m, i) => <ItemCard key={i} inProfile={true} map={m} />)
                                : (currentTab === "Tilesets" && shownTilesets) ? shownTilesets.map((t, i) => <ItemCard key={i} inProfile={true} tileset={t} />)
                                    : getUserCommentsFromMapsAndTilesets()
                            }
                        </div>
                    </div>
                {/* Row 4 */}
                    {/* Column 1: Only for the Delete Account Button */}
                    <div className={`col-span-2 items-center text-center p-3 ${contentBefore ? "hidden" : ""}`}>
                        <button className="bg-dark-green-lighter text-red font-bold rounded-md p-3" onClick={() => setDeleteAccountModal((prev) => !prev)} >Delete Account</button>
                    </div>
            </div>
            <CreateMapModal setModalOpen={setCreateMapModal} modalOpen={openCreateMapModal} />
            <CreateTilesetModal setModalOpen={setTilesetModal} modalOpen={tilesetModal} />
            <UpdateAvatarModal setModalOpen={setUpdateAvatarModal} modalOpen={updateAvatarModal} />
        </>
    );
}