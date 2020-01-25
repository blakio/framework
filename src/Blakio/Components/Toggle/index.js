import React from "react";
import "./Toggle.css";

const Toggle = (props) => {
  const {
    onClick,
    isActive,
    text
  } = props;

  return (<div className="Toggle flex" onClick={onClick}>
    {isActive && <i className="fas fa-toggle-on"></i>}
    {!isActive && <i className="fas fa-toggle-off"></i>}
    <p>{text}</p>
  </div>)
}

export default Toggle;
