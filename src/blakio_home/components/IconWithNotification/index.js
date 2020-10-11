import React from "react";
import "./main.css";

const IconWithNotification = (props) => {
    const {
        icon,
        onClick
    } = props;
    return (<div onClick={onClick}>
        <i className={`${icon} topBarMenuIcon`}></i>
        <div className="notification"></div>
    </div>)
}

export default IconWithNotification;