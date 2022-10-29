import React, { useRef, useState } from "react";
import avatar from "./avatar.png";

import user_add from "./add-user.svg";
import downArrow from "./down-arrow.png";
import user from "./user.png";

const ModalOne = ({ modalOpen, setModalOpen }) => {
	const [status, setStatus] = useState("private");
	const ref = useRef();
	const [copy, setCopy] = useState(false);

	const handleCopy = () => {
		setCopy(true);
		navigator.clipboard.writeText(ref.current.value);
		setTimeout(() => {
			setCopy(false);
		}, 1500);
	};
	return (
		<>
			<div
				className={`modal fixed inset-0 overflow-y-auto duration-100 ${
					modalOpen ? "active" : ""
				}`}
			>
				<div className="min-h-full flex justify-center items-center relative py-12 px-4 sm:px-10">
					<div
						className="modal-closer absolute top-0 left-0 w-full h-full bg-black opacity-70"
						onClick={() => setModalOpen(!modalOpen)}
					></div>
					<div className="modal-content duration-500 rounded-2xl bg-gradient-green p-6 sm:p-10 w-full max-w-lg relative z-10">
						{/* Status Private / Public */}
						<div className="flex items-center flex-wrap gap-3">
							<div className="text-[24px] font-semibold">Status : </div>
							<button
								className={`rounded-lg py-2 sm:py-3 px-4 sm:px-6 text-white cursor-pointer duration-300 bg-dark-green`}
							>
								Private
							</button>

							<button
								className={`rounded-lg py-2 sm:py-3 px-4 sm:px-6 text-white cursor-pointer duration-300 bg-purple`}
							>
								Publish
							</button>
						</div>
						{/* Copy Input Grp */}
						<div className="flex items-center flex-wrap gap-3 mt-3">
							<div className="text-[24px] font-semibold min-w-[88px]">
								URL :{" "}
							</div>
							<div className="flex gap-1 flex-grow">
								<input
									ref={ref}
									type="text"
									readOnly
									value="https://www.url.com/ma.."
									className="h-[42px] px-3 rounded-lg bg-dark-green text-white focus:text-white border-none outline-none w-0 flex-grow"
								/>
								<button
									className={`h-[42px] rounded-lg px-4 text-white 
									${copy ? "bg-purple" : "bg-dark-green"}`}
									type="button"
									onClick={handleCopy}
								>
									{copy ? "Copied" : "Copy"}
								</button>
							</div>
						</div>
						{/* Collaborators */}
						<div className="rounded bg-dark-green mt-4 text-white text-[20px] font-medium text-center py-[5px]">
							Collaborators
						</div>
						<div className="p-2 pb-20 group rounded bg-dark-green mt-2 d-flex flex-col gap-1">
							<div className="flex justify-between items-center p-1 px-2 border border-white rounded-md bg-purple">
								<div className="flex items-center">
									<img className="w-7 mr-1" src={avatar} alt="" />
									<h5 className="text-[18px] font-medium text-white">
										John Doe
									</h5>
								</div>
								<h5 className="text-[18px] font-medium text-white">
									Owner
								</h5>
							</div>
							<div className="flex justify-between items-center p-1 px-2 border border-white rounded-md">
								<div className="flex items-center">
									<img className="w-7 mr-1" src={avatar} alt="" />
									<h5 className="text-[18px] font-medium text-white">
										KayyOh
									</h5>
								</div>
								<h5 className="text-[18px] font-medium text-white flex items-center gap-1">
									<div className="relative">
										<select className="text-white bg-transparent appearance-none outline-none shadow-none border-none pr-6 pl-1 relative z-10 cursor-pointer">
											<option className="text-black text-sm">
												Editor
											</option>
											<option className="text-black text-sm">
												Owner
											</option>
											<option className="text-black text-sm">
												Editor
											</option>
											<option className="text-black text-sm">
												Owner
											</option>
										</select>
										<img
											className="w-5 cursor-pointer absolute right-0 top-[4px] z-[0]"
											src={downArrow}
											alt=""
										/>
									</div>
									<img
										className="w-6 cursor-pointer"
										src={user}
										alt=""
									/>
								</h5>
							</div>
							<div className="flex justify-between items-center p-1 px-2 border border-white rounded-md">
								<div className="flex items-center">
									<img className="w-7 mr-1" src={avatar} alt="" />
									<h5 className="text-[18px] font-medium text-white">
										ElevenZ
									</h5>
								</div>
								<h5 className="text-[18px] font-medium text-white flex items-center gap-1">
									<div className="relative">
										<select className="text-white bg-transparent appearance-none outline-none shadow-none border-none pr-6 pl-1 relative z-10 cursor-pointer">
											<option className="text-black text-sm">
												Editor
											</option>
											<option className="text-black text-sm">
												Owner
											</option>
											<option className="text-black text-sm">
												Editor
											</option>
											<option className="text-black text-sm">
												Owner
											</option>
										</select>
										<img
											className="w-5 cursor-pointer absolute right-0 top-[4px] z-[0]"
											src={downArrow}
											alt=""
										/>
									</div>
									<img
										className="w-6 cursor-pointer"
										src={user}
										alt=""
									/>
								</h5>
							</div>
						</div>
						<div className="flex gap-2 flex-grow mt-3">
							<input
								ref={ref}
								type="text"
								placeholder="Add People by Username"
								className="h-[42px] px-3 rounded-[6px] white-shade text-black focus:text-black border-none outline-none w-0 flex-grow"
							/>
							<button
								className={`h-[43px] rounded-5 pl-2 `}
								type="button"
							>
								<img src={user_add} className="w-10" alt="" />
							</button>
						</div>
						<div
							className="text-center"
							onClick={() => setModalOpen(!modalOpen)}
						>
							<button
								type="button"
								className="py-[5px] px-4 font-medium text-white text-[20px] group rounded bg-dark-green mt-10"
							>
								Done
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalOne;
