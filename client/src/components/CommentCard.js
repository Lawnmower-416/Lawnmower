import { useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as LikedIcon, HandThumbDownIcon as DislikedIcon } from "@heroicons/react/24/solid";

export default function CommentCard(props) {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(props.likedUsers || 0);
    const [dislikeCount, setDislikeCount] = useState(props.dislikedUsers || 0);
    const [points, setPoints] = useState(likeCount - dislikeCount);
    const [nested, setNested] = useState(props.nestedIndex || 0);
    const nestedOptions = [0, 16, 32, 48];

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

    const handleReply = () => {
        setNested(prevCount => {
            const prevNestVal = Math.min(prevCount + 1, nestedOptions.length - 1);
            console.log("Before", document.getElementById("comment-card").classList);
            document.getElementById("comment-card").classList.replace("space-x-" + nestedOptions[prevCount], "space-x-" + nestedOptions[prevNestVal]);
            console.log("After", document.getElementById("comment-card").classList);
            return Math.min(prevCount + 1, nestedOptions.length);
        });
    }

    return (
        <div id="comment-card" className='flex flex-row pr-3 space-x-0'>
            {/* TODO: Check if comment is nested or not with a visual indicator. For now it is tabbed */}
                <div className="order-1 p-2 align-middle"></div>
            <div className="flex flex-row flex-1 order-2 p-1 max-w-full bg-dark-green rounded-xl shadow-lg space-x-s text-white">
            {/* Column 1: Likes/Dislikes */}
                <div className="order-1 items-center p-2">
                    <div className="align-middle text-center items-center">
                        { like ? <LikedIcon className="w-12 cursor-pointer text-light-grey" onClick={handleLike} /> : <HandThumbUpIcon className="w-12 cursor-pointer" onClick={handleLike} />}
                        <span className="text-xl">{points}</span>
                        { dislike ? <DislikedIcon className="w-12 align-middle cursor-pointer text-red" onClick={handleDislike} /> : <HandThumbDownIcon className="w-12 align-middle cursor-pointer" onClick={handleDislike} />}
                    </div>
                </div>
            {/* Column 2: Commenter, Content */}
                <div className="flex flex-col flex-grow order-2 p-2">
                    <div className="order-1 p-2">
                        <p className="text-3xl font-bold">{props.owner || "Commenter"}</p>
                    </div>
                    <div className="flex-grow order-1 p-2">
                        <p className="text-xl">{props.contentType || "Comment Goes Here"}</p>
                    </div>
                </div>
            {/* Column 3: Reply */}
                <div className="flex flex-col flex-grow order-last p-2 relative items-end">
                    <p className="text-lg font-bold cursor-pointer absolute bottom-0" onClick={() => handleReply()}>Reply</p>
                </div>
            </div>
        </div>
    );
}