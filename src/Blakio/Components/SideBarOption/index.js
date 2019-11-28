import React from "react";
import "./SideBarOption.css";

const SideBarOption = (props) => {
  const {
    head,
    iconLeft,
    iconRight,
    data,
    onClick,
    isOpen
  } = props.data;

  return (<div className="SideBarOption flex" onClick={onClick}>
    <div className="flex">
      <i className={`firstIcon ${iconLeft}`}></i>
      <div>
        <p>{head}</p>
      </div>
    </div>
    {isOpen ? <span>|||</span> : <i className={`secondIcon ${iconRight}`}></i>}
  </div>)
}

export default SideBarOption;
