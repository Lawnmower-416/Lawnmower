import React from "react";
import search from "./search.png";
const ModalTwo = ({ modalOpen, setModalOpen }) => {
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
						<h4 className="text-[26px] text-center mb-5 font-bold leading-tight">
							Tags
						</h4>
						<div className="p-3 bg-[#ddd] min-h-[350px]">
							<div className="relative">
								<button className="absolute left-0 top-0 flex items-center h-full w-12 justify-center">
									<img
										src={search}
										className="w-6 opacity-80"
										alt=""
									/>
								</button>
								<input
									type="text"
									className="rounded-[20px] bg-white text-black w-full h-11 white-shade pl-12 focus:outline-none"
								/>
							</div>
							<div className="flex gap-3 justify-center mt-8">
								<button
									type="button"
									className="py-[5px] px-4 font-medium text-white text-[20px] group rounded bg-dark-green"
								>
									dungeon
								</button>
								<button
									type="button"
									className="py-[5px] px-4 font-medium text-white text-[20px] group rounded bg-dark-green"
								>
									island
								</button>
								<button
									type="button"
									className="py-[5px] px-4 font-medium text-white text-[20px] group rounded bg-dark-green"
								>
									water
								</button>
							</div>
						</div>
						<div
							className="text-center"
							onClick={() => setModalOpen(!modalOpen)}
						>
							<button
								type="button"
								className="py-[5px] px-4 font-medium text-white text-[20px] group rounded bg-dark-green mt-6"
							>
								Set Tags
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalTwo;
