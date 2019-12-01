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


// data = {
//   label: "the text in the input box", string
//   isSelected: "pressing the button can select it", boolean
//   isDisabled: "make the button disabled", boolean
//   onClick: "tells the button what to do when clicked" function
// }
