import React, {
    useState
} from "react";
import "./main.css";

import {
    Paper,
    Icon,
    TextWithSubText,
    Autocomplete
} from "../../components";

const ClockIn = () => {
    const [inputText, setInputText] = useState("");

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
                <div>
                    <TextWithSubText
                        isInputField
                        textColor="blueText"
                        bigText="Employee ID"
                        smallText=""
                        inputText={inputText}
                        setInputText={setInputText}
                    />
                    <Autocomplete
                        list={["Jasmin Burke", "Isaiah Harrison"]}
                        value={inputText}
                        setInputText={setInputText}
                        style={{
                            width: "60%",
                            position: "absolute",
                            left: "30%"
                        }}
                    />
                </div>
            </div>
        </Paper>
    </div>)
}

export default ClockIn;