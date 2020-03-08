import React from "react";

import "./SideBarPaper.css";
import SideBarOption from "../../Components/SideBarOption";
import PaperHead from "../../Components/PaperHead";

const SideBarPaper = (props) => {
  const {
    title,
    icon,
    data,
    onClick,
    isOpen
  } = props;
  return (<div className="SideBarPaper">
    <PaperHead text={[title]} icon={icon} onClick={onClick}/>
    {isOpen && data.map((d, index) => {
      return (<div key={index} className={`SideBarListContainer ${d.isOpen && "open"}`}>
        <SideBarOption data={d}/>
        {d.isOpen && d.component}
      </div>)
    })}
  </div>)
}

export default SideBarPaper;
