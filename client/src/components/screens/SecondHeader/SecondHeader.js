import React from "react";

import { Link } from "react-router-dom";

const SecondHeader = ({ navItem, to, avater }) => {
  return (
    <div className="headerWrapper ">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto py-2 header w-11/12">
        <Link to="/" className="flex items-center gap-1 sm:gap-3">
          <img
            src="images/logo.png"
            alt="#"
            className="w-16 lg:w-20 2xl:w-28"
          />
          <h3 className="font-bold font-inter text-xl  sm:text-2xl  lg:text-4xl   2xl:text-6xl">
            Lawnmower
          </h3>
        </Link>
        {avater ? (
          <img src={avater} alt="#" className="w-16" />
        ) : (
          <Link
            to={to}
            className=" font-inter font-bold text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
          >
            {navItem}
          </Link>
        )}
      </div>
    </div>
  );
};

export default SecondHeader;
