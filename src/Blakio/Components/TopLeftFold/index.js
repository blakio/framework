import React from "react";
import "./TopLeftFold.css";

const TopLeftFold = (props) => {
  return (<div id="TopLeftFold" style={props.styles}>
      <div className="backFold" style={{
        height: props.styles.height * 2,
        width: props.styles.width * 2
      }}></div>
  </div>)
}

export default TopLeftFold;
