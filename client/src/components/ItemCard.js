import { ChevronDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline"
import { HandThumbDownIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid"

export default function ItemCard(props) {
    return (
        <div className="snap-end flex flex-row p-1 max-w bg-light-grey rounded-xl shadow-lg items-center space-x-4">
            {/* Column 1: Likes/Dislikes */}
                <div className="order-1 items-center p-2">
                        <div className="align-middle text-center items-center">
                            <HandThumbUpIcon className="w-12  cursor-pointer" />
                            <span className="text-xl">1234</span>
                            <HandThumbDownIcon className="w-12 align-middle cursor-pointer" />
                        </div>
                </div>
            {/* Column 2: Image */}
                <div className="flex order-2 align-middle content-center items-center p-2">
                    {/* Col 2 */}
                        <div className="flex">
                            <img className="object-cover h-48 w-48 content-center" src="https://riftkit.net/img/map.jpg" alt="map" />
                        </div>
                </div>
            {/* Column 3: Map/Tileset Name, Author, Creation Date */}
                <div className="flex flex-col flex-grow order-3 align-middle p-2">
                    <p className="text-3xl font-bold">The Rift</p>
                    <p className="text-xl">By: Riot Games</p>
                    <p className="text-xl">Created: October 27, 2009</p>
                </div>
            {/* Column 4: Public/Private, Views, Delete, Show Comments */}
                <div className="flex flex-col order-last text-left space-y-3">
                    <p className="text-xl font-bold">Public</p>
                    <p className="text-xl">Views: 1234</p>
                    <TrashIcon className="w-12 cursor-pointer fill-red" />
                    <p className="font-bold relative bottom-0 cursor-pointer">
                        Show Comments<ChevronDownIcon className="w-6" style={{"display": "inline"}}/>
                    </p>
                </div>
        </div>
    )
}