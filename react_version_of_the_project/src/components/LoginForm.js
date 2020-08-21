import React, { useState } from 'react';
// import { Formik } from 'formik';
const axios = require('axios');

const LoginForm = () => {
    const formLabelStyle = {
        fontSize: "50px",
        borderRadius: "25px",
        border: "solid black 2px",
        // marginBottom: "30px",
        // width: "50%",
        padding: "10px",
        backgroundColor: "white",
    }
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log("oeodkeo")
        axios.get('http://127.0.0.1:8000/admin')
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
    }

    return (
        <div>
            <label>Login Label</label>
            <form onSubmit={handleSubmit}>
                <label>Login</label>
                <input type="text" value={login} onChange={e=>setLogin(e.target.value)}/>
                <br/>
                <label>Password</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}
export default LoginForm