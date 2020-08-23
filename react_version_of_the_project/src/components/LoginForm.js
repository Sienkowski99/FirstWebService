import React, { useState } from "react";
// import { Formik } from 'formik';
import Dashboard from "./Dashboard";
const axios = require("axios");

const LoginForm = (props) => {
  const formLabelStyle = {
    fontSize: "50px",
    borderRadius: "25px",
    border: "solid black 2px",
    // marginBottom: "30px",
    // width: "50%",
    padding: "10px",
    backgroundColor: "white",
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const API_URL_checkuser =
    window.location.hostname === "localhost"
      ? "http://localhost:8000/checkuser"
      : "http://161.35.207.19:8000/checkuser";

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Trying to log in");
    axios
      .post(API_URL_checkuser, { login: login, password: password })
      .then((res) => {
        console.log(res.data);
        if (res.data.state) {
          //   event.form.reset();
          props.pickComponent(<Dashboard resData={res.data} />);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <label>Log In</label>
      <form onSubmit={handleSubmit}>
        <label>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
export default LoginForm;
