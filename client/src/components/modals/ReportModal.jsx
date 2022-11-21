import React from "react";
import checkIcon from "./images/draw-check-mark.png";
/* Reports User Modal */
const ReportModal = ({ modalOpen, setModalOpen }) => {
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
							Report “FishLover96”
						</h4>
						<div className="p-4 sm:p-6 bg-[#ddd] min-h-[350px]">
							<label className="flex items-center mb-6">
								<input type="checkbox" name="report" hidden />
								<span className="w-8 h-8 border-0 outline-0 shadow-none bg-white check-icon flex justify-center items-center">
									<img src={checkIcon} className="w-5" alt="" />
								</span>
								<span className="w-0 flex-grow pl-2 text-[18px] font-medium">
									Inappropriate Name
								</span>
							</label>
							<label className="flex items-center mb-6">
								<input type="checkbox" name="report" hidden />
								<span className="w-8 h-8 border-0 outline-0 shadow-none bg-white check-icon flex justify-center items-center">
									<img src={checkIcon} className="w-5" alt="" />
								</span>
								<span className="w-0 flex-grow pl-2 text-[18px] font-medium">
									Inappropriate comments
								</span>
							</label>
							<label className="flex items-center mb-6">
								<input type="checkbox" name="report" hidden />
								<span className="w-8 h-8 border-0 outline-0 shadow-none bg-white check-icon flex justify-center items-center">
									<img src={checkIcon} className="w-5" alt="" />
								</span>
								<span className="w-0 flex-grow pl-2 text-[18px] font-medium">
									Inappropriate content
								</span>
							</label>
							<label className="flex items-center mb-6">
								<input type="checkbox" name="report" hidden />
								<span className="w-8 h-8 border-0 outline-0 shadow-none bg-white check-icon flex justify-center items-center">
									<img src={checkIcon} className="w-5" alt="" />
								</span>
								<span className="w-0 flex-grow pl-2 text-[18px] font-medium">
									Threats/Hate speech
								</span>
							</label>
							<div className="relative">
								<h5 className="text-[18px] font-bold mb-1">Other</h5>
								<input
									type="text"
									className="rounded-0 bg-white w-full h-11 px-4 focus:outline-none"
								/>
							</div>
						</div>
						<div
							className="text-center"
							onClick={() => setModalOpen(!modalOpen)}
						>
							<button
								type="button"
								className="py-[5px] px-4 font-medium text-red text-[20px] group rounded bg-dark-green mt-6"
							>
								Report
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReportModal;
