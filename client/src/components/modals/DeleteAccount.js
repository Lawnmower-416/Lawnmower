export default function DeleteAccount() {
    return (
        <div className="fixed insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">

            <div class="relative top-20 mx-auto p-5 border w-1/4 shadow-lg rounded-lg bg-light-green">
                <div class="mt-3 text-center">

                    <div class="bg-dark-green rounded-lg p-2">
                        <h3 class="text-lg leading-6 font-medium text-white">Are You Sure?</h3>
                        <h3 class="text-lg leading-6 font-medium text-white">Are you sure you want to delete your account?.</h3>
                        <h3 class="text-lg leading-6 font-medium text-white">This action cannot be undone.</h3>
                    </div>


                    <div class="flex justify-center pt-2">
                        <form class="w-4/6">
                            <label for="username" class="text-lg text-white float-left">Verify Your Username</label>
                            <input type="username" id="username" required
                                class="align-middle w-full text-black text-md rounded-lg block p-2.5 bg-white "/>
                                    
                            <label for="username" class="text-lg text-white float-left pt-2">Verify Your Password</label>
                            <input type="username" id="username" required
                                class="align-middle w-full text-black text-md rounded-lg block p-2.5 bg-white"/>
                        </form>
                    </div>




                    <div class="items-center pt-5 flex justify-center">
                        <button class="p-2 bg-dark-green text-red
                                    text-base font-medium rounded-lg w-1/3 hover:bg-black">
                                Delete Account
                        </button>
                        <span class="w-1/6"></span>
                        <button class="p-2 bg-dark-green text-white
                                    text-base font-medium rounded-lg w-1/3 hover:bg-black">
                                Cancel
                        </button>

                    </div>


                </div>
            </div>

        </div>
    )
}