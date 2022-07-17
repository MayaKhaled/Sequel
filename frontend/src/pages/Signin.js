import React, { useRef } from "react";
import "../stylesheets/LoginSignupContainer.css";
import Login from "./Login2";
import Register from "./Signup";
import Navbar from "../components/Navbar/Navbar";

export default function Signin() {
  const [login, setLogin] = React.useState(true);

  const signinRef = useRef(null);

  const handleClick = () => {
    setLogin(!login);

    signinRef.current.classList.toggle("active");
  };
  return (
    <div>
      <Navbar />
      <div className="login-signup-container" ref={signinRef}>
        <Login />
        <div className="side-div">
          <button type="button" onClick={handleClick}>
            {login ? "Signup" : "Login"}
          </button>
        </div>
        <Register />
      </div>
    </div>
  );
}
