import React from "react";

import "./main.css";

const CircleBtns = props => {
    const {
        buttons
    } = props;

    return (<div className="circleBtnParent">
        {buttons.map((data, i) => {
            const {
                text,
                icon,
                color,
                onClick
            } = data;
            return (<div className="circleBtn" key={i}>
                <div className={`circleBtnIconContainer ${color}`} onClick={onClick}>
                    <i className={icon} />
                </div>
                <p>{text}</p>
            </div>)
        })}
    </div>)
}

export default CircleBtns;