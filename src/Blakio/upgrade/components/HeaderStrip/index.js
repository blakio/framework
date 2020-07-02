import React from "react";
import "./main.css";

const HeaderStrip = props => {
    return (<div className="headerStrip">
        <p class={props.color}>{props.title}</p>
    </div>);
}

export default HeaderStrip;