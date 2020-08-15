import React from "react";
import "./main.css";

const Button = props => {
    let addtionalStyle = {}
    if(props.width){
        addtionalStyle = {...addtionalStyle, width: props.width}
    }
    return (<div className="btnHolder">
        {props.title ? <p className="btnTitle">{props.title}</p> : <div></div>}
        <div className={`button ${props.selected && "selected"} ${props.backgroundIcon && "backgroundIcon"}`} style={addtionalStyle}>
            <i className={props.icon}></i>
            <p>{props.text}</p>
        </div>
    </div>);
}

export default Button;