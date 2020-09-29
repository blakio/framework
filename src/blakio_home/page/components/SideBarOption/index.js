import React from "react";
import "./SideBarOption.css";
import SideBarList from "blakio_home/page/components/SideBarList";

const SideBarOption = (props) => {
  const {
    title,
    icons,
    onClick,
    isOpen,
    data
  } = props.data;

  return (<div>
    <div className="SideBarOption flex" onClick={onClick}>
      <div className="flex">
        <i className={`firstIcon ${icons[0]}`}></i>
        <div>
          <p>{title}</p>
        </div>
      </div>
      <i className={`secondIcon ${isOpen ? icons[1] : icons[2]}`}></i>
    </div>
    {isOpen && data.map((dt, i) => <SideBarList key={i} index={i} data={dt}/>)}
  </div>)
}

export default SideBarOption;
