import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const PasswordChangedScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header/>
    <div className="main-background min-h-screen pt-20">
      <div className="my-container flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 items-center ">
        <div className="mx-auto">
          <p className="font-inter font-bold text-4xl xl:text-5xl text-center">
            Password Changed!
          </p>
          <img src="./contactus.png" alt="#" className="w-96 lg:w-full" />
        </div>
        <div className=" max-w-lg w-full">
          <div className="flex justify-center flex-col items-center">
            <button
              type="submit"
              className="mt-12 text-lg sm:text-xl md:text-3xl font-inter font-bold text-center bg-[#006400] px-16 sm:px-20 py-2 sm:py-3 text-white rounded-xl"
              onClick={() => navigate('/login')}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PasswordChangedScreen;
