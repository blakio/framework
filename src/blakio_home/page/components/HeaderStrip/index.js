import React from "react";
import "./main.css";

import { CSVLink } from "react-csv";

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
                    {
                        data.csvData ?
                        <CSVLink className="csvLink" data={data.csvData} filename={data.csvFileName}>
                            <i className={data.customIcon || iconMapper[data.type]}></i>
                        </CSVLink> :
                        <i className={data.customIcon || iconMapper[data.type]}></i>
                    }
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