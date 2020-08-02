import React from "react";
import "./main.css";

import {
    Paper
} from "../components";

const Login = () => {
    const onSubmit = () => {}

    return (<div id="loginForm">
        <Paper
            customFoldColor={"#00264d"}
        >
            <div className="loginFormContainer">
                <p>Username</p>
                <input></input>
                <p>Password</p>
                <input></input>
                <button className="submitBtn" onClick={onSubmit}>Login</button>
            </div>
        </Paper>
    </div>)
}

export default Login;