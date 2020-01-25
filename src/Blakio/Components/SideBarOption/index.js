import React from "react";
import "./SideBarOption.css";
import SideBarList from "../../Components/SideBarList";

const SideBarOption = (props) => {
  const {
    head,
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
          <p>{head}</p>
        </div>
      </div>
      {isOpen ? <span>|||</span> : <i className={`secondIcon ${icons[1]}`}></i>}
    </div>
    {isOpen && data.map((dt, i) => <SideBarList key={i} index={i} data={dt}/>)}
  </div>)
}

export default SideBarOption;
