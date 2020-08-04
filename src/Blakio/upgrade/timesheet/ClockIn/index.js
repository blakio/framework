import React, {
    useEffect
} from "react";
import "./main.css";

import {
    Paper,
    Icon,
    TextWithSubText
} from "../../components";

import { StateContext } from "blakio_context/State";
import Types from "blakio_context/Types"
import Axios from "blakio_axios";
import Util, { strings } from "blakio_util";

const ClockIn = props => {
    const [state, dispatch] = StateContext();
    useEffect(() => { Util.getEmployees(dispatch) }, []);

    const { employeeDirectory } = state;

    const submitNewEmployee = (employeeId, time, firstName) => {
        Axios.recordEmployeeTime({
            employeeId,
            isClockedIn: true,
            time
        }).then(data => {
            Util.load(dispatch, false);
            Util.showSuccess(`Thanks ${firstName}`, "Successfully Clocked In");
            dispatch({
                type: Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN,
                payload: true
            });
        }).catch(err => errorLoggingIn(err))
    }

    const errorLoggingIn = err => {
        console.log(err)
        Util.load(dispatch, false);
        Util.showError(strings.timesheet.cantClockIn.title, strings.timesheet.cantClockIn.body);
    }

    const clockTime = () => {
        const employee = state.timeSheet.clockIn.selectedEmployee;
        if(!employee) return;

        Util.load(dispatch, true);
        Axios.getTime().then(data => {
            Axios.getEmployeeTimeLog({
                query: { employeeId: employee._id }
            }).then(log => {
                Util.load(dispatch, false);
                const hasPreviouslyLogTime = log.data.length;
                if(hasPreviouslyLogTime){
                    const fieldToPushTo = "time";
                    Axios.addToTimeLog(employee._id, { ...data.data, hasClockedIn: !log.data[0].isClockedIn }, fieldToPushTo, !log.data[0].isClockedIn).then(() => {
                        Util.load(dispatch, false);
                        Util.showSuccess(`Thanks ${employee.firstName}`, `Successfully ${log.data[0].isClockedIn ? "Clocked Out" : "Clocked In"}`);
                        dispatch({
                            type: Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN,
                            payload: !log.data[0].isClockedIn
                        });
                    }).catch(err => errorLoggingIn(err));
                } else {
                    submitNewEmployee(employee._id, { ...data.data, hasClockedIn: true }, employee.firstName)
                }
            }).catch(err => errorLoggingIn(err));
        }).catch(err => errorLoggingIn(err));
    }

    const icon = (<div className="clockInBox">
        <Icon
            isBtn
            helpText="submit"
            onClick={() => clockTime()}
            icon="far fa-clock"
        />
    </div>);

    const setInputValue = value => {
        dispatch({
            type: Types.SET_CLOCK_IN_INPUT_VALUE,
            payload: value
        });
    }

    const setEmployee = value => {
        dispatch({
            type: Types.SET_CLOCK_IN_SELECTED_EMPLOYEE,
            payload: value
        });
        if(value){
            Axios.getEmployeeTimeLog({
                query: { employeeId: value._id }
            }).then(log => {
                const lastLoggedTime = log.data[log.data.length - 1];
                if(lastLoggedTime){
                    dispatch({
                        type: Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN,
                        payload: lastLoggedTime.isClockedIn
                    });
                } else {
                    dispatch({
                        type: Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN,
                        payload: false
                    });
                }
            });
        } else {
            dispatch({
                type: Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN,
                payload: null
            });
        }
    }

    const selectEmployee = selected => {
        setInputValue(`${selected["firstName"]} ${selected["lastName"]}`);
        setEmployee(selected);
    }

    const setClockInEmployee = employee => {
        let selected = null;
        employeeDirectory.employees.forEach(data => {
            if(Util.hasMatchingStrings(`${data["firstName"]} ${data["lastName"]}`, employee)){
                selected = data;
            }
        });
        setEmployee(selected);
        setInputValue(employee);
    }

    const getListValue = data => {
        return `${data["firstName"]} ${data["lastName"]}`;
    }

    const getSmallText = () => {
        return state.timeSheet.clockIn.selectedEmployee ? state.timeSheet.clockIn.selectedEmployee.title : ""
    }

    const getPaperText = () => {
        let text = "Enter Name To Clock In";
        if(state.timeSheet.clockIn.selectedEmployeeIsClockedIn !== null){
            text = state.timeSheet.clockIn.selectedEmployeeIsClockedIn ? "Clock Out": "Clock In";
        }
        return text;
    }

    return (<div>
        <Paper
            title={getPaperText()}
            color={getPaperText() !== "Clock Out" ? "green" : "red"}
        >
            <div className="paperContainer">
                {icon}
                <div>
                    <TextWithSubText
                        isInputField
                        textColor="blueText"
                        bigText="Enter Name"
                        smallText={getSmallText()}
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