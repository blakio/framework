import React from "react";
import "./Panel.css";

const Panel = (props) => {

  const {
    heading,
    noPadding,
    overflow,
    components,
    empty
  } = props;

  return (<div className={`Panel ${empty && "empty"}`}>
    <div className="PanelHeader flex">
      <p className="heading">{heading}</p>
    </div>
    <div className={`PanelBody ${noPadding && "noPadding"} ${overflow && "scroll"}`}>
      {components && components.map(data => data)}
    </div>
  </div>)
}

export default Panel;
