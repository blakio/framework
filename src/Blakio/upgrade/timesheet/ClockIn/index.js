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

import Axios from "../../../../Axios/index.js";

const ClockIn = props => {
    const [state, dispatch] = StateContext();

    const {
        employeeDirectory
    } = state;

    const submitNewEmployee = (employeeId, time, firstName) => {
        Axios.recordEmployeeTime({
            employeeId,
            isClockedIn: true,
            time
        }).then(data => {
            dispatch({
                type: Types.IS_LOADING,
                payload: false
            })
            console.log("Successfully logged in employees");
            props.store.addNotification({
                title: `Thanks ${firstName}`,
                message: "Successfully logged time",
                type: "success",
                insert: "top",
                container: "top-left",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        }).catch(err => {
            dispatch({
                type: Types.IS_LOADING,
                payload: false
            })
            props.showError("Sorry", "Unable to clock employee in at this time. Please try again later.")
        })
    }

    const clockTime = () => {
        const employee = state.timeSheet.clockIn.selectedEmployee;
        if(employee){
            dispatch({
                type: Types.IS_LOADING,
                payload: true
            })
            Axios.getTime().then(data => {
                Axios.getEmployeeTimeLog().then(log => {
                    if(log.data.length){
                        let found = false;
                        log.data.forEach(logData => {
                            if(logData.employeeId === employee._id){
                                found = true;
                                const fieldToPushTo = "time"
                                Axios.addToTimeLog(employee._id, data.data, fieldToPushTo, !logData.isClockedIn).then(data => {
                                    dispatch({
                                        type: Types.IS_LOADING,
                                        payload: false
                                    })
                                    props.showSuccess(`Thanks ${employee.firstName}`, "Successfully logged time")
                                }).catch(err => {
                                    dispatch({
                                        type: Types.IS_LOADING,
                                        payload: false
                                    })
                                    props.showError(`Sorry ${employee.firstName}`, "Error logging time. Please try again later.");
                                });
                            }
                        });
                        if(!found){
                            submitNewEmployee(employee._id, data.data, employee.firstName)
                        }
                    } else {
                        submitNewEmployee(employee._id, data.data, employee.firstName)
                    }
                }).catch(err => {
                    dispatch({
                        type: Types.IS_LOADING,
                        payload: false
                    });
                    props.showError("Sorry", "Unable to clock employee in at this time. Please try again later");
                })
            }).catch(err => {
                dispatch({
                    type: Types.IS_LOADING,
                    payload: false
                })
                props.showError("Sorry", "Unable to clock employee in at this time. Please try again later");
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