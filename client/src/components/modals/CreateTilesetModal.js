import React, { useState, useContext } from "react";
import GlobalStoreContext from "../../store";
import EditorContext from "../../editor";

const CreateTilesetModal = ({ modalOpen, setModalOpen }) => {
	const { store } = useContext(GlobalStoreContext);
	const { store: editor } = useContext(EditorContext)
    const [title, setTitle] = useState("Untitled");
	const [size, setSize] = useState("8");
	const [maxSize, setMaxSize] = useState(128);
	const [invalidMsg, setInvalidMsg] = useState("");

	const [selectedFile, setSelectedFile] = useState(null);

	const handleCreateTileset = () => {
		const sizeInt = parseInt(size);
		if (sizeInt <= 0 || sizeInt > maxSize) {
			setInvalidMsg("Invalid Tile Size. Max Tileset Size is " + maxSize);
		} else {
			setModalOpen(!modalOpen);
			store.createNewTileset(title, size);
		}
	}

	const handleImportTileset = () => {
		const sizeInt = parseInt(size);
		if (sizeInt <= 0 || sizeInt > maxSize) {
			setInvalidMsg("Invalid Tile Size. Max Tileset Size is " + maxSize);
		} else if(selectedFile === null) {
			setInvalidMsg("No file selected");
		} else if(selectedFile.type !== "image/png") {
			setInvalidMsg("Invalid file type");
		} else {
			setModalOpen(!modalOpen);



			//put selectedFile on Canvas and get 2d array of pixels
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			const img = new Image();
			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
				const pixels = ctx.getImageData(0, 0, img.width, img.height).data;
				let tiles = [];
				for(let i = 0; i < img.width; i += sizeInt) {
					for(let j = 0; j < img.height; j += sizeInt) {
						if(pixels[(i + j * img.width) * 4 + 3] === 0) continue;

						let tile = [];
						for(let k = 0; k < sizeInt; k++) {
							for(let l = 0; l < sizeInt; l++) {
								const index = (i + k + (j + l) * img.width) * 4;
								tile.push(pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]);
							}
						}

						tiles.push({data: Object.assign({}, tile)});
					}
				}
				const tilesetImage = {
					tiles
				}
				store.importTileset(title, sizeInt, tilesetImage);
			}
			img.src = URL.createObjectURL(selectedFile);
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
							className="rounded-lg py-[8px] px-6 text-white cursor-pointer duration-300 bg-dark-green text-[16px] font-bold max-w-[200px]"
							onClick={() => setModalOpen(!modalOpen)}
						>
							Cancel
						</button>

						<button
							className="rounded-lg py-[8px] px-6  cursor-pointer duration-300 bg-purple text-white text-[16px] font-bold max-w-[200px]"
							onClick={handleCreateTileset}
						>
							Create
						</button>
					</div>

					<div className="grid grid-cols-1 mt-3">
						<h1 className="flex justify-center font-bold text-2xl">Or Import a Tileset</h1>
						<div className="flex justify-center">
							<input
								type="file"
								size="50"
								onChange={(e) => setSelectedFile(e.target.files[0])}
							/>
						</div>
						<div className="flex justify-center">
							<button
								className="rounded-lg py-[8px] px-6  cursor-pointer duration-300 bg-purple text-white text-[16px] font-bold max-w-[200px]"
								onClick={handleImportTileset}
							>
								Import
							</button>
						</div>


					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTilesetModal;
