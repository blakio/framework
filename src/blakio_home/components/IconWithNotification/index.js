import React from "react";
import "./main.css";

const IconWithNotification = (props) => {
    const {
        icon,
        onClick,
        toolTip
    } = props;
    return (<div
        onClick={onClick}
        data-tip={toolTip}
    >
        <i className={`${icon} topBarMenuIcon`}></i>
        <div className="notification"></div>
    </div>)
}

export default IconWithNotification;