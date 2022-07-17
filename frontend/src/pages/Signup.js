import React from "react";
import "../stylesheets/Signup.css";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  userName: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
});
export default function Signup() {
  const history = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState(0);
  const [userName, setUserName] = React.useState("");

  const handleSignup = () => {
    axios
      .post("http://localhost:2000/api/user/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        phone: phone,
      })
      .then((res) => {
        console.log(res, "Signup response");
        history("/login");
      })
      .catch((err) => {
        console.log(err, "Error");
      });
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <Formik
        initialValues={{
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          userName: "",
          phone: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <form>
            <Field
              name="firstName"
              type="text"
              placeholder="Firstname"
              onKeyUp={(e) => {
                setFirstName(e.target.value);
              }}
            />
            {errors.firstName && touched.firstName ? (
              <div style={{ color: "red" }}>{errors.firstName}</div>
            ) : null}
            <Field
              name="lastName"
              type="text"
              placeholder="Lastname"
              onKeyUp={(e) => {
                setLastName(e.target.value);
              }}
            />
            {errors.lastName && touched.lastName ? (
              <div style={{ color: "red" }}>{errors.lastName}</div>
            ) : null}
            <Field
              name="userName"
              type="text"
              placeholder="Username"
              onKeyUp={(e) => {
                setUserName(e.target.value);
              }}
            />
            {errors.userName && touched.userName ? (
              <div style={{ color: "red" }}>{errors.userName}</div>
            ) : null}
            <Field
              name="phone"
              type="number"
              placeholder="Phone"
              onKeyUp={(e) => {
                setPhone(e.target.value);
              }}
            />
            {errors.phone && touched.phone ? (
              <div style={{ color: "red" }}>{errors.phone}</div>
            ) : null}
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
            <button type="submit" onClick={handleSignup}>
              Signup
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
