import React from "react";
import "./main.css";

const Icon = props => {
    return (<div className="iconContainer" onClick={props.onClick ? props.onClick : () => {}}>
        <div className={`icon ${props.helpText && "hasHelpText"} ${props.isBtn && "iconBtn"}`}>
            {props.icon ? <i className={props.icon}></i> : <p className="iconText">{props.text}</p>}
        </div>
        <p className="buttonHelpText">{props.helpText}</p>
    </div>);
}

export default Icon;