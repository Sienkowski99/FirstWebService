import React, { useState, useEffect } from "react";
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
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    // width: "20%",
    justifyContent: "space-around",
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [userStatusLogin, setUserStatusLogin] = useState(props.userStatus);

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
        // setUserStatusLogin();
        props.changeUserStatus({
          user: {
            login: login,
          },
          status: "LOGGED_IN",
        });
        // console.log(userStatusLogin);
        // props.showUserStatus();
        // console.log(res.data);
        // console.log(props.returnUserStatus());
        props.changeServerResponse(res);
        props.pickComponent(
          "Dashboard"
          // <Dashboard resData={res.data} userStatus={props.userStatus} />
        );
        // if (res.data.state) {
        //   event.form.reset();

        // }
      })
      // .then((x) => console.log(userStatusLogin))
      .catch((err) => alert(err));
  }
  // console.log(props.userStatus);
  const [zalogowany, setZalogowany] = useState(props.userStatus);
  useEffect(() => {
    // setZalogowany(props.userStatus);
    console.log("ZMIANAAAAAAAA");
    console.log(props.userStatus);
  }, [props.userStatus]);
  return (
    <div>
      <h1>{props.userStatus.status}</h1>
      {/* <label>Log In</label> */}
      <form onSubmit={handleSubmit}>
        <label>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {/* <br /> */}
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <br /> */}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
export default LoginForm;
