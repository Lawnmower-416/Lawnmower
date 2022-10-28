import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";

const SignIn = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const inputs = [
    {
      label: "Username",
      type: "text",
      name: "username",
    },
    {
      label: "Password",
      type: "text",
      name: "password",
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="main-background min-h-screen pt-20">
      <div className="my-container flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 items-center ">
        <div className="mx-auto">
          <p className="font-inter font-bold text-4xl xl:text-5xl text-center">
            Sign In
          </p>
          <img src="images/contactus.png" alt="#" className="w-96 lg:w-full" />
        </div>
        <div className=" max-w-lg w-full">
          {inputs.map((el, i) => (
            <Input {...el} key={i} value={values["size"]} onChange={onChange} />
          ))}
          <Link
            to="/forgotpassword"
            className="text-[#0000EE] font-inter font-bold underline-offset-2 underline tex-lg lg:text-xl"
          >
            Forgot Password?
          </Link>
          <div className="flex justify-center flex-col items-center">
            <button
              type="submit"
              className="mt-12 text-lg sm:text-xl md:text-3xl font-inter font-bold text-center bg-[#006400] px-16 sm:px-20 py-2 sm:py-3 text-white rounded-xl"
            >
              Submit
            </button>
            <Link
              to="/signup"
              className="text-[#0000EE] font-inter font-bold text-xl sm:text-2xl lg:text-3xl"
            >
              or Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
