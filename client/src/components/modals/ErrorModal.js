import React from "react";
import close from "../modals/images/close.png";
import { useContext } from "react";
import AuthContext from "../../auth";


const ErrorModal = () => {
    const { auth } = useContext(AuthContext);

    const handleCloseErrorModal = () => {
        auth.wipeErrorMessage();
    }

    if (auth.errorMessage !== null) {
        return (
            <>
                <div
                    className={`modal fixed inset-0 overflow-y-auto duration-100 active`}
                >
                    <div
                        className="modal-closer absolute inset-0 bg-black opacity-70"
                        onClick={handleCloseErrorModal}
                    ></div>
                    <div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-10">
                        <div className="modal-content duration-500 rounded-2xl bg-gradient-green p-6 sm:p-10 w-full max-w-lg relative z-10 sm:pt-5 sm:pb-6">
                            <img
                                src={close}
                                className="absolute right-2 top-2 w-7 cursor-pointer"
                                onClick={handleCloseErrorModal}
                                alt=""
                            />
                            <div className="rounded-lg bg-dark-green text-white text-center py-3 px-3">
                                <h4 className="text-[22px] font-bold text-white">
                                    Whoops!
                                </h4>
                                <div>
                                    {auth.errorMessage}
                                </div>
                            </div>
                            <div className="flex justify-center gap-4 mt-5">
                                <button
                                    className="rounded-lg py-[5px] px-6  cursor-pointer duration-300 bg-dark-green text-red text-[16px] font-bold flex-grow max-w-[200px]"
                                    onClick={handleCloseErrorModal}
                                >
                                    Okay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
                } else {
                    return null
                }
};

export default ErrorModal;