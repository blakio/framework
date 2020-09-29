import React from "react";

import {
    Paper
} from "blakio_home/components";

import "./main.css";

import { StateContext } from "blakio_context/State";

const WorkedHours = () => {
    const [state] = StateContext();

    return (<div>
        <Paper
            title="Weekly Hrs"
            color="green"
        >
            <p
                className="hoursWorkedText blueText"
            >{state.timeSheet.clockIn.totalHrs ? state.timeSheet.clockIn.totalHrs.toFixed(2) : 0}</p>
        </Paper>
    </div>)
}

export default WorkedHours;