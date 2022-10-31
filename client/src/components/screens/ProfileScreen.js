import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import {PencilIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import { useState } from "react";
import { getEmail, getRandomUser } from "../../utils/mockData/ItemCard_MockData";
import ItemCard from "./../ItemCard";
import Header from "./Header";

import ModalEight from "../modals/CreateMapModal/CreateMap";
import CreateTilesetModal from "../modals/CreateTilesetModal";
import DeleteAccount from "../modals/DeleteAccount";

// import {UserCircleIcon} from "@heroicons/react/24/outline";

export default function Profile() {
    // Get the user...
    const user = getRandomUser();

    // Get user's stuff
    const userMaps = user.maps;
    // console.log(userMaps);
    const userTilesets = user.tilesets;
    const userComments = user.comments;

    const owner = user.username;

    const [username, setUsername] = useState(owner);
    const [email, setEmail] = useState(getEmail(owner));
    const [joinDate, setJoinDate] = useState(user.joinDate);
    const [points, setPoints] = useState(user.points || 0);

    const [editing, setEditing] = useState(""); // Username, Email
    const [change, setChange] = useState(""); // Username, Email
    const [currentTab, setCurrentTab] = useState("Maps"); // Select: Maps, Tilesets, or Comments
    const [userLogo, setUserLogo] = useState([]);
    const [imageURL, setImageURL] = useState("");

    const [modalOpen8, setModalOpen8] = useState(false);
    const [tilesetModal, setTilesetModal] = useState(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);

    const getUserCommentsFromMapsAndTilesets = () => {
        const comments = [];
        userMaps.filter(c => c.owner === username).forEach(c => comments.push(c));
        userTilesets.filter(c => c.owner === username).forEach(c => comments.push(c));
        return comments;
    }

    const handleImage = (e) => {
        setUserLogo((prev) => {
            const images = [...e.target.files];
            setImageURL((prevImgURL) => {
                return URL.createObjectURL(images[0]);
            });
            return [...e.target.files];
        });
    }

    const handleChange = (e) => {
        setChange((prev) => e.target.value);
        if (editing === "username") {
            setUsername((prev) => e.target.value);
        } else if (editing === "email") {
            // Maybe handle invalid email?
            setEmail((prev) => e.target.value);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setEditing((prev) => "");
        }
    };

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
                            <div className="">
                                {imageURL !== "" ? <img className="max-w-[18rem]" src={imageURL} alt="User Logo" /> : <UserCircleIcon className="text-[blue] w-40" />}
                            </div>
                            <label className="w-fit">
                                <input className="hidden" type={"file"} onChange={handleImage} accept={"image/*"} />
                                <PencilIcon className="w-12 hover:text-white cursor-pointer" />
                            </label>
                                
                        </div>
                    </div>

                    {/* Column 2: Right Panel: name, email, date, points */}
                    <div className="col-auto grid grid-rows-4 gap-0 p-5 bg-dark-green-lighter" >
                        <div className={`col-auto grid grid-cols-10 items-center text-2xl text-white`}>
                            <div className="col-span-8 px-2" >{editing === "username" ? <input className="px-1 text-black" type={"text"} placeholder={username} onChange={handleChange} onKeyDown={handleKeyDown}></input> : username}</div>
                            <div className="col-span-2 px-1 content-start">
                                {editing === "username" ? <DocumentCheckIcon className="w-12 cursor-pointer" onClick={() => setEditing(prev => "")} /> : <PencilIcon className={`w-12 cursor-pointer text-black hover:text-white ${editing !== "username"} ? 'disabled disabled:opacity-60' : ""`} onClick={() => setEditing((prev) => {return prev === "" ? "username" : prev})} />}
                            </div>
                        </div>
                        <div className="col-auto grid grid-cols-10 content-center align-middle items-center text-2xl text-white" >
                            <div className="col-span-8 px-2" >{editing === "email" ? <input className="px-1 text-black" type={"text"} placeholder={email} onChange={handleChange} onKeyDown={handleKeyDown}></input> : email}</div>
                            <div className="col-span-2 px-1 content-start">
                                {editing === "email" ? <DocumentCheckIcon className="w-12 cursor-pointer" onClick={() => setEditing(prev => "")} /> : <PencilIcon className={`w-12 cursor-pointer text-black hover:text-white ${editing !== "email"} ? 'disabled disabled:opacity-60' : ""`} onClick={() => setEditing((prev) => {return prev === "" ? "email" : prev})} />}
                            </div>
                        </div>
                        <span className="col-auto grid px-2 text-2xl content-center align-middle items-center text-white">Join Date: {joinDate}</span>
                        <span className="col-auto grid px-2 text-2xl content-center align-middle items-center text-white">Points: {user.points || 0}</span>
                    </div>
                
                {/* Row 2 */}
                    {/* Column 1: Tabs Area */}
                    <div className="col-auto grid grid-cols-4 h-min pt-3 text-2xl gap-0" style={{"color": "white"}}>
                        <div className={`col-auto grid text-center ${currentTab === 'Maps' ? 'bg-dark-green-lighter' : 'bg-dark-green'} p-2 rounded-md cursor-pointer`} onClick={() => setCurrentTab((prev) => "Maps")}>Maps</div>
                        <div className={`col-auto grid text-center ${currentTab === 'Tilesets' ? 'bg-dark-green-lighter' : 'bg-dark-green'} p-2 rounded-md cursor-pointer`}onClick={() => setCurrentTab((prev) => "Tilesets")}>Tilesets</div>
                        <div className={`col-auto grid text-center ${currentTab === 'Comments' ? 'bg-dark-green-lighter' : 'bg-dark-green'} p-2 rounded-md cursor-pointer`}onClick={() => setCurrentTab((prev) => "Comments")}>Comments</div>
                    </div>

                    {/* Column 2: Create Map/Tileset Buttons Area */}
                    <div className="col-auto grid grid-cols-2 pt-3 text-2xl gap-12" style={{"color": "white"}}>
                        <div className="col-auto grid text-center bg-dark-green-lighter p-2 rounded-md cursor-pointer" onClick={() => setModalOpen8(!modalOpen8)}>Create Map</div>
                        <div className="col-auto grid text-center bg-dark-green-lighter p-2 rounded-md cursor-pointer" onClick={() => setTilesetModal(!tilesetModal)}>Create Tilesets</div>
                    </div>
                {/* Row 3 */}
                    {/* Column 1: Item Cards for List */}
                    <div className="col-span-2 bg-dark-green-lighter rounded-md">
                        <div className="snap-y h-[64rem] overflow-y-auto p-8 space-y-2">
                            {
                                currentTab === "Maps" ? userMaps.map(m => <ItemCard key={m.views} inProfile={true} map={m} isMap={true} />)
                                : (currentTab === "Tilesets" ? userTilesets.map(t => <ItemCard key={t.views} inProfile={true} tileset={t} isMap={false} />)
                                    : getUserCommentsFromMapsAndTilesets())
                            }
                        </div>
                    </div>
                {/* Row 4 */}
                    {/* Column 1: Only for the Delete Account Button */}
                    <div className="col-span-2 items-center text-center p-3">
                        <button className="bg-dark-green-lighter text-red font-bold rounded-md p-3" onClick={() => setDeleteAccountModal((prev) => !prev)} >Delete Account</button>
                    </div>
            </div>
            <ModalEight setModalOpen={setModalOpen8} modalOpen={modalOpen8} />
            <CreateTilesetModal setModalOpen={setTilesetModal} modalOpen={tilesetModal} />
        </>
    );
}