import React from "react";
import "./IconButton.css";

const IconButton = (props) => {
  return (<div className={`IconButton flex ${props.isActive && "active"}`} onClick={() => {if(props.isActive) props.onClick()}}>
    <i className={props.icon}></i>
    <p>{props.text}</p>
  </div>)
}

export default IconButton;
