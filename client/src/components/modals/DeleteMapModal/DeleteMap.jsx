import React from "react";
import close from "./close.png";
import { useContext } from "react";
import GlobalStoreContext from "../../../store";


export const DeleteMapModal = ({ modalOpen, setModalOpen, map }) => {
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
	const { store } = useContext(GlobalStoreContext);

	const handleDeleteMap = () => {
		setModalOpen(!modalOpen)
		store.deleteMap(map._id);
	}

	return (
		<>
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
						<img
							src={close}
							className="absolute right-2 top-2 w-7 cursor-pointer"
							onClick={() => setModalOpen(!modalOpen)}
							alt=""
						/>
						<div className="rounded-lg bg-dark-green text-white text-center py-3 px-3">
							<h4 className="text-[22px] font-bold text-white">
								Are You Sure?
							</h4>
							<div>
								Are you sure you want to delete your <u>{map.title}</u>? This
								action cannot be undone.
							</div>
						</div>
						<div className="flex justify-between gap-4 mt-5">
							<button
								className="rounded-lg py-[5px] px-6  cursor-pointer duration-300 bg-dark-green text-red text-[16px] font-bold flex-grow max-w-[200px]"
								onClick={handleDeleteMap}
							>
								Delete
							</button>
							<button
								className="rounded-lg py-[5px] px-6 text-white cursor-pointer duration-300 bg-dark-green text-[16px] font-bold flex-grow max-w-[200px]"
								onClick={() => setModalOpen(!modalOpen)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
