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

    const clockTime = () => {
        const employee = state.timeSheet.clockIn.selectedEmployee;
        if(employee){
            console.log({
                id: employee._id,
                time: Date.now()
            })
        }
    }

    const icon = (<div className="clockInBox">
        <Icon
            isBtn
            helpText="submit"
            onClick={() => clockTime()}
        />
    </div>);

    const setClockInInputValue = value => {
        dispatch({
            type: Types.SET_CLOCK_IN_INPUT_VALUE,
            payload: value
        });
    }

    const setClockInSelectedEmployee = value => {
        dispatch({
            type: Types.SET_CLOCK_IN_SELECTED_EMPLOYEE,
            payload: value
        });
        dispatch({
            type: Types.SET_EMPLOYEE_TITLE,
            payload: value ? value.title : ""
        })
    }

    const selectEmployee = selected => {
        setClockInInputValue(`${selected["firstName"]} ${selected["lastName"]}`);
        setClockInSelectedEmployee(selected);
    }

    const setClockInEmployee = employee => {
        let set = false;
        employeeDirectory.employees.forEach(data => {
          if(!set){
            if(`${data["firstName"]} ${data["lastName"]}`.toLowerCase() === employee.toLowerCase()){
                setClockInSelectedEmployee(data)
                set = true;
            }
          }
        });
        if(!set){
            setClockInSelectedEmployee(null);
        }
        setClockInInputValue(employee)
    }

    const getListValue = data => {
        return `${data["firstName"]} ${data["lastName"]}`;
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
                        smallText={state.timeSheet.clockIn.employeeTitle}
                        inputText={state.timeSheet.clockIn.inputValue}
                        
                        hasAutocomplate={true}
                        employees={employeeDirectory.employees}
                        onChange={setClockInEmployee}
                        getListValue={getListValue}
                        autoCompleteOnClick={selectEmployee}
                    />
                </div>
            </div>
        </Paper>
    </div>)
}

export default ClockIn;