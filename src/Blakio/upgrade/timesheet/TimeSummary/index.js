import React, {
    useEffect,
    useState
} from "react";
import "./main.css";

import moment from "moment";

import {
    Paper,
    Table
} from "../../components";

import Util from "../../../../Util";
import Axios from "../../../../Axios";
import { StateContext } from "Context/State";

const TimeSummary = () => {
    const [state, dispatch] = StateContext();
    const [offset, setOffset] = useState(null)

    useEffect(() => {
        const epochWeek = Util.getCurrentWeekInEpoch(offset);
        const range = [epochWeek[0], epochWeek[epochWeek.length - 1]];
        const query = [
            { "$unwind": "$time" },
            { "$match": { "time.timestamp": { "$gte": range[0], "$lte": range[1] } } }
        ];
        Axios.getTimeOverRange(state.timeSheet.clockIn.selectedEmployee._id, query).then(data => {
            console.log(data)
        })
    }, [offset]);
    
    const th = ["", ...Util.getCurrentWeek(offset)];
    const td = [
        ["Clock In", "8", "8", "8", "8", "8", "8", "8"],
        ["Clock Out", "8", "8", "8", "8", "8", "8", "8"],
        ["Clock In", "8", "8", "8", "8", "8", "8", "8"],
        ["Clock Out", "8", "8", "8", "8", "8", "8", "8"]
    ];

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