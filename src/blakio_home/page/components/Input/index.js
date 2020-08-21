import React from "react";
import "./main.css";

import Autocomplete from "../Autocomplete";

const getInput = (
    textColor,
    bigText,
    inputText,
    employees,
    autoCompleteOnClick,
    onChange,
    getListValue
) => {

    return (<div className="inputContiner">
        <input
            className={`bigTextInput ${textColor}`}
            placeholder={bigText}
            value={inputText}
            onChange={e => onChange(e.target.value)}
        />
        <Autocomplete
            list={employees}
            value={inputText}
            onClick={autoCompleteOnClick}
            getListValue={getListValue}
        />
    </div>)
}

const TextWithSubText = props => {

    const {
        textColor,
        bigText,
        smallText,
        inputText,
        employees,
        onChange,
        getListValue,
        autoCompleteOnClick
    } = props;

    const input = getInput(
        textColor,
        bigText,
        inputText,
        employees,
        autoCompleteOnClick,
        onChange,
        getListValue
    )
    
    return (<div>
        {input}
        <p className="smallText">{smallText}</p>
    </div>);
}

export default TextWithSubText;