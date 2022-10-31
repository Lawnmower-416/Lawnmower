import { ChevronDownIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as LikedIcon, HandThumbDownIcon as DislikedIcon, ChevronDoubleUpIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import CommentCard from "./CommentCard";

/**
 *  Needs to pass in the following objects:
 *  {likes: Number, dislikes: Number, title: String, owner: String, created: Date,
 *  visibility: String, views: Number, comments: [String], thumbnail: URL}
 * @param {any} props 
 * @returns render
 */
export default function ItemCard(props) {
    const [show, setShow] = useState(false);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(props.likes || 0);
    const [dislikeCount, setDislikeCount] = useState(props.dislikes || 0);
    const [views, setViews] = useState(props.views || 0);
    const [points, setPoints] = useState(likeCount - dislikeCount);
    // console.log(show);

    const handleLike = () => {
        // Handle the case where if the user already disliked...
        setDislike((prev) => {
            if (prev) { // User already disliked...
                setDislikeCount((prevCount) => prevCount - 1);
                setPoints((prevPts) => prevPts + 1);
                return !prev; // Change dislike state
            }
            return prev;
        });

        setLike((prev) => {
            if (!prev) { // User toggle like
                setLikeCount((prevCount) => prevCount + 1);
                setPoints((prevPts) => prevPts + 1);
            } else { // User untoggled like
                setLikeCount((prevCount) => prevCount - 1);
                setPoints((prevPts) => prevPts - 1);
            }
            return !prev;
        });
    };

    const handleDislike = () => {
        // Handle the case where if the user already liked...
        setLike((prev) => {
            if (prev) { // User already liked...
                setLikeCount((prevCount) => prevCount - 1);
                setPoints((prevPts) => prevPts - 1);
                return !prev;
            }
            return prev;
        });

        setDislike((prev) => {
            if (!prev) { // User toggles dislike...
                setDislikeCount((prevCount) => prevCount - 1);
                setPoints((prevPts) => prevPts - 1);
            } else { // User untoggles dislike...
                setDislikeCount((prevCount) => prevCount - 1);
                setPoints((prevPts) => prevPts + 1);
            }
            return !prev;
        });
    }

    const handleView = () => {
        setShow((prev) => !prev);
        if (!show) setViews((prevCount) => prevCount + 1);
    }

    return (
        <div className="snap-start flex flex-col">
            <div className="flex flex-row p-1 max-w bg-light-gray rounded-t-xl shadow-lg items-center space-x-4">
                {/* Column 1: Likes/Dislikes */}
                    <div className="order-1 items-center p-2">
                            <div className="align-middle text-center items-center">
                                { like ? <LikedIcon className="w-12 cursor-pointer text-dark-green" onClick={handleLike} /> : <HandThumbUpIcon className="w-12 cursor-pointer" onClick={handleLike} />}
                                <span className="text-xl">{points}</span>
                                { dislike ? <DislikedIcon className="w-12 align-middle cursor-pointer text-red" onClick={handleDislike} /> : <HandThumbDownIcon className="w-12 align-middle cursor-pointer" onClick={handleDislike} />}
                            </div>
                    </div>
                {/* Column 2: Image */}
                    <div className="flex order-2 align-middle content-center items-center p-2">
                        {/* Col 2 */}
                            <div className="flex">
                                {props.thumbnail ? <img className="object-cover h-48 w-48 content-center" src={props.thumbnail} alt="Map" />
                                : <QuestionMarkCircleIcon className="w-32" /> }
                            </div>
                    </div>
                {/* Column 3: Map/Tileset Name, Author, Creation Date */}
                    <div className="flex flex-col flex-grow order-3 align-middle p-2">
                        <p className="text-3xl font-bold">{props.title || "Title"}</p>
                        <p className="text-xl">By: {props.owner || "Author"}</p>
                        <p className="text-xl">Created: {props.created || "Date"}</p>
                    </div>
                {/* Column 4: Public/Private, Views, Delete, Show Comments */}
                    <div className="flex flex-col order-last text-left space-y-3">
                        <p className="text-xl font-bold">{props.visibility || "Test"}</p>
                        <p className="text-xl">Views: {views}</p>
                        <TrashIcon className="w-12 cursor-pointer fill-red" />
                        {/* Comments Part */}
                        <p className="font-bold relative bottom-0 cursor-pointer" onClick={handleView}>
                            Show Comments{show ? <ChevronDoubleUpIcon className="w-6" style={{"display": "inline"}} /> : <ChevronDownIcon className="w-6" style={{"display": "inline"}} />}
                        </p>
                    </div>
            </div>
            {/* Displaying Comments */}
            <div className={`flex flex-col p-1 pt-3 ${show ? 'h-[32rem]' : '' } max-w-full ${!show ? 'bg-light-grey' : 'bg-light-green' } overflow-y-auto overflow-x-hidden rounded-b-xl shadow-lg space-y-4`}>
                {
                    show ?
                    (<><CommentCard /><CommentCard /><CommentCard /><CommentCard /></>)
                    : <div></div>
                }
            </div>
        </div>
    )
}