import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { Menu } from '@headlessui/react';
import ModalEight from "../modals/CreateMapModal/CreateMap";
import CreateTilesetModal from "../modals/CreateTilesetModal";

import AuthContext from "../../auth";
import GlobalStoreContext from "../../store";


const Header = () => {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [modalOpen8, setModalOpen8] = useState(false);
  const [tilesetModal, setTilesetModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  let navArray = [
    { navItem: "FAQ", to: "/faq" },
    { navItem: "About", to: "/about" },
    { navItem: "Support", to: "/support" },

  ];

  // check the route. set navArray to empty array if the route is anything other than home, login, register, faq, about, support
  const location = useLocation();
  const path = location.pathname;
  if (path !== "/" && path !== "/login" && path !== "/register" && path !== "/faq" && path !== "/about" && path !== "/support") {
    navArray = [];
  }

  const handleLogout = () => {
    //auth.logout handles rerouting the user back to the home page, all logged out
    auth.logout();
  };

  let topRightMenu = 
        <div className="hidden md:flex gap-x-6 font-inter font-bold ">
        <Link
          to="/register"
          className="text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="text-lg md:text-lg lg:text-2xl 2xl:text-4xl"
        >
          Sign In
        </Link>
      </div>;
  if (auth.loggedInBool) {
    topRightMenu = 
    <Menu as="div" className="relative -translate-x-16">
      <Menu.Button>
        Avatar
      </Menu.Button>
      <Menu.Items className="absolute -translate-x-12 bg-darker-gray rounded-xl shadow-lg">
        <Menu.Item>
          <Link to="/profile" className="block px-4 py-2 text-white text-md text-center hover:bg-darker-gray rounded-t-xl w-full border-b-2 border-dark-gray">Profile</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/community" className="block px-4 py-2 text-white text-md hover:bg-darker-gray rounded-t-xl w-full border-b-2 border-dark-gray">Community</Link>
        </Menu.Item>
        <Menu.Item>

        <button onClick={() => setModalOpen8(!modalOpen8)} 
          className="block px-4 py-2 text-white text-md hover:bg-darker-gray rounded-t-xl w-full border-b-2 border-dark-gray">Create Map</button>
        </Menu.Item>
        <Menu.Item>
        <button onClick={() => setTilesetModal(!tilesetModal)}
          className="block px-4 py-2 text-white text-md hover:bg-darker-gray rounded-t-xl w-full border-b-2 border-dark-gray">Create Tileset</button>
        </Menu.Item>
        <Menu.Item>
          <button onClick={handleLogout} className="block px-4 py-2 text-white text-md hover:bg-darker-gray rounded-b-xl w-full">Logout</button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  }


  return (
    <div className="headerWrapper">
      <div className="flex justify-between items-center max-w-screen-2xl header">
        <Link to="/" className="flex items-center gap-1 sm:gap-3">
          <img
            src="./logo.png"
            alt="logo"
            className="w-16"
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

      {
      topRightMenu
      }
      
      </div>
      <ModalEight setModalOpen={setModalOpen8} modalOpen={modalOpen8} />
      <CreateTilesetModal setModalOpen={setTilesetModal} modalOpen={tilesetModal} />


    </div>
  );
};

export default Header;
