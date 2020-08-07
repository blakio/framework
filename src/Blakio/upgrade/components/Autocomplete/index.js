import React from "react";
import "./main.css";

const getName = (filteresList) => {
    return `${filteresList[0]["firstName"]} ${filteresList[0]["lastName"]}`;
}

const Autocomplete = props => {

    const {
        value,
        list,
        onClick,
        getListValue
    } = props;

    const filteresList = list.filter(data => {
        const name = `${data["firstName"]} ${data["lastName"]}`;
        return name.toLowerCase().includes(value.toLowerCase());
    });

    return (<div className="autoComplete" style={props.style}>
        {filteresList.length && value !== getName(filteresList) ? <div>
            <ul>
                {value && filteresList.map((data, index) => <li
                    key={index}
                    onClick={() => onClick(data)}
                >{getListValue(data)}</li>)}
            </ul>
        </div> : ""}
    </div>
    );
}

export default Autocomplete;