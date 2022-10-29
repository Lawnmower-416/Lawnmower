import React from "react";

const HomeScreen = () => {
  return (
    <div>
    <div className="flex flex-col main-background pb-8 shadow-xl">
      <div className="my-container grid gap-6 items-center grid-cols-1 lg:grid-cols-2 py-16">
        <img
          src="./hero.png"
          alt="#"
          className="w-full md:w-8/12 mx-auto lg:w-full order-2 lg:order-1"
        />
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl heading-leading text-center font-montserrat font-bold 2xl:text-heading text-white">
            Design Your <br />
            World
          </h2>
          <p className="pt-2 text-xl sm:text-2xl lg:text-3xl xl:text-4xl  2xl:text-tagline font-inter text-center  text-white">
            Create tilesets and 2D maps
          </p>
          <div className="flex flex-col justify-center items-center pt-8">
            <button className="outline-none bg-button-bg px-8 rounded-lg py-3 text-white  font-bold text-2xl text-center sm:text-3xl lg:text-4xl xl:text-5xl  2xl:text-6xl font-inter">
              SIGN UP FOR FREE
            </button>
            <div className="pt-2 flex justify-between items-center gap-6 lg:gap-10">
              <p className="font-inter text-white font-bold text-md sm:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl">
                Existing User?
              </p>
              <p className="font-inter text-white font-bold text-md sm:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl">
                Enter as a guest
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-center pt-10">
      <div className="grid grid-cols-3 w-3/4  ">
          <div className="flex flex-col">
            <h1 className="text-5xl text-center">Create</h1>
            <img src="../create.png" alt="createImg" className="h-3/4 mx-auto p-5"/>
            <p className="text-center">Creates worlds tile by tile</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl text-center">Collaborate</h1>
            <img src="../collaborate.png" alt="createImg" className="h-3/4 mx-auto p-5"/>
            <p className="text-center">Invite friends to create with you</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl text-center">Share</h1>
            <img src="../share.png" alt="createImg" className="h-3/4 mx-auto p-5"/>
            <p className="text-center">Publish your work to the world and browse other creations</p>
          </div>
      </div>
    </div>



    </div>
  );
};

export default HomeScreen;
