import React, { useState } from "react";
import "./main.css";

import Combobox from 'react-widgets/lib/Combobox'

const getInput = (
    bigText,
    employees,
    onChange,
    open
) => {

    let data = []
    employees.forEach(empl => data.push(`${empl.firstName} ${empl.lastName}`));

    return (<div className="inputContiner">
        <Combobox
            data={data}
            placeholder={bigText}
            onChange={onChange}
            onToggle={() => {}}
            filter='contains'
            dropUp
            open={open}
        />
    </div>)
}

const Input = props => {

    const [open, setOpen] = useState(false);

    const {
        bigText,
        smallText,
        employees,
        onChange
    } = props;

    const onChangeFn = e => {
        let close = false;
        employees.forEach(data => {
            if(`${data.firstName} ${data.lastName}`.toLowerCase() === e.toLowerCase()){
                close = true;
            }
        })
        onChange(e);
        setOpen(!close);
    }

    const input = getInput(
        bigText,
        employees,
        onChangeFn,
        open
    )

    const toggle = () => setOpen(!open);

    return (<div className="inputHolder">
        {input}
        <button onClick={toggle} tabIndex="-1" title="open combobox" type="button" aria-disabled="false" aria-label="open combobox" className="rw-btn rw-btn-select comboboxInput">
            <span aria-hidden="true" className="rw-i rw-i-caret-down"></span>
        </button>
        <p className="smallText">{smallText}</p>
    </div>);
}

export default Input;