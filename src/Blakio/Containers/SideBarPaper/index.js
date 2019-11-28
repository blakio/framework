import React from "react";
import "./SideBarPaper.css";

import PaperHead from "../../Components/PaperHead";
import SideBarOption from "../../Components/SideBarOption";
import SideBarList from "../../Components/SideBarList";

const SideBarPaper = (props) => {
  const {
    head,
    icon,
    data
  } = props.data;
  return (<div className="SideBarPaper">
    <PaperHead text={head} icon={icon}/>
    {data.map((d, index) => {
      return (<div key={index} className={`SideBarListContainer ${d.isOpen && "open"}`}>
        <SideBarOption data={d}/>
        {d.data.map((dt, i) => <SideBarList key={i} index={i} data={dt}/>)}
      </div>)
    })}
  </div>)
}

export default SideBarPaper;
