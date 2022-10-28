import React from "react";
import Header from "../Header/Header";

const HeroSection = () => {
  return (
    <div className="main-background ">
      <Header />
      <div className="my-container grid gap-6 items-center grid-cols-1 lg:grid-cols-2 py-16">
        <img
          src="images/hero.png"
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
  );
};

export default HeroSection;
