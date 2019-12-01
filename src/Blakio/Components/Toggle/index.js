import React from "react";
import "./Toggle.css";

const Toggle = (props) => {
  return (<div className="Toggle flex" onClick={props.onClick}>
    {props.isOn && <i className="fas fa-toggle-on"></i>}
    {!props.isOn && <i className="fas fa-toggle-off"></i>}
    <p>{props.text}</p>
  </div>)
}

export default Toggle;
