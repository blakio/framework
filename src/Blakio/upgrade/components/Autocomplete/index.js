import React from "react";
import "./main.css";

const Autocomplete = props => {

    const selected = props.list.filter(data => data.toLowerCase().includes(props.value.toLowerCase()));

    return (<div style={props.style}>
        {props.value !== selected[0] && <div>
            <ul>
                {props.value && selected.map(data => <li
                    onClick={e => props.setInputText(e.target.innerText)}
                >{data}</li>)}
            </ul>
        </div>}
    </div>
    );
}

export default Autocomplete;