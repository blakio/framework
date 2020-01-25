import React from "react";
import "./PaperHead.css";

const PaperHead = (props) => {
  const {
    text,
    icon
  } = props;
  
  return (<div className="PaperHead flex">
    <div>
      <p>{text[0]}</p>
    </div>
    <i className={icon}></i>
  </div>)
}

export default PaperHead;
