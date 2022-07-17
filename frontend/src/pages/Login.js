import React, { useEffect } from "react";
import axios from "axios";
import "../stylesheets/login2.css";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Login2() {
  const history = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:2000/api/user/signin", {
        Email: email,
        Password: password,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        history("/");
      })
      .catch((err) => {
        console.log(err, "Error");
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="login">
      <h1>Login</h1>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <form onSubmit={onSubmitHandler}>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              onKeyUp={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email && touched.email ? (
              <div style={{ color: "red" }}>{errors.email}</div>
            ) : null}

            <Field
              name="password"
              type="password"
              placeholder="Password"
              onKeyUp={(e) => {
                setPassword(e.target.value);
              }}
            />

            {errors.password && touched.password ? (
              <div style={{ color: "red" }}>{errors.password}</div>
            ) : null}
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
