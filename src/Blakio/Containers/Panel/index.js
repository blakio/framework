import React from "react";
import "./Panel.css";

const Panel = (props) => {
  return (<div className="Panel">
    <div className="PanelHeader flex">
      <p className="heading">{props.heading}</p>
    </div>
    <div className="PanelBody">
      {props.components.map(data => data)}
    </div>
  </div>)
}

export default Panel;
