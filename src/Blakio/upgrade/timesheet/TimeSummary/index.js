import React from "react";
import "./main.css";

import {
    Paper,
    Table
} from "../../components";

const TimeSummary = () => {

    const th = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const td = [
        ["Isaiah", "8", "8", "8", "8", "8", "8", "8"],
        ["Jasmin", "8", "8", "8", "8", "8", "8", "8"]
    ]

    return (<div className="timeSummary">
        <Paper
            title="Time Summary"
            color="blue"
        >
            <Table
                th={th}
                td={td}
            ></Table>
        </Paper>
    </div>);
}

export default TimeSummary;