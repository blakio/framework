import React from "react";
import "./main.css";

const IconWithNotification = (props) => {
    const {
        icon,
        onClick,
        toolTip,
        color,
        text
    } = props;
    return (<div
        className="notificationBox"
        onClick={onClick}
        data-tip={toolTip}
    >
        <i className={`${icon} topBarMenuIcon`}></i>
        <div className={`notification flex ${color}`}>
            <p>{text}</p>
        </div>
    </div>)
}

export default IconWithNotification;