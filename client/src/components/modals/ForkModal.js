import React from "react";
import { useContext } from "react";
import GlobalStoreContext from "../../store";

const ForkModal = ({ modalOpen, setModalOpen, mapId, tilesetId }) => {
    const { store } = useContext(GlobalStoreContext);

    const handleFork = () => {
        if (mapId) {
            console.log("forking map");
            store.forkMap(mapId);
        }
        if (tilesetId) {
            console.log("forking tileset");
            store.forkTileset(tilesetId);
        }
        setModalOpen(!modalOpen)
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
					<div className="modal-content duration-500 rounded-2xl bg-gradient-green p-6 sm:p-10 w-full max-w-md relative z-10 sm:pt-5 sm:pb-6">
						<div className=" mb-5">
							<h4 className="text-[28px] text-center font-bold leading-tight mb-1">
								Are you sure you want to copy this work?
							</h4>
							
						</div>
						<div className="flex justify-evenly gap-4">
							<button
								className="rounded-lg py-3 px-6 text-white cursor-pointer duration-300 bg-purple text-[18px] font-bold flex-grow"
								onClick={handleFork}
							>
								Copy
							</button>
							<button
								className="rounded-lg py-3 px-6 text-white cursor-pointer duration-300 bg-dark-green text-[18px] font-bold flex-grow"
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

export default ForkModal;
