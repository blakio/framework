import React from "react";
import "./main.css";

import 'react-widgets/dist/css/react-widgets.css';
import Combobox from 'react-widgets/lib/Combobox'

const getInput = (
    bigText,
    employees,
    onChange
) => {

    let data = []
    employees.forEach(empl => data.push(`${empl.firstName} ${empl.lastName}`));

    return (<div className="inputContiner">
        <Combobox
            data={data}
            placeholder={bigText}
            onChange={onChange}
            filter='contains'
            dropUp
        />
    </div>)
}

const Input = props => {

    const {
        bigText,
        smallText,
        employees,
        onChange
    } = props;

    const input = getInput(
        bigText,
        employees,
        onChange
    )
    
    return (<div>
        {input}
        <p className="smallText">{smallText}</p>
    </div>);
}

export default Input;