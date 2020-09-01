import React, { useState, useEffect } from "react";
const axios = require("axios");

const ForgotPassword = (props) => {
  function handleSubmitResetRequest(event) {
    event.preventDefault();
    console.log(emailForPasswordReset);
    axios
      .post("http://127.0.0.1:8000/resetRequest", {
        email: emailForPasswordReset,
      })
      .then((res) => alert(res.data))
      .catch((err) => console.log(err));
  }

  function handleSaveNewPassword(event) {
    event.preventDefault();
    if (newPassword === repeatedNewPassword) {
      console.log("passwords match");
      const API_adress = "http://localhost:8000/reset/" + enteredCode;
      axios
        .post(API_adress, { newPassword })
        .then((response) => alert(response.data))
        .catch((err) => console.log(err));
    } else {
      alert("Passwords don't match!");
    }
  }
  const [emailForPasswordReset, setEmailForPasswordReset] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");

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
      <h1>Reset your password</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>Enter an email that you have used to register</label>
        <input
          style={{ margin: "10px 0" }}
          type="email"
          onChange={(e) => setEmailForPasswordReset(e.target.value)}
        />
        <button type="submit" onClick={handleSubmitResetRequest}>
          Send email with special "reset password" code
        </button>
      </form>
      <p>Code will be active only for 1 hour!</p>
      <div>
        <p>Already have code? Enter it here:</p>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", marginTop: "5px" }}>
            Secret code
          </label>
          <input type="text" onChange={(e) => setEnteredCode(e.target.value)} />
          <label style={{ marginBottom: "5px", marginTop: "5px" }}>
            New password
          </label>
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label style={{ marginBottom: "5px", marginTop: "5px" }}>
            Repeat new password
          </label>
          <input
            type="password"
            onChange={(e) => setRepeatedNewPassword(e.target.value)}
          />
          <button
            type="submit"
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
              width: "30%",
              marginTop: "30px",
              alignSelf: "center",
            }}
            onClick={handleSaveNewPassword}
          >
            Save
          </button>
        </form>
      </div>
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
export default ForgotPassword;
