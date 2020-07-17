import React from "react";
import "./main.css";

import {
    Paper,
    Table
} from "../../components";

const TimeSummary = () => {

    const th = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const td = [
        ["Clock In Time", "8", "8", "8", "8", "8", "8", "8"],
        ["Clock Out Time", "8", "8", "8", "8", "8", "8", "8"],
        ["Clock In Time", "8", "8", "8", "8", "8", "8", "8"],
        ["Clock Out Time", "8", "8", "8", "8", "8", "8", "8"]
    ]

    return (<div className="timeSummary">
        <Paper
            title="Time Summary"
            color="blue"
        >
            <Table
                th={th}
                td={td}
                setRefs={() => {}}
                getTd={() => td}
                getTh={() => th}
                fields={[]}
                ids={[]}
                getData={value => value}
            ></Table>
        </Paper>
    </div>);
}

export default TimeSummary;