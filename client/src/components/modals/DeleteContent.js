import { useState } from "react"

export default function DeleteAccount({setModalOpen, modalOpen}) {
    const [openModal, closeModal] = useState(false);

    return (
        <div className="fixed insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            { modalOpen ?
            <div className="relative top-20 mx-auto p-5 border w-1/4 shadow-lg rounded-lg bg-light-green">
                <div className="mt-3 text-center">

                    <div className="bg-dark-green rounded-lg p-2">
                        <h3 className="text-lg leading-6 font-medium text-white">Are You Sure?</h3>
                        <h3 className="text-lg leading-6 font-medium text-white">Are you sure you want to delete your account?.</h3>
                        <h3 className="text-lg leading-6 font-medium text-white">This action cannot be undone.</h3>
                    </div>


                    <div className="flex justify-center pt-2">
                        <form className="w-4/6">
                            <label for="username" className="text-lg text-white float-left">Verify Your Username</label>
                            <input type="username" id="username" required
                                className="align-middle w-full text-black text-md rounded-lg block p-2.5 bg-white "/>
                                    
                            <label for="username" className="text-lg text-white float-left pt-2">Verify Your Password</label>
                            <input type="username" id="username" required
                                className="align-middle w-full text-black text-md rounded-lg block p-2.5 bg-white"/>
                        </form>
                    </div>




                    <div className="items-center pt-5 flex justify-center">
                        <button className="p-2 bg-dark-green text-red
                                    text-base font-medium rounded-lg w-1/3 hover:bg-black" onClick={() => setModalOpen(false)} >
                                Delete Account
                        </button>
                        <span className="w-1/6"></span>
                        <button className="p-2 bg-dark-green text-white
                                    text-base font-medium rounded-lg w-1/3 hover:bg-black" onClick={() => setModalOpen(false)} >
                                Cancel
                        </button>

                    </div>


                </div>
            </div> : <div></div>
            }
        </div>
    )
}