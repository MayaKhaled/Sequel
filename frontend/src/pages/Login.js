import React from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "../components/Button/button.css";
import { useNavigate } from "react-router-dom";
import "../stylesheets/login.css";

export default function Login() {
  const history = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passworderror, setpassworderror] = useState(false);
  const [passwordtext, setpasswordtext] = useState("");
  const [emailtext, setemailtext] = useState("");
  const [emailerror, setemailerror] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleLogin = (e) => {
    var x = 2;
    if (email === "") {
      console.log(email);
      setemailerror(true);
      setemailtext("Email could not be left empty ");
    } else {
      if (!validateEmail(email)) {
        setemailerror(true);
        setemailtext("Email should be in xxxx@y.com format");
      } else {
        setemailerror(false);
        x--;
      }
    }
    if (password === "") {
      console.log("innnnnnnn");
      setpassworderror(true);
      setpasswordtext("Password cannot be left empty");
    } else {
      console.log("out");
      setpassworderror(false);
      x--;
    }
    if (x === 0) {
      axios
        .post("http://localhost:2000/api/user/signin", {
          Email: email,
          Password: password,
        })
        .then((res) => {
          console.log(res, "Signin headers");
          localStorage.clear();
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          history("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>
        <Avatar
          style={{
            backgroundColor: "rgb(85, 85, 85)",
            marginTop: "7vw",
            marginLeft: "49vw",
          }}
        >
          <LockOutlinedIcon style={{ color: "#ffd633" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <div className="text1">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
            error={emailerror}
          />
        </div>

        <CloseIcon
          style={emailerror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className="emailicon"
        />
        <div className={emailerror ? "erroremailerror" : "emailwithout"}>
          {emailtext}
        </div>
      </div>

      <div className="display">
        <div className="text2">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangePassword}
            error={passworderror}
          />
        </div>
        <CloseIcon
          style={passworderror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className="passwordicon"
        />
        <div className={passworderror ? "passworderrors" : "passwordwithout"}>
          {passwordtext}
        </div>
      </div>

      <div className="button1">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ backgroundColor: "#005dad" }}
        >
          Sign In
        </Button>
      </div>
      <Link href="/signup" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </div>
  );
}
