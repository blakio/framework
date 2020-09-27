import React, { useState, useEffect } from "react";
import "./main.css"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';

import {
    Paper
} from "../../components";

import Axios from "blakio_axios";

import Types from "blakio_context/Types";
import {
    StateContext
} from "blakio_context/State";

import Util from "blakio_util";
const {
    showError,
    showSuccess
} = Util;

const EmployeeEditForm = () => {

    const [state, dispatch] = StateContext();
    const {
        updateId,
        employees,
        offset,
        limit
    } = state.employeeDirectory;

    const shortMenu = true;

    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        const employee = employees.filter(data => data._id === updateId)[0];
        setFormValues({
            dob: moment(employee.dob)._d,
            firstName: employee.firstName,
            lastName: employee.lastName,
            phone: employee.phone,
            email: employee.email,
            emergencyContact: employee.emergencyContact,
            title: employee.title,
            department: employee.department
        })
    }, [])

    const handleChange = e => {
        let {
            value
        } = e.target;

        const type = e.target.getAttribute("type");

        if ((type === "phone" || type === "emergencyContact")) {
            if (isNaN(value) || value.length > 10) {
                return;
            }
        }

        const objKey = e.target.getAttribute("type");
        const key = objKey === "employeeEmail" ? "email" : objKey;

        setFormValues({
            ...formValues,
            [key]: value
        })
    }

    const onSubmit = () => {
        const method =  "updateEmployee";
        const title = "Update Employee";
        const message = "Successfully updated employee";
        Axios[method]({
            ...formValues,
            phone: parseInt(formValues.phone),
            emergencyContact: parseInt(formValues.emergencyContact)
        }, updateId).then(data => {
            dispatch({
                type: Types.GET_EMPLOYEES,
                payload: {
                    fn: (employees) => {
                        dispatch({
                            type: Types.SET_EMPLOYEES,
                            payload: employees.table
                        })
                        dispatch({
                            type: Types.SET_EMPLOYEES_COUNT,
                            payload: employees.count
                        })
                    },
                    page: {
                        offset,
                        limit
                    },
                }
            });
            onCancel();
            showSuccess(title, message)
        }).catch(err => {
            console.log(err);
            showError("Error", "Please try again later");
        });
    }

    const onCancel = () => {
        dispatch({
            type: Types.UPDATE_EMPLOYEE,
            payload: null
        })
    }

    const onDelete = () => {
        Axios.deleteEmployee(updateId).then(data => {
            dispatch({
                type: Types.GET_EMPLOYEES,
                payload: {
                    fn: (employees) => {
                        dispatch({
                            type: Types.SET_EMPLOYEES,
                            payload: employees.table
                        })
                        dispatch({
                            type: Types.SET_EMPLOYEES_COUNT,
                            payload: employees.count
                        })
                    },
                    page: {
                        offset,
                        limit
                    },
                }
            });
            onCancel();
            showSuccess("Delete Employee", "Successfully deleted employee")
        }).catch(err => {
            console.log(err);
            showError("Error", "Please try again later");
        });
    }

    const getValue = (key) => {
        return formValues[key];
    }

    return (<div className="employeeForm">
        <Paper
            title={"Edit Employee"}
            color={"orange"}
        >
            <div className="employeeFormContainer">
                <p>First Name</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter text" type="firstName" onChange={handleChange} value={getValue("firstName")} />
                <p>Last Name	</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter text" type="lastName" onChange={handleChange} value={getValue("lastName")} />
                {/* <p>DOB</p>
                <DatePicker
                    selected={getValue("dob")}
                    onChange={handleDateChange}
                /> */}
                <p>Phone</p>
                <input pattern="[0-9]*" className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter text" type="phone" onChange={handleChange} value={getValue("phone")} />
                <p>Email</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter text" type="employeeEmail" onChange={handleChange} value={getValue("email")} />
                {/* <p>Emergency Contact</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter text" type="emergencyContact" onChange={handleChange} value={getValue("emergencyContact")}/> */}
                <p>Title</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter text" type="title" onChange={handleChange} value={getValue("title")} />
                {/* <p>Department</p>
                <input className="employeeInput" onClick={() => Util.openPhoneMode(dispatch, shortMenu)} placeholder="Enter text" type="department" onChange={handleChange} value={getValue("department")}/> */}
                <button className="submitBtn" onClick={onSubmit}>Update</button>
                <button className="submitBtn" onClick={onCancel}>Cancel</button>
                <button className="submitBtn red" onClick={onDelete}>Delete</button>
            </div>
        </Paper>
    </div>)
}

export default EmployeeEditForm;