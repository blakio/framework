import React from "react";
import "./main.css";

const Button = props => {
    return (<div className="button">
        <i className={props.icon}></i>
        <p>{props.text}</p>
    </div>);
}

export default Button;