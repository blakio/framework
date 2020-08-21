import React, { useState } from "react";
import "./Panel.css";

const Panel = (props) => {

  const [removed, setRemoved] = useState(false);

  const {
    heading,
    noPadding,
    overflow,
    components,
    empty,
    whiteHead,
    none
  } = props;

  const topLabel = "Sample Top Label";
  const bottomLabel = "Sample Bottom Label";

  const getTopLabel = (label) => {
    const split = label.split(" ");
    const first = split[0];
    split.shift();
    const remaining = split.join(" ");
    return (
      <p className="panelHeadTopLabel">
        <span className="panelHeadTopLabelFirstWord">{first}</span> {remaining}
      </p>
    )
  }

  return (<div className={`Panel ${(empty || removed) && "empty"}`}>

    {/* <div className={`PanelHeader flex ${whiteHead && "whiteHead"} ${none && "none"}`}>
      <p className="heading">{heading}</p>
    </div> */}

    <div className={`PanelHead flex ${empty && "none"}`}>
      <div className={`PanelHeadLabel ${(empty || removed) && "opacityZero"}`}>
        {getTopLabel(topLabel)}
        <p className="panelHeadBottomLabel">{bottomLabel}</p>
      </div>
      <div className="panelHeadRightSideOptions">
        <span className={`PanelHeadOptionBtn ${(empty || removed) && "opacityZero"}`}>
          <i className="fas fa-ellipsis-h"></i>
        </span>
        <span className="PanelHeadRemovalBtn" onClick={() => setRemoved(!removed)}>
          {/* {!removed && <i className="fas fa-times"></i>} */}
          {!removed && "x"}
          {removed && "+"}
        </span>
      </div>
    </div>

    <div className={`PanelBody ${noPadding && "noPadding"} ${overflow && "scroll"} ${(empty || removed) && "none"}`}>
      {components && components.map(data => data)}
    </div>

  </div>)
}

export default Panel;
