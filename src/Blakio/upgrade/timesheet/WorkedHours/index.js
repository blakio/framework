import React from "react";

import {
    Paper,
    Icon,
    TextWithSubText
} from "../../components";

import { StateContext } from "Context/State";

const WorkedHours = () => {
    const [state, dispatch] = StateContext();

    return (<div>
        <Paper
            title="Hours Worked"
            color="green"
        >
            <Icon
                helpText="HOURS"
                onClick={() => {}}
                text={state.timeSheet.clockIn.totalHrs}
            />
        </Paper>
    </div>)
}

export default WorkedHours;