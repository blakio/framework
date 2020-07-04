import React, {
    useState,
    useEffect
} from "react";
import "./main.css";

import {
    Paper,
    Icon,
    TextWithSubText,
    Autocomplete
} from "../../components";

const ClockIn = props => {

    const [inputText, setInputText] = useState("");
    const [smallText, setSmallText] = useState("");

    useEffect(() => {
        const hasFoundEmployee = props.employees.map(data => {
            const name = data["firstName"] + data["lastName"]
            return name.toLowerCase() === inputText.toLowerCase();
        });
        if(hasFoundEmployee.length){
            console.log("found")
        }
    }, [inputText])

    const icon = (<div className="clockInBox">
        <Icon
            isBtn
            helpText="submit"
            onClick={() => props.clockTime()}
        />
    </div>);
    const styles = {
        width: "60%",
        position: "absolute",
        left: "30%"
    }

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
                        selectEmployee={props.selectEmployee}

                        hasAutocomplate={true}
                        employees={props.employees}
                    />
                </div>
            </div>
        </Paper>
    </div>)
}

export default ClockIn;