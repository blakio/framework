import React from "react";
import "./Panel.css";

const Panel = (props) => {

  const {
    heading,
    noPadding,
    overflow,
    components
  } = props;

  return (<div className="Panel">
    <div className="PanelHeader flex">
      <p className="heading">{heading}</p>
    </div>
    <div className={`PanelBody ${noPadding && "noPadding"} ${overflow && "scroll"}`}>
      {components.map(data => data)}
    </div>
  </div>)
}

export default Panel;
