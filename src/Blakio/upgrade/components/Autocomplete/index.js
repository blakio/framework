import React from "react";
import "./main.css";

const getName = (filteresList) => {
    return filteresList[0]["firstName"] + filteresList[0]["lastName"]
}

const Autocomplete = props => {

    const {
        value,
        list,
        setInputText,
        setSmallText,
        selected
    } = props;

    const filteresList = list.filter(data => {
        const name = data["firstName"] + data["lastName"]
        return name.toLowerCase().includes(value.toLowerCase())
    });

    return (<div style={props.style}>
        {filteresList.length && value !== getName(filteresList) && <div>
            <ul>
                {value && filteresList.map((data, index) => <li
                    key={index}
                    onClick={e => {
                        setInputText(data["firstName"] + data["lastName"])
                        setSmallText(data.title)
                        // selected(data)
                    }}
                >{data["firstName"] + data["lastName"]}</li>)}
            </ul>
        </div>}
    </div>
    );
}

export default Autocomplete;