import React, { useState, useEffect } from "react";
const axios = require("axios");

const Profile = (props) => {
  function handleFriendRequestSend(event) {
    event.preventDefault();
  }
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
        <label>Type in friend's nickname and send friend request</label>
        <input type="text" />
        <button type="submit" onClick={handleFriendRequestSend}>
          Send friend request
        </button>
      </form>
      <button onClick={() => props.pickComponent("Dashboard")}>
        Back to dashboard
      </button>
    </div>
  );
};
export default Profile;
