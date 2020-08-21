import React from "react";
import "./main.css";

const Button = props => {
    let addtionalStyle = {}
    if(props.width){
        addtionalStyle = {...addtionalStyle, width: props.width}
    }
    return (<div className="btnHolder" style={addtionalStyle}>
        <div className={`button ${props.selected && "selected"} ${props.backgroundIcon && "backgroundIcon"} ${props.noPadding && "noPadding"}`} style={{width: "100%"}}>
            <i className={props.icon}></i>
            <p>{props.text}</p>
            {props.title ? <p className="btnTitle">{props.title}</p> : <div></div>}
        </div>
    </div>);
}

export default Button;