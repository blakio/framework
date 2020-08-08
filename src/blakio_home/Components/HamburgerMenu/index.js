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
      <i className="fas fa-expand-alt" style={{
        fontSize: size * 0.4,
        transform: "rotateY(180deg)"
    }}></i>
  </div>)
}

export default HamburgerMenu;
