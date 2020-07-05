import React from "react";
import "./main.css";

import Autocomplete from "../Autocomplete";

const getInput = (
    textColor,
    bigText,
    inputText,
    setInputText,
    setSmallText,
    hasAutocomplate,
    employees,
    select,
    fn,
    onClick
) => {

    return (<div>
        <input
            className={`bigTextInput ${textColor}`}
            placeholder={bigText}
            value={inputText}
            onChange={e => {
                setInputText(e.target.value);
                fn(e.target.value)
                onClick(e.target.value)
            }}
        />
        {hasAutocomplate && <Autocomplete
            list={employees}
            value={inputText}
            setInputText={setInputText}
            setSmallText={setSmallText}
            select={select}
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
        setInputText,
        setSmallText,
        select,

        hasAutocomplate,
        employees,
        fn,
        onClick
    } = props;

    const text = isInputField ? (
        getInput(
            textColor,
            bigText,
            inputText,
            setInputText,
            setSmallText,
            hasAutocomplate,
            employees,
            select,
            fn,
            onClick
        )
    ) : (<p className="bigText">{bigText}</p>);
    
    return (<div>
        {text}
        <p className="smallText">{smallText}</p>
    </div>);
}

export default TextWithSubText;