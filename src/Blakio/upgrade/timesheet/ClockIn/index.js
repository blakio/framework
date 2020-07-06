import React, {
    useState
} from "react";
import "./main.css";

import {
    Paper,
    Icon,
    TextWithSubText
} from "../../components";

import {
    StateContext
} from "Context/State";
import Types from "Context/Types"

const ClockIn = props => {
    const [state, dispatch] = StateContext();

    const {
        employeeDirectory
    } = state;

    const [inputText, setInputText] = useState("");
    const [smallText, setSmallText] = useState("");

    const icon = (<div className="clockInBox">
        <Icon
            isBtn
            helpText="submit"
            onClick={() => clockTime()}
        />
    </div>);

    const setEmployee = value => {
        dispatch({
            type: Types.SET_CLOCK_IN_INPUT_VALUE,
            payload: value
        });
    }

    const setSelectedEmployee = value => {
        dispatch({
            type: Types.SET_CLOCK_IN_SELECTED_EMPLOYEE,
            payload: value
        });
    }

    const selectEmployee = selected => {
        setEmployee(`${selected["firstName"]} ${selected["lastName"]}`);
        setSelectedEmployee(selected);
    }

    const setClockInEmployee = employee => {
        let set = false;
        employeeDirectory.employees.forEach(data => {
          if(!set){
            if(`${data["firstName"]} ${data["lastName"]}`.toLowerCase() === employee.toLowerCase()){
                setSelectedEmployee(data)
                set = true;
            }
          }
        });
        if(!set){
            setSelectedEmployee(null)
        }
    }

    const clockTime = selected => {
        const employee = state.timeSheet.clockIn.selectedEmployee;
        if(employee){
            console.log({
                id: employee._id,
                time: Date.now()
            })
        }
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
                        select={selectEmployee}

                        hasAutocomplate={true}
                        employees={employeeDirectory.employees}
                        fn={setClockInEmployee}

                        onClick={setEmployee}
                    />
                </div>
            </div>
        </Paper>
    </div>)
}

export default ClockIn;