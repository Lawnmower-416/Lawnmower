import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";

const PasswordChange = () => {
  const [values, setValues] = useState({
    currentpassword: "",
    newpassword: "",
    verifypassword: "",
  });
  const navigate = useNavigate();

  const inputs = [
    {
      label: "Current Password",
      type: "text",
      name: "currentpassword",
    },
    {
      label: "New Password",
      type: "text",
      name: "newpassword",
    },
    {
      label: "Verify Password",
      type: "text",
      name: "verifypassword",
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
  return (
    <div className="relative main-background min-h-screen pt-20">
      <div className="my-container flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 items-center ">
        <div className="mx-auto">
          <p className="font-inter font-bold text-4xl xl:text-5xl text-center">
            Reset Password
          </p>
          <img src="images/contactus.png" alt="#" className="w-96 lg:w-full" />
        </div>
        <div className=" max-w-lg w-full">
          {inputs.map((el, i) => (
            <Input {...el} key={i} value={values["size"]} onChange={onChange} />
          ))}

          <div className="flex justify-center flex-col items-center">
            <button
              type="submit"
              className="mt-12 text-lg sm:text-xl md:text-3xl font-inter font-bold text-center bg-[#006400] px-16 sm:px-20 py-2 sm:py-3 text-white rounded-xl"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="absolute text-[#0000EE] font-inter font-bold underline-offset-2 underline tex-lg lg:text-xl bottom-5 right-5"
      >
        Go Back
      </button>
    </div>
  );
};

export default PasswordChange;
