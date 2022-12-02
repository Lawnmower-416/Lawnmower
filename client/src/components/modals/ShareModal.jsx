import React, {useContext, useEffect, useState} from "react";
import avatar from "./images/avatar.png";
import user_add from "./images/add-user.svg";
import AuthContext from "../../auth";
import EditorContext from "../../editor";

const ShareModal = ({ modalOpen, setModalOpen }) => {
	const { auth } = useContext(AuthContext);
	const { store } = useContext(EditorContext);

	useEffect(() => {
		if(store.collaborators.length === 0) {
			store.loadCollaborators();
		}
	}, [modalOpen]);

	useEffect(() => {

	}, [store.collaborators]);

	const [isPublic, setVisibility] = useState(store.tileset ? store.tileset.public : (store.map ? store.map.public : false));
	const [copy, setCopy] = useState(false);
	const [collaboratorUsername, setCollaboratorUsername] = useState("");

	let link = "http://34.193.24.27/" + (store.tileset ? "tilesetEditor" : "mapEditor") + "/" + (store.tileset ? store.tileset._id : store.map._id);

	const handleCopy = () => {
		setCopy(true);
		navigator.clipboard.writeText(link);
		setTimeout(() => {
			setCopy(false);
		}, 1500);
	};

	const handleSubmit = () => {
		store.setTilesetVisiblity(isPublic);
		setModalOpen(false);
	}

	const addCollaborator = () => {
		store.addCollaborator(collaboratorUsername);
	}

	let collaborators;

	if (store.collaborators && store.collaborators.length > 0) {
		collaborators = store.collaborators.map((collaborator) => {
			return (
				<div
					className="flex justify-between items-center p-1 px-2 border border-white rounded-md bg-editor-tertiary"
					key={collaborator._id}
				>
					<div className="flex items-center">
						<img className="w-7 mr-1" src={avatar} alt="" />
						<h5 className="text-[18px] font-medium text-white">
							{collaborator.username}
						</h5>
					</div>
					<h5 className="text-[18px] font-medium text-white">
						Editor
					</h5>
				</div>
			);
		});
	}

	return (
		<>
			<div
				className={
					`modal fixed z-50 inset-0 overflow-y-auto duration-100 ${modalOpen ? "active" : ""}`
				}
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
								className={
									`rounded-lg py-2 sm:py-3 px-4 sm:px-6 text-white cursor-pointer duration-300 
									${isPublic ? "bg-dark-green" : "bg-purple"}`
								}
								onClick={() => setVisibility(false)}
							>
								Private
							</button>

							<button
								className={
									`rounded-lg py-2 sm:py-3 px-4 sm:px-6 text-white cursor-pointer duration-300
									${isPublic ? "bg-purple" : "bg-dark-green"}`
								}
								onClick={() => setVisibility(true)}
							>
								Public
							</button>
						</div>
						{/* Copy Input Grp */}
						<div className="flex items-center flex-wrap gap-3 mt-3">
							<div className="text-[24px] font-semibold min-w-[88px]">
								URL :{" "}
							</div>
							<div className="flex gap-1 flex-grow">
								<input
									type="text"
									readOnly
									value={link}
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
										{auth.user.username}
									</h5>
								</div>
								<h5 className="text-[18px] font-medium text-white">
									Owner
								</h5>
							</div>
							{collaborators}
						</div>
						<div className="flex gap-2 flex-grow mt-3">
							<input
								type="text"
								placeholder="Add People by Username"
								className="h-[42px] px-3 rounded-[6px] white-shade text-black focus:text-black border-none outline-none w-0 flex-grow"
								value={collaboratorUsername}
								onChange={(e) => setCollaboratorUsername(e.target.value)}
							/>
							<button
								className={`h-[43px] rounded-5 pl-2 `}
								type="button"
								onClick={addCollaborator}
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
								onClick={handleSubmit}
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

export default ShareModal;
