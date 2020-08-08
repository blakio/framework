import React from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = (props) => {
  const {
    size,
    width,
    height,
    onClick
  } = props;

  return (<div
    id="HamburgerMenu"
    className="flex"
    onClick={onClick}
    style={{
      height: height || size,
      width: width || size
    }}>
      <i className="fas fa-bars" style={{
        fontSize: size * 0.4
    }}></i>
  </div>)
}

export default HamburgerMenu;
