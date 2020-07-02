import React from "react";
import "./main.css";

import {
    HeaderStrip
} from "../index";
import PaperFold from "../PaperFold";

const Paper = props => {
    return (<div className="paper">
        {props.title && <HeaderStrip
            title={props.title}
            color={props.color}
        />}
        {props.children}
        <PaperFold />
        {props.loading && <div>
            <div className="loading"></div>
            <div className="loading"></div>
            <div className="loading"></div>
        </div>}
    </div>);
}

export default Paper;