import React, {
    useState,
    useEffect
} from "react";
import "./main.css";

import {
    Paper,
    Icon,
    TextWithSubText
} from "../../components";

import { StateContext } from "Context/State";
import Types from "Context/Types"
import Axios from "../../../../Axios/index.js";
import Util, { strings } from "../../../../Util";

const ClockIn = props => {
    const [state, dispatch] = StateContext();
    useEffect(() => { Util.getEmployees(dispatch) }, []);

    const defaultClockInText = "Enter Name To Clock In";
    const [paperTitle, setPaperTitle] = useState(defaultClockInText);

    const { employeeDirectory } = state;

    const submitNewEmployee = (employeeId, time, firstName) => {
        Axios.recordEmployeeTime({
            employeeId,
            isClockedIn: true,
            time
        }).then(data => {
            Util.load(dispatch, false);
            Util.showSuccess(`Thanks ${firstName}`, "Successfully Clocked In");
            setPaperTitle("Clock Out");
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
                    Axios.addToTimeLog(employee._id, data.data, fieldToPushTo, !log.data[0].isClockedIn).then(() => {
                        Util.load(dispatch, false);
                        Util.showSuccess(`Thanks ${employee.firstName}`, `Successfully ${log.data[0].isClockedIn ? "Clocked Out" : "Clocked In"}`);
                        setPaperTitle(log.data[0].isClockedIn ? "Clock In" : "Clock Out");
                    }).catch(err => errorLoggingIn(err));
                } else {
                    submitNewEmployee(employee._id, data.data, employee.firstName)
                }
            }).catch(err => errorLoggingIn(err));
        }).catch(err => errorLoggingIn(err));
    }

    const icon = (<div className="clockInBox">
        <Icon
            isBtn
            helpText="submit"
            onClick={() => clockTime()}
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
                    setPaperTitle( lastLoggedTime.isClockedIn ? "Clock Out" : "Clock In");
                } else {
                    setPaperTitle("Clock In") 
                }
            });
        } else {
            setPaperTitle(defaultClockInText);
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

    return (<div>
        <Paper
            title={paperTitle}
            color={paperTitle !== "Clock Out" ? "green" : "red"}
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