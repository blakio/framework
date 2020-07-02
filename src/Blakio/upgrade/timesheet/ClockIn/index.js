import React from "react";
import "./main.css";

import {
    Paper,
    Icon,
    TextWithSubText
} from "../../components";

const ClockIn = () => {
    return (<div>
        <Paper
            title="Clock In"
            color="blue"
        >
            <div className="paperContainer">
                <div className="clockInBox">
                    <Icon
                        isBtn
                        helpText="submit"
                    />
                </div>
                <TextWithSubText
                    isInputField
                    textColor="blueText"
                    bigText="Employee ID"
                    smallText=""
                />
            </div>
        </Paper>
    </div>)
}

export default ClockIn;