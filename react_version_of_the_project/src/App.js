import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm'

function App() {
  const bodyStyle = {
    position: "absolute",
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
    width: "100%",
    height: "100%",
  }
  
  const [displayedComponent, setDisplayedComponent] = useState("")
  const [nowComponent, setNowComponent] = useState(<LoginForm/>)
  useEffect(()=>{
    setDisplayedComponent(nowComponent)
  },[nowComponent]);



  return (
    <div className="App" style={bodyStyle}>
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
      {/* <LoginForm/> */}
      {displayedComponent}
    </div>
  );
}

export default App;
