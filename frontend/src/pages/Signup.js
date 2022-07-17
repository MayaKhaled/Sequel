import React from "react";
import "../stylesheets/Signup.css";
export default function Signup() {
  return (
    <div className="signup">
      <h1>Signup</h1>
      <form>
        <input type={"text"} placeholder={"Lastname"} />
        <input type={"text"} placeholder={"Firstname"} />
        <input type={"text"} placeholder={"Username"} />
        <input type={"number"} placeholder={"Phone"} />
        <input type={"email"} placeholder={"Email"} />
        <input type={"password"} placeholder={"Password"} />
        <input type={"password"} placeholder={"Confirm Password"} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
