import React from "react";
import "./main.css";

const PaperFold = props => {
    const { customFoldColor } = props;
    return (<div id="panelBottomFold">
    <div id="panelBottomFoldTransparent" style={customFoldColor ? {
        backgroundColor: customFoldColor
    } : {}}></div>
</div>);
}

export default PaperFold;