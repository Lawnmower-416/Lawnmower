import React, { useState, useContext } from "react";
import GlobalStoreContext from "../../store";

const CreateTilesetModal = ({ modalOpen, setModalOpen }) => {
	const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState("Untitled");
	const [size, setSize] = useState("8");
	const [maxSize, setMaxSize] = useState("128");
	const [invalidMsg, setInvalidMsg] = useState("");

	const handleCreateTileset = () => {
		if (parseInt(size) <= 0 || parseInt(size) > parseInt(maxSize)) {
			setInvalidMsg("Invalid Tile Size. Max Tileset Size is " + maxSize);
		} else {
			setModalOpen(!modalOpen);
			store.createNewTileset(title, size);
		}
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
					{
						invalidMsg !== "" ?
						<h4 className="text-[14px] font-bold text-red">{invalidMsg}</h4> :
						<></>
					}
					<div className="mb-6 flex items-center gap-2">
						<h4 className="text-[20px] font-bold">Title</h4>
						<input className="rounded-lg py-1 text-white cursor-pointer bg-dark-green text-[20px] font-semibold"  value={title} onChange={(e) => setTitle(e.target.value)} />
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<h4 className="text-[20px] font-bold">Tile Length</h4>
						<input
							type="text"
							value={size}
							onChange={(e) => setSize(e.target.value)}
							className="rounded-lg py-2 px-2 text-white bg-dark-green text-[18px] font-semibold outline-0 w-20 text-center"
						/>
					</div>
					<div className="flex justify-evenly gap-4 mt-5">
						<button
							className="rounded-lg py-[8px] px-6  cursor-pointer duration-300 bg-purple text-white text-[16px] font-bold max-w-[200px]"
							onClick={handleCreateTileset}
						>
							Create
						</button>
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

export default CreateTilesetModal;
