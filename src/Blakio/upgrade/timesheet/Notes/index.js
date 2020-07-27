import React from "react";
import "./main.css";

import {
    Paper
} from "../../components";

const Notes = () => {

    const notes = ["forgot to clock in when I first got in on wed", "calling out sick on monday"];

    const getValue = value => value;

    const onClick = () => {};

    return (<div>
        <Paper
            title="Notes for week"
            color="green"
        >
            {notes.map((data, index) => (
                <div className="notesHolder" key={index}>
                    <p>{getValue(data)}</p>
                    <button className="cancelBtn" onClick={() => onClick(data)}>x</button>
                </div>
            ))}
            <textarea maxlength="50" placeholder="max 50 characters"></textarea>
        </Paper>
    </div>)
}

export default Notes;