import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Header from "./Header";
import AuthContext from "../../auth";

const RegisterScreen = () => {
  const { auth } = useContext(AuthContext)
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    verifypassword: "",
  });
  const inputs = [
    {
      label: "First Name",
      type: "text",
      name: "firstname",
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastname",
    },
    {
      label: "Username",
      type: "text",
      name: "username",
    },
    {
      label: "Email",
      type: "text",
      name: "email",
    },

    {
      label: "Password",
      type: "text",
      name: "password",
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

  const onSubmit = (e) => {
    e.preventDefault();
    const firstname = values.firstname;
    const lastname = values.lastname;
    const username = values.username;
    const email = values.email;
    const password = values.password;
    const verifypassword = values.verifypassword;
    auth.register(firstname, lastname, username, email, password, verifypassword);
  };

  const credentialError = <div className="absolute text-red font-inter font-bold">{auth.errorMessage}</div>;

  return (
    <div>
      <Header />
    <div className="main-background min-h-screen pt-20">
      <div className="my-container flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 items-center lg:items-start ">
        <div className="mx-auto pt-20">
          <p className="font-inter font-bold text-4xl xl:text-5xl text-center">
            Create An Account
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
              onClick={onSubmit}
              className="mt-12 text-lg sm:text-xl md:text-3xl font-inter font-bold text-center bg-[#006400] px-16 sm:px-20 py-2 sm:py-3 text-white rounded-xl"
            >
              Create Account
            </button>
            <Link
              to="/login"
              className="text-[#0000EE] font-inter font-bold text-xl sm:text-2xl lg:text-3xl"
            >
              or Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegisterScreen;
