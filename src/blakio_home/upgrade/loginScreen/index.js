import React, { useState } from "react";
import "./main.css";

import {
    Paper
} from "../components";

import Axios from "blakio_axios";

import {
    StateContext
} from "blakio_context/State";
import Util from "blakio_util";
import Types from "blakio_context/Types"

const Login = () => {

    const [state, dispatch] = StateContext();

    const [pin, setPin] = useState("");

    const onChange = e => setPin(e.target.value);

    const onSubmit = () => {
        Axios.logIn(pin).then(data => {
            localStorage.setItem("blakio_store", data.data.store);
            Axios.resetAxiosInstance();
            dispatch({
                type: Types.IS_LOGGED_IN,
                payload: true
            })
        }).catch(err => {
            const {
                title,
                message
            } = err.response.data
            Util.showError(title, message);
        })
    }

    return (<div id="loginForm">
        <Paper
            customFoldColor={"#00264d"}
        >
            <div className="loginFormContainer">
                <p>Enter Pin</p>
                <input maxLength="4" onChange={onChange} value={pin}></input>
                <button className="submitBtn" onClick={onSubmit}>Login</button>
            </div>
        </Paper>
    </div>)
}

export default Login;