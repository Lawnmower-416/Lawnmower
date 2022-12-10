import React, { useState, useContext } from "react";
import GlobalStoreContext from "../../store";

const CreateMapModal = ({ modalOpen, setModalOpen }) => {
	const { store } = useContext(GlobalStoreContext);
	const [title, setTitle] = useState("Untitled");
	const [size, setSize] = useState("128");
	const [sizeW, setSizeW] = useState("256");
	const [sizeT, setSizeT] = useState("8");

	const [maxMapSize, setMaxMapSize] = useState("512");
	const [maxTileSize, setMaxTileSize] = useState("128");
	const [invalidMsg, setInvalidMsg] = useState("");

	const handleCreateMap = () => {
		if (size <= 0 || size > maxMapSize || sizeW <= 0 || sizeW > maxMapSize)
		{
			setInvalidMsg("Invalid Map Size. Max Map Size (Length and Width) is " + maxMapSize);
		} else if (sizeT <= 0 || sizeT > maxTileSize) {
			setInvalidMsg("Invalid Tile Size. Max Tileset Size is " + maxTileSize);
		} else {
			setModalOpen(!modalOpen);		
			store.createNewMap(title, size, sizeW, sizeT);
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
						invalidMsg === "" ?
						<h4 className="text-[14px] font-bold text-red">{invalidMsg}</h4> :
						<></>
					}
					<div className="mb-6 flex flex-wrap items-center gap-2">
						<h4 className="text-[20px] font-bold">Title</h4>
						<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="rounded-lg py-1 px-6 text-white cursor-pointer text-center bg-dark-green text-[20px] font-semibold sm:pl-4 ml-2"
							/>
					</div>
					<div className="flex flex-wrap items-center gap-4">
						<h4 className="text-[20px] font-bold">Map Size</h4>
						<div className="flex flex-wrap items-center gap-2">
							<input
								type="text"
								value={size}
								onChange={(e) => setSize(e.target.value)}
								className="rounded-lg py-2 px-2 text-white bg-dark-green text-[18px] font-semibold outline-0 w-20 text-center"
							/>
							<h4 className="text-[20px] font-bold">length</h4>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<input
								type="text"
								value={sizeW}
								onChange={(e) => setSizeW(e.target.value)}
								className="rounded-lg py-2 px-2 text-white bg-dark-green text-[18px] font-semibold outline-0 w-20 text-center"
							/>
							<h4 className="text-[20px] font-bold">width</h4>
						</div>
					</div>
					<div className="mt-8 text-white text-center text-[20px] font-bold mb-4">
						Tile size cannot be changed after creation
					</div>
					<div className="flex flex-wrap items-center gap-2 justify-center">
						<h4 className="text-[20px] font-bold">Tile Length</h4>
						<input
							type="text"
							value={sizeT}
							onChange={(e) => setSizeT(e.target.value)}
							className="rounded-lg py-2 px-2 text-white bg-dark-green text-[18px] font-semibold outline-0 w-20 text-center"
						/>
					</div>
					<div className="flex justify-evenly gap-4 mt-5">
						<button
							className="rounded-lg py-[8px] px-6  cursor-pointer duration-300 bg-purple text-white text-[16px] font-bold max-w-[200px]"
							onClick={handleCreateMap}
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

export default CreateMapModal;
