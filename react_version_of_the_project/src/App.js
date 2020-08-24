import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

function App() {
  // const bodyStyle = {
  //   position: "absolute",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   // justifyContent: "space-around",
  //   backgroundColor: "skyblue",
  //   width: "100%",
  //   height: "100%",
  // };
  // constructor() {
  //   super()
  //   this.state = {
  //     user: {},
  //     status: "NOT_LOGGED_IN",
  //   }
  // }

  const [userStatus, setUserStatus] = useState({
    user: {},
    status: "NOT_LOGGED_IN",
    bla: "sdoiqjw",
  });

  const [serverResponse, setServerResponse] = useState({});

  const changeServerResponse = (srvRes) => {
    setServerResponse(srvRes);
    console.log("server response has been changed");
  };
  const changeUserStatus = (newUserData) => {
    setUserStatus(newUserData);
    console.log("user is being changed in app.js", userStatus);
  };

  const [mainComponents, setMainComponents] = useState([
    "LoginForm",
    "RegisterForm",
    "Dashboard",
  ]);

  const [displayedComponent, setDisplayedComponent] = useState(
    mainComponents[0]
  );

  function pickComponent(component) {
    if (component === "next") {
      nextComponent();
    } else {
      setDisplayedComponent(component);
    }
  }

  function nextComponent() {
    if (
      mainComponents.indexOf(displayedComponent) + 1 >=
      mainComponents.length
    ) {
      setDisplayedComponent(mainComponents[0]);
    } else {
      setDisplayedComponent(
        mainComponents[mainComponents.indexOf(displayedComponent) + 1]
      );
    }
  }

  useEffect(() => {
    console.log("User status has been changed in App.js", userStatus);
  }, [userStatus]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div id="bodyContent">
        <button onClick={() => pickComponent("next")}>
          Switch displayed component
        </button>
        {displayedComponent === "LoginForm" ? (
          <LoginForm
            pickComponent={pickComponent}
            userStatus={userStatus}
            changeUserStatus={changeUserStatus}
            changeServerResponse={changeServerResponse}
          />
        ) : null}
        {displayedComponent === "RegisterForm" ? (
          <RegisterForm
            pickComponent={pickComponent}
            userStatus={userStatus}
            changeUserStatus={changeUserStatus}
          />
        ) : null}
        {displayedComponent === "Dashboard" ? (
          <Dashboard
            pickComponent={pickComponent}
            userStatus={userStatus}
            changeUserStatus={changeUserStatus}
            serverResponse={serverResponse}
            changeServerResponse={changeServerResponse}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
