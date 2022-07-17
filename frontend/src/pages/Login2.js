import React from "react";
import "../stylesheets/login2.css";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

export default function Login2() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input type={"email"} placeholder={"Email"} />
        <input type={"password"} placeholder={"Password"} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
