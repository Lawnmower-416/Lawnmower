import React from "react";
import SecondHeader from "../components/SecondHeader/SecondHeader";
import MySignIn from "../components/SignIn/SignIn";

const SignIn = () => {
  return (
    <>
      <SecondHeader navItem="Sign Up" to="/signup" />
      <MySignIn />
    </>
  );
};

export default SignIn;
