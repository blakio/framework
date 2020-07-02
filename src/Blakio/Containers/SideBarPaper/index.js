import React from "react";

import "./SideBarPaper.css";
import SideBarOption from "../../Components/SideBarOption";
import PaperHead from "../../Components/PaperHead";

const SideBarPaper = (props) => {
  const {
    title,
    icon,
    onClick,
    selected
  } = props;
  return (<div className={`SideBarPaper ${selected && "active"}`}>
    <PaperHead text={[title]} icon={icon} onClick={onClick}/>
  </div>)
}

export default SideBarPaper;
