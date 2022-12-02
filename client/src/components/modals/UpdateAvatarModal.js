import React, { useContext, useState } from "react";
import AuthContext from "../../auth";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import alienIcon from "../modals/images/alien.png";
import monkeyIcon from "../modals/images/monkey.png";
import pirateIcon from "../modals/images/pirate.png";
import poroIcon from "../modals/images/poro.png";

const UpdateAvatarModal = ({ modalOpen, setModalOpen }) => {

    const { auth } = useContext(AuthContext);

    const handleBlackAvatar = () => {
        auth.updateAvatar("black");
        setModalOpen(!modalOpen);
    }

    const handleRedAvatar = () => {
        auth.updateAvatar("red");
        setModalOpen(!modalOpen);
    }

    const handleBlueAvatar = () => {
        auth.updateAvatar("blue");
        setModalOpen(!modalOpen);
    }

    const handleGreenAvatar = () => {
        auth.updateAvatar("green");
        setModalOpen(!modalOpen);
    }

    const handleAlienAvatar = () => {
        auth.updateAvatar("alien");
        setModalOpen(!modalOpen);
    }

    const handleMonkeyAvatar = () => {
        auth.updateAvatar("monkey");
        setModalOpen(!modalOpen);
    }

    const handlePirateAvatar = () => {
        auth.updateAvatar("pirate");
        setModalOpen(!modalOpen);
    }

    const handlePoroAvatar = () => {
        auth.updateAvatar("poro");
        setModalOpen(!modalOpen);
    }

	return (
		<div
			className={`modal fixed inset-0 overflow-y-auto duration-100 ${
				modalOpen ? "active" : ""
			}`}
		>
			<div
				className="modal-closer absolute inset-0 bg-black opacity-70"
				onClick={() => setModalOpen(!modalOpen)}
			></div>
			<div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-10">
				<div className="modal-content duration-500 rounded-2xl bg-gradient-green p-6 sm:p-10 w-full max-w-lg relative z-10 sm:pt-5 sm:pb-6">

					<div className="mb-2 flex text-[20px] font-bold justify-center text-black">
						Avatars
					</div>
	
                    <div className="grid grid-cols-4 gap-4">
                        <button 
                            onClick={handleBlackAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                            <UserCircleIcon/>
                        </button>

                        <button 
                            onClick={handleRedAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                            <UserCircleIcon className="text-red"/>
                        </button>

                        <button
                            onClick={handleGreenAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                            <UserCircleIcon className="text-darker-green"/>
                        </button>

                        <button
                            onClick={handleBlueAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                            <UserCircleIcon className="text-[blue]"/>
                        </button>

                        <button
                            onClick={handleAlienAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                           <img src={alienIcon} alt="alien" className="scale-125"/>
                        </button>

                        <button
                            onClick={handleMonkeyAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                           <img src={monkeyIcon} alt="monkey"/>
                        </button>

                        <button
                            onClick={handlePirateAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                           <img src={pirateIcon} alt="pirate"/>
                        </button>

                        <button
                            onClick={handlePoroAvatar}
                            className="col-span-1 flex justify-center hover:bg-darker-gray rounded-3xl">
                           <img src={poroIcon} alt="poro" className="aspect-square"/>
                        </button>
                    </div>

					<div className="flex justify-center gap-4 mt-5">
						<button
							className="rounded-lg py-[8px] px-6 text-white cursor-pointer duration-300 bg-dark-green text-[16px] font-bold max-w-[200px]"
							onClick={() => setModalOpen(!modalOpen)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateAvatarModal;
