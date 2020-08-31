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
        .then((x) => {
          props.pickComponent("LoginForm");
          alert("Now you have to log in");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords have to be the same");
    }
  }

  return (
    <div
      // style={{
      //   backgroundColor: "#17b0ff",
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   justifyContent: "space-around",
      //   position: "fixed",
      //   width: "100%",
      //   height: "100% ",
      // }}
      style={{
        // backgroundColor: "#17b0ff",
        backgroundColor: "#131E22",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "fixed",
        width: "100%",
        height: "100% ",
        color: "white",
        fontWeight: "bold",
        letterSpacing: "2px",
      }}
    >
      {/* <h1>{props.userStatus.status}</h1> */}
      <h1>Register an account</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label style={{ marginBottom: "5px", marginTop: "5px" }}>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {/* <br /> */}
        <label style={{ marginBottom: "5px", marginTop: "5px" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <br /> */}
        <label style={{ marginBottom: "5px", marginTop: "5px" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <br /> */}
        <label style={{ marginBottom: "5px", marginTop: "5px" }}>
          Repeat Password
        </label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button
          type="submit"
          style={{
            marginTop: "30px",
            backgroundColor: "#e7e7e7",
            color: "black",
            border: "none",
            padding: "5px 10px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "5%",
          }}
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
      <button
        style={{
          backgroundColor: "#e7e7e7",
          color: "black",
          border: "none",
          padding: "5px 10px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "15px",
          fontWeight: "bold",
          borderRadius: "5%",
        }}
        onClick={() => props.pickComponent("LoginForm")}
      >
        Back to Login page
      </button>
    </div>
  );
};
export default LoginForm;
