import SignIn from "./SignIn";
import Header from "./Header";

export default function LoginScreen() {
    console.log("in login screen");
    return (
      <div>
        <Header />
        <SignIn/>
      </div>
    )
  }