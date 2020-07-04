import React, {
    useState
} from "react";
import "./main.css";

import {
    Paper,
    Icon,
    TextWithSubText
} from "../../components";

const ClockIn = props => {

    const {
        employees,
        clockTime,
        selectEmployee,
        setClockInEmployee
    } = props;

    const [inputText, setInputText] = useState("");
    const [smallText, setSmallText] = useState("");

    const icon = (<div className="clockInBox">
        <Icon
            isBtn
            helpText="submit"
            onClick={() => clockTime(inputText)}
        />
    </div>);

    return (<div>
        <Paper
            title="Clock In"
            color="blue"
        >
            <div className="paperContainer">
                {icon}
                <div>
                    <TextWithSubText
                        isInputField
                        textColor="blueText"
                        bigText="Employee ID"
                        smallText={smallText}
                        inputText={inputText}
                        setInputText={setInputText}
                        setSmallText={setSmallText}
                        select={selectEmployee}

                        hasAutocomplate={true}
                        employees={employees}
                        fn={setClockInEmployee}
                    />
                </div>
            </div>
        </Paper>
    </div>)
}

export default ClockIn;