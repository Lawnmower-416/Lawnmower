import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  
  const [sidebar, setSidebar] = useState(false);
  const navArray = [
    { navItem: "FAQ", to: "/faq" },
    { navItem: "About", to: "/about" },
    { navItem: "Support", to: "/support" },

  ];
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
        {sidebar ? (
          <IoMdClose
            className="text-black text-2xl block md:hidden cursor-pointer"
            onClick={() => setSidebar((prev) => !prev)}
          />
        ) : (
          <GiHamburgerMenu
            className="text-black  text-2xl  block md:hidden cursor-pointer"
            onClick={() => setSidebar((prev) => !prev)}
          />
        )}
        <div className="hidden md:flex   gap-x-6  items-center gap-12 font-inter font-bold ">
          {navArray.map((el, i) => (
            <Link
              to={el.to}
              key={i}
              className="text-lg md:text-lg lg:text-2xl  2xl:text-4xl"
            >
              {el.navItem}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex gap-x-6 font-inter font-bold ">
          <Link
            to="/login"
            className="text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
          >
            Sign Up
          </Link>
          <Link
            to="/register"
            className="text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
          >
            Sign In
          </Link>
        </div>
      </div>
      {sidebar && (
        <div className="header min-h-screen pt-5 items-center flex-col flex md:hidden pb-10">
          {navArray.map((el, i) => (
            <Link
              to={el.to}
              key={i}
              className="font-inter font-bold py-2 text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
            >
              {el.navItem}
            </Link>
          ))}
          <Link
            to="/login"
            className="text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
          >
            Sign Up
          </Link>
          <Link
            to="/register"
            className="text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
