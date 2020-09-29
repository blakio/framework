import React from "react";
import "./TopLeftFold.css";

const TopLeftFold = (props) => {
  const  {
    height,
    width,
    backgroundColor
  } = props;

  return (<div id="TopLeftFold" style={{
    height,
    width,
    backgroundColor
  }}>
      <div className="backFold" style={{
        height: height * 2,
        width: width * 2
      }}></div>
  </div>)
}

export default TopLeftFold;
