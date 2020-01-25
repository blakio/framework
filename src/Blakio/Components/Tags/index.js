import React from "react";
import "./Tags.css";

const Tags = (props) => {
  const {
    data
  } = props;

  return (<div className="Tags flex">
    {data.map((d, index) => (<div
      key={index}
      onClick={d.onClick}
      className={`TagLabel ${d.isSelected && "isSelected"} ${d.isDisabled && "isDisabled"}`}>
      {d.label}
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
