import React from "react";
import "./Panel.css";

const Panel = (props) => {
  return (<div className="Panel">
    <div className="PanelHeader flex">
      <p className="heading">{props.heading}</p>
    </div>
    {props.component}
  </div>)
}

export default Panel;
