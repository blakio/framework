import React, { useState } from "react";
import "./main.css"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    Paper
} from "../../components";

const EmployeeForm = () => {

    const defaultInputValue = {
        date: Date.now(),
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        emergencyContact: "",
        title: "",
        department: ""
    }

    const [formValues, setFormValues] = useState(defaultInputValue)

    const handleDateChange = dateSelected => {
        setFormValues({
            ...formValues,
            date: dateSelected
        })
    }

    const handleChange = e => {
        let {
            value
        } = e.target;

        const type = e.target.getAttribute("type");

        if((type === "phone" || type === "emergencyContact")){
            if(isNaN(value) || value.length > 10) {
                return;
            }
        }

        value = value.trim()

        const objKey = e.target.getAttribute("type");
        const key = objKey === "employeeEmail" ? "email" : objKey;

        setFormValues({
            ...formValues,
            [key]: value
        })
    }

    const onSubmit = () => {
        console.log({
            ...formValues,
            phone: parseInt(formValues.phone),
            emergencyContact: parseInt(formValues.emergencyContact)
        })
    }

    const onCancel = () => {
        setFormValues(defaultInputValue)
    }

    return (<div className="employeeForm">
        <Paper
            title="Add Employee"
            color="blue"
        >
            <div className="employeeFormContainer">
                <p>First Name</p>
                <input className="employeeInput" placeholder="Enter text" type="firstName" onChange={handleChange} value={formValues.firstName}/>
                <p>Last Name	</p>
                <input className="employeeInput" placeholder="Enter text" type="lastName" onChange={handleChange} value={formValues.lastName}/>
                <p>DOB</p>
                <DatePicker
                    selected={formValues.date}
                    onChange={handleDateChange}
                />
                <p>Phone</p>
                <input className="employeeInput" placeholder="Enter text" type="phone" onChange={handleChange} value={formValues.phone}/>
                <p>Email</p>
                <input className="employeeInput" placeholder="Enter text" type="employeeEmail" onChange={handleChange} value={formValues.email}/>
                <p>Emergency Contact</p>
                <input className="employeeInput" placeholder="Enter text" type="emergencyContact" onChange={handleChange} value={formValues.emergencyContact}/>
                <p>Title</p>
                <input className="employeeInput" placeholder="Enter text" type="title" onChange={handleChange} value={formValues.title}/>
                <p>Department</p>
                <input className="employeeInput" placeholder="Enter text" type="department" onChange={handleChange} value={formValues.department}/>
                <button className="submitBtn" onClick={onSubmit}>Submit</button>
                <button className="submitBtn" onClick={onCancel}>Cancel</button>
            </div>
        </Paper>
    </div>)
}

export default EmployeeForm;