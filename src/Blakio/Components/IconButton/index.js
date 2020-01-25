import React from "react";
import "./IconButton.css";

const IconButton = (props) => {
  const {
    isActive,
    icon,
    text
  } = props;

  return (<div className={`IconButton flex ${isActive && "isActive"}`} onClick={() => (isActive && props.onClick())}>
    <i className={icon}></i>
    <p>{text}</p>
  </div>)
}

export default IconButton;
