import React from "react";
import {
    Paper
} from "../../components";

const Notes = () => {
    return (<div>
        <Paper
            title="Notes for week"
            color="green"
        >
            <p>No new note</p>
            <textarea maxlength="50" placeholder="max 50 characters" rows="4"></textarea>
        </Paper>
    </div>)
}

export default Notes;