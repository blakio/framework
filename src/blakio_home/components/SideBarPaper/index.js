import React from "react";

import "./SideBarPaper.css";
import {
  SideBarOption,
  PaperHead
} from "blakio_home/components";
import {
  StateContext
} from "blakio_context/State";

const SideBarPaper = (props) => {
  const {
    title,
    icon,
    onClick,
    selected,
    closedIcon,
    shortMenu
  } = props;

  const [state, dispatch] = StateContext();

  return (<div className={`SideBarPaper ${selected && "active"} ${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    {
      shortMenu ?
        <PaperHead icon={closedIcon} onClick={onClick}/> :
        <PaperHead text={[title]} icon={icon} onClick={onClick}/>
    }
  </div>)
}

export default SideBarPaper;
