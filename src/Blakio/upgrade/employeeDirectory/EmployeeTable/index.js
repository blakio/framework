import React from "react";
import "./main.css";

import {
    StateContext
} from "Context/State";

import {
    Paper,
    Table
} from "../../components";

const EmployeeTable = () => {
    const [state, dispatch] = StateContext();

    const getTh = () => ([
        "First Name",
        "Last Name",
        "DOB",
        "Phone",
        "Email",
        "Emergency Contact",
        "Title",
        "Department",
    ])

    const getTd = () => {
        const td = []
        state.employeeDirectory.employees.forEach(data => td.push([
            data.firstName,
            data.lastName,
            data.dob,
            data.phone,
            data.email,
            data.emergencyContact,
            data.title,
            data.department
        ]));
        return td;
    }


    return (<div className="timeSummary">
        <Paper
            title="Employee Directory"
            color="blue"
        >
            <Table
                th={getTh()}
                td={getTd()}
            />
        </Paper>
    </div>);
}

export default EmployeeTable;