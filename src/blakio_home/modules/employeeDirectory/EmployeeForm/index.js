import React, { useState, useEffect } from "react";
import "./main.css"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';

import {
    Paper
} from "blakio_home/components";

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

const EmployeeForm = () => {

    const [state, dispatch] = StateContext();
    const {
        offset,
        limit
    } = state.employeeDirectory;

    const shortMenu = true;

    const defaultInputValue = {
        dob: moment()._d,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        emergencyContact: "",
        title: "",
        department: ""
    }

    const [formValues, setFormValues] = useState(defaultInputValue);

    useEffect(() => {
        setFormValues(defaultInputValue)
    }, [])

    const handleDateChange = dateSelected => {
        setFormValues({
            ...formValues,
            dob: dateSelected
        })
    }

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
        const method = "addEmployee";
        const title = "Add Employee";
        const message = "Successfully added employee";
        Axios[method]({
            ...formValues,
            phone: parseInt(formValues.phone),
            emergencyContact: parseInt(formValues.emergencyContact)
        }).then(data => {
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
        setFormValues(defaultInputValue);
        dispatch({
            type: Types.UPDATE_EMPLOYEE,
            payload: null
        })
    }

    const getValue = (key) => {
        return formValues[key];
    }

    return (<div className="employeeForm">
        <Paper
            title="Add Employee"
            color="blue"
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
                <button className="submitBtn" onClick={onSubmit}>Add</button>
                <button className="submitBtn" onClick={onCancel}>Cancel</button>
            </div>
        </Paper>
    </div>)
}

export default EmployeeForm;