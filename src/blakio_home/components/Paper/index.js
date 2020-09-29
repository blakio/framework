import React from "react";
import "./main.css";

import {
    HeaderStrip
} from "../index";
import PaperFold from "../PaperFold";

const Paper = props => {
    const {
        children,
        title,
        color,
        buttons,
        customFoldColor,
        loading
    } = props;
    return (<div className="paper">
        {title && <HeaderStrip
            title={title}
            color={color}
            buttons={buttons}
        />}
        {children}
        <PaperFold
            customFoldColor={customFoldColor}
        />
        {loading && <div>
            <div className="loading"></div>
            <div className="loading"></div>
            <div className="loading"></div>
        </div>}
    </div>);
}

export default Paper;