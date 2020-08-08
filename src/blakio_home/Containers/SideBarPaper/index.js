import React from "react";

import "./SideBarPaper.css";
import SideBarOption from "../../Components/SideBarOption";
import PaperHead from "../../Components/PaperHead";

const SideBarPaper = (props) => {
  const {
    title,
    icon,
    onClick,
    selected,
    closedIcon,
    shortMenu
  } = props;
  return (<div className={`SideBarPaper ${selected && "active"}`}>
    {
      shortMenu ?
        <PaperHead icon={closedIcon} onClick={onClick}/> :
        <PaperHead text={[title]} icon={icon} onClick={onClick}/>
    }
  </div>)
}

export default SideBarPaper;
