import {PencilIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import ItemCard from "./../ItemCard";
import Header from "./Header";
// import {UserCircleIcon} from "@heroicons/react/24/outline";

export default function Profile() {
    return (
        <>
            <Header/>
            <div className="w-auto grid grid-cols-2 grid-rows-profile gap-1 bg-gradient-primary p-8">
                {/* Row 1 */}
                    {/* Column 1: User Profile Area */}
                    <div className="col-auto">
                        {/* Left Panel: User Icon and Edit */}
                        <div>
                            <UserCircleIcon className="fill-blue" display={"block"} style={{"margin": "auto"}} width={"30%"} />
                            <PencilIcon display={"block"} style={{"margin": "auto"}} width={"10%"}/>
                        </div>
                    </div>

                    {/* Column 2: Right Panel: name, email, date, points */}
                    <div className="col-auto grid grid-rows-4 gap-0 p-5 bg-dark-green-lighter" >
                        <div className="col-auto grid grid-cols-10 items-center text-2xl" style={{"color": "white"}}>
                            <div className="col-span-8 px-2" >xXxFortniteLover1337xXx</div>
                            <div className="col-span-2 px-1 content-start"><PencilIcon display={"block"} style={{"margin": "auto"}} width={"40%"} /></div>
                        </div>
                        <div className="col-auto grid grid-cols-10 content-center align-middle items-center text-2xl" style={{"color": "white"}} >
                            <div className="col-span-8 px-2" >JonathanDoemitry1926@gmail.com</div>
                            <div className="col-span-2 px-1 content-start"><PencilIcon display={"block"} style={{"margin": "auto"}} width={"40%"} /></div>
                        </div>
                        <span className="col-auto grid px-2 text-2xl content-center align-middle items-center" style={{"color": "white"}}>Join Date: January 1st, 1970</span>
                        <span className="col-auto grid px-2 text-2xl content-center align-middle items-center" style={{"color": "white"}}>Points: 123,456,789</span>
                    </div>
                
                {/* Row 2 */}
                    {/* Column 1: Tabs Area */}
                    <div className="col-auto grid grid-cols-4 h-min pt-3 text-2xl gap-0" style={{"color": "white"}}>
                        <div className="col-auto grid text-center bg-dark-green p-2 rounded-md">Maps</div>
                        <div className="col-auto grid text-center bg-dark-green p-2 rounded-md">Tilesets</div>
                        <div className="col-auto grid text-center bg-dark-green p-2 rounded-md">Comments</div>
                    </div>

                    {/* Column 2: Create Map/Tileset Buttons Area */}
                    <div className="col-auto grid grid-cols-2 pt-3 text-2xl gap-12" style={{"color": "white"}}>
                        <div className="col-auto grid text-center bg-dark-green-lighter p-2 rounded-md">Create Map</div>
                        <div className="col-auto grid text-center bg-dark-green-lighter p-2 rounded-md">Create Tilesets</div>
                    </div>
                {/* Row 3 */}
                    {/* Column 1: Item Cards for List */}
                    <div className="col-span-2 bg-dark-green-lighter rounded-md">
                        <div className="snap-y h-[32rem] overflow-y-auto p-8 space-y-2">
                            <ItemCard />
                        </div>
                    </div>
                {/* Row 3 */}
                    {/* Column 1: Only for the Delete Account Button */}
                    <div className="col-span-2 items-center text-center p-3">
                        <button className="bg-dark-green-lighter text-red font-bold rounded-md p-3">Delete Account</button>
                    </div>
            </div>
        </>
    );
}