import React from "react";
import "./Tags.css";

const Tags = (props) => {
  return (<div className="Tags flex">
    {props.data.map((data, index) => (<div
      key={index}
      onClick={data.onClick}
      className={`TagLabel ${data.isSelected && "isSelected"} ${data.isDisabled && "isDisabled"}`}>
      {data.label}
    </div>))}
  </div>)
}

export default Tags;
