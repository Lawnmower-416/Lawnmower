import React from "react";
import SecondHeader from "../components/SecondHeader/SecondHeader";
import CreateAccount from "../components/CreateAccount/CreateAccount";

const SignUp = () => {
  return (
    <>
      <SecondHeader navItem="Sign In" to="/signin" />
      <CreateAccount />
    </>
  );
};

export default SignUp;
