import React, { useState, useEffect } from "react";
const axios = require("axios");

const Profile = (props) => {
  function handleFriendRequestSend(event) {
    event.preventDefault();
    console.log("you want to invite: ", personToInvite)
    axios.post("http://127.0.0.1:8000/sendFriendRequest", {user: props.userStatus.user.login,
      personToInvite: personToInvite 
    }).then(res=>console.log(res)).catch(err=>console.log(err))
  }
  const [personToInvite, setPersonToInvite] = useState("")
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
        color: "white",
        fontWeight: "bold",
        letterSpacing: "2px",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          borderBottom: "solid white 2px",
          margin: "0",
          padding: "20px 0",
          position: "absolute",
          left: "0",
          top: "0",
        }}
      >
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
          onClick={() => props.pickComponent("Dashboard")}
        >
          ⮌ Back to dashboard
        </button>
        <h1 style={{ margin: "0" }} class="w3-animate-left">
          {/* {props.userStatus.status} as {props.userStatus.user.login} */}
          Your profile {props.userStatus.user.login} 💪!
        </h1>
      </div>
      {/* <h1>{props.userStatus.status}</h1> */}
      {/* <h1 style={{ margin: "0" }} class="w3-animate-left">
        {props.userStatus.status} as {props.userStatus.user.login}
        Your profile {props.userStatus.user.login}!
      </h1> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>Your friends list:</p>
          {props.serverResponse.data.personalData.friendsList.map((friend) => (
            <p key={friend}>- {friend}</p>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>People that want to make friends with you:</p>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            height: "15vh",
            justifyContent: "space-between",
          }}
        >
          <label>Type in friend's nickname and send friend request</label>
          <input type="text" onChange={(e)=>{setPersonToInvite(e.target.value)}}/>
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
            }}
            onClick={handleFriendRequestSend}
          >
            Send friend request
          </button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
