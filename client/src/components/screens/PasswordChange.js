import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Header from "./Header";
import AuthContext from "../../auth";

const PasswordChange = () => {
  const { auth } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    newpassword: "",
    verifypassword: "",
  });
  const navigate = useNavigate();

  const inputs = [
    {
      label: "Email",
      type: "text",
      name: "email",
    },
    {
      label: "New Password",
      type: "password",
      name: "newpassword",
    },
    {
      label: "Verify Password",
      type: "password",
      name: "verifypassword",
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    
    //regex validation for email
    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    if (values.email === "" || values.newpassword === "" || values.verifypassword === "") {
      auth.setErrorMessage("All Fields are required!");
      return;
    } else if (!validateEmail(values.email)) {
      auth.setErrorMessage("Invalid email");
      return;
    } else if (values.newpassword.length < 8) {
      auth.setErrorMessage("Password must be at least 8 characters");
      return;
    } else if (values.newpassword !== values.verifypassword) {
      auth.setErrorMessage("Passwords do not match");
      return;
    }

    auth.changePassword(values.email, values.newpassword, values.verifypassword);
  }

  console.log(values);
  return (
    <div>
      <Header/>
    <div className="relative main-background min-h-screen pt-20">
      <div className="my-container flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 items-center ">
        <div className="mx-auto">
          <p className="font-inter font-bold text-4xl xl:text-5xl text-center">
            Reset Password
          </p>
          <img src="./contactus.png" alt="#" className="w-96 lg:w-full" />
        </div>
        <div className=" max-w-lg w-full">
          {inputs.map((el, i) => (
            <Input {...el} key={i} value={values["size"]} onChange={onChange} />
          ))}

          <div className="flex justify-center flex-col items-center">
            <button
              type="submit"
              className="mt-12 text-lg sm:text-xl md:text-3xl font-inter font-bold text-center bg-[#006400] px-16 sm:px-20 py-2 sm:py-3 text-white rounded-xl"
              onClick={onSubmit}
            >
              Change Password
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
    </div>
  );
};

export default PasswordChange;
