import React from "react";
import "./main.css";

const Icon = props => {
    return (<div onClick={props.onClick ? props.onClick : () => {}}>
        <div className={`icon ${props.helpText && "hasHelpText"} ${props.isBtn && "iconBtn"}`}>
            <i className="far fa-clock"></i>
        </div>
        <p className="buttonHelpText">{props.helpText}</p>
    </div>);
}

export default Icon;