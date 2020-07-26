import React from "react";
import "./main.css"

import {
    Paper
} from "../../components";

const EmployeeForm = () => {
    return (<div className="employeeForm">
        <Paper
            title="Add Employee"
            color="blue"
        >
            <div className="employeeFormContainer">
                <p>First Name</p>
                <input className="employeeInput" placeholder="Enter text" />
                <p>Last Name	</p>
                <input className="employeeInput" placeholder="Enter text" />
                <p>DOB</p>
                <input className="employeeInput" placeholder="Enter text" />
                <p>Phone</p>
                <input className="employeeInput" placeholder="Enter text" />
                <p>Email</p>
                <input className="employeeInput" placeholder="Enter text" />
                <p>Emergency Contact</p>
                <input className="employeeInput" placeholder="Enter text" />
                <p>Title</p>
                <input className="employeeInput" placeholder="Enter text" />
                <p>Department</p>
                <input className="employeeInput" placeholder="Enter text" />
                <button className="submitBtn">Submit</button>
                <button className="submitBtn">Cancel</button>
            </div>
        </Paper>
    </div>)
}

export default EmployeeForm;