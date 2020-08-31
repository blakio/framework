import React from "react";

import "./main.css";

const CircleBtns = props => {
    const {
        buttons
    } = props;

    return (<div className="circleBtnParent">
        {buttons.map(data => {
            const {
                text,
                icon,
                color,
                onClick
            } = data;
            return (<diiv className="circleBtn">
                <div className={`circleBtnIconContainer ${color}`} onClick={onClick}>
                    <i className={icon} />
                </div>
                <p>{text}</p>
            </diiv>)
        })}
    </div>)
}

export default CircleBtns;