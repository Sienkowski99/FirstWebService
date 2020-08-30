import React, { useState } from "react";
// import { Formik } from 'formik';
const axios = require("axios");

const LoginForm = (props) => {
  // const formLabelStyle = {
  //   fontSize: "50px",
  //   borderRadius: "25px",
  //   border: "solid black 2px",
  //   // marginBottom: "30px",
  //   // width: "50%",
  //   padding: "10px",
  //   backgroundColor: "white",
  // };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (password === password2) {
      console.log("oeodkeo");
      axios
        .post("http://127.0.0.1:8000/registerNewUser", {
          login: login,
          password: password,
          email: email,
          })
        .then((res) => console.log(res))
        .then(x=> {props.pickComponent("LoginForm");
          alert("Now you have to log in")})
        .catch((err) => console.log(err))
        
    } else {
      alert("Passwords have to be the same")
    }
  }

  return (
    <div style={{
      backgroundColor: "#17b0ff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      position: "fixed",
      width: "100%",
      height: "100% ",
    }}>
      <h1>{props.userStatus.status}</h1>
      <label>Register</label>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
        <label>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {/* <br /> */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <br /> */}
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <br /> */}
        <label>Repeat Password</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default LoginForm;
