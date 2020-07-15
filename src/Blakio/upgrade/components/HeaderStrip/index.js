import React from "react";
import "./main.css";

const HeaderStrip = props => {

    const iconMapper = {
        edit: "fas fa-pencil-alt",
        cancel: "fas fa-times",
        submit: "fas fa-check"
    }

    const getButtons = () => {
        return (<div className="headerButtons">
            {props.buttons.map((data, index) => {
                return (<div key={index} onClick={data.onClick} className={`headerBtn ${data.color}`}>
                    <i className={iconMapper[data.type]}></i>
                </div>)
            })}
        </div>)
    }

    return (<div className="headerStrip">
        <p className={props.color}>{props.title}</p>
        {props.buttons && getButtons()}
    </div>);
}

export default HeaderStrip;