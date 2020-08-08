import React from "react";
import "./main.css";

import Autocomplete from "../Autocomplete";

const getInput = (
    textColor,
    bigText,
    inputText,
    hasAutocomplate,
    employees,
    autoCompleteOnClick,
    onChange,
    getListValue
) => {

    return (<div>
        <input
            className={`bigTextInput ${textColor}`}
            placeholder={bigText}
            value={inputText}
            onChange={e => onChange(e.target.value)}
        />
        {hasAutocomplate && <Autocomplete
            list={employees}
            value={inputText}
            onClick={autoCompleteOnClick}
            getListValue={getListValue}
        />}
    </div>)
}

const TextWithSubText = props => {

    const {
        isInputField,
        textColor,
        bigText,
        smallText,
        inputText,
        
        hasAutocomplate,
        employees,
        onChange,
        getListValue,
        autoCompleteOnClick
    } = props;

    const text = isInputField ? (
        getInput(
            textColor,
            bigText,
            inputText,
            hasAutocomplate,
            employees,
            autoCompleteOnClick,
            onChange,
            getListValue
        )
    ) : (<p className="bigText">{bigText}</p>);
    
    return (<div>
        {text}
        <p className="smallText">{smallText}</p>
    </div>);
}

export default TextWithSubText;