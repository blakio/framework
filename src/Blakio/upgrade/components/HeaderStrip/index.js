import React from "react";
import "./main.css";

const HeaderStrip = props => {
    return (<div className="headerStrip">
        <p className={props.color}>{props.title}</p>
    </div>);
}

export default HeaderStrip;