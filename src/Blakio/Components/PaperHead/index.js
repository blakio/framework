import React from "react";
import "./PaperHead.css";

const PaperHead = (props) => {
  return (<div className="PaperHead flex">
    <div>
      <p>{props.text}</p>
    </div>
    <i className={props.icon}></i>
  </div>)
}

export default PaperHead;
