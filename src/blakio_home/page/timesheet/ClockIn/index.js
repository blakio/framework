import React, {
    useEffect
} from "react";
import "./main.css";

import {
    Paper,
    Icon,
    Input,
    Button
} from "blakio_home/components";

import { StateContext } from "blakio_context/State";
import Types from "blakio_context/Types"
import Axios from "blakio_axios";
import Util, { strings } from "blakio_util";

const ClockIn = () => {

    const [state, dispatch] = StateContext();

    const {
        offset,
        limit
    } = state.employeeDirectory;

    useEffect(() => {
        Util.getEmployees({
            dispatch,
            page: {
                offset: false,
                limit: false
            }
        })
    }, []);

    const { employeeDirectory } = state;

    const submitNewEmployee = async (employeeId, time, firstName) => {
        try {
            await Axios.recordEmployeeTime({ employeeId, isClockedIn: true, time });
            Util.load(dispatch, false);
            Util.showSuccess(`Thanks ${firstName}`, "Successfully Clocked In");
            dispatch({
                type: Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN,
                payload: true
            });
            Util.load(dispatch, false);
        } catch(err) {
            errorLoggingIn(err)
        }
    }

    const errorLoggingIn = err => {
        console.log(err)
        Util.load(dispatch, false);
        Util.showError(strings.timesheet.cantClockIn.title, strings.timesheet.cantClockIn.body);
    }

    const clockTime = async () => {

        const employee = state.timeSheet.clockIn.selectedEmployee;
        if(!employee) return Util.showError("", "Must add employee in Directory first");

        Util.load(dispatch, true);

        try {
            const time = await Axios.getTime();
            const timeLog = await Axios.getEmployeeTimeLog({ query: { employeeId: employee._id } });
    
            const hasPreviouslyLogTime = timeLog.data.length;
            if(hasPreviouslyLogTime){
                const fieldToPushTo = "time";
                await Axios.addToTimeLog(employee._id, { ...time.data, hasClockedIn: !timeLog.data[0].isClockedIn }, fieldToPushTo, !timeLog.data[0].isClockedIn);

                Util.showSuccess(`Thanks ${employee.firstName}`, `Successfully ${timeLog.data[0].isClockedIn ? "Clocked Out" : "Clocked In"}`);
                dispatch({
                    type: Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN,
                    payload: !timeLog.data[0].isClockedIn
                });
                Util.load(dispatch, false);
            } else {
                submitNewEmployee(employee._id, { ...time.data, hasClockedIn: true }, employee.firstName);
            }
        } catch(err) {
            errorLoggingIn(err);
            Util.load(dispatch, false);
        }
    }

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
                <Button
                    icon="far fa-clock"
                    text="Submit"
                    onClick={clockTime}
                />
                <Input
                    bigText="Enter Name"
                    employees={employeeDirectory.employees}
                    onChange={setClockInEmployee}
                />
            </div>
        </Paper>
    </div>)
}

export default ClockIn;