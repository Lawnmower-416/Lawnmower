import React, { useState } from "react";

const ModalEight = ({ modalOpen, setModalOpen }) => {
	const [size, setSize] = useState("128");
	const [sizeW, setSizeW] = useState("256");
	const [sizeT, setSizeT] = useState("8");

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
					<div className="mb-6 flex flex-wrap items-center gap-2">
						<h4 className="text-[20px] font-bold">Title</h4>
						<h3 className="rounded-lg py-1 px-6 text-white cursor-pointer bg-dark-green text-[20px] font-semibold sm:px-16">
							My First App
						</h3>
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
							onClick={() => setModalOpen(!modalOpen)}
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

export default ModalEight;
