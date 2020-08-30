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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const [emailForPasswordReset, setEmailForPasswordReset] = useState("");

  return (
    <div
      style={{
        backgroundColor: "#17b0ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        position: "fixed",
        width: "100%",
        height: "100% ",
      }}
    >
      <h1>{props.userStatus.status}</h1>
      <form>
        <label>Enter an email that you have used to register</label>
        <input
          type="email"
          onChange={(e) => setEmailForPasswordReset(e.target.value)}
        />
        <button type="submit" onClick={handleSubmitResetRequest}>
          Send email with "reset password" link
        </button>
      </form>
      <button onClick={() => props.pickComponent("LoginForm")}>
        Back to Login page
      </button>
    </div>
  );
};
export default ForgotPassword;
