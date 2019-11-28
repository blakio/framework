import React from "react";
import "./SideBarList.css";

const SideBarList = (props) => {
  const {
    icon,
    text,
    subText,
    onClick,
    isActive,
    disabled
  } = props.data;

  return (<div className={`SideBarList flex ${isActive && "selected"} ${disabled && "disabled"} ${props.index % 2 !== 0 && "odd"}`} onClick={onClick}>
    <div className="SideBarContainer flex">
      <i className={icon}></i>
      <div className="SideBarTextContainer flex">
        <p>{text}</p>
        <p>{subText}</p>
      </div>
    </div>
  </div>)
}

export default SideBarList;
