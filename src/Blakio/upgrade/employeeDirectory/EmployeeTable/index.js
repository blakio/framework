import React from "react";
import "./main.css";

import {
    StateContext
} from "Context/State";

import {
    Paper,
    Table
} from "../../components";

import Types from "../../../../Context/Types";
import Util from "../../../../Util";

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
    ]);

    const ids = state.employeeDirectory.employees.map(data => data._id);

    const getTd = () => {
        const td = []
        state.employeeDirectory.employees.forEach(data => td.push([
            data.firstName,
            data.lastName,
            Util.formatDate(data.dob),
            Util.formatPhoneNumber(`${data.phone}`),
            data.email,
            Util.formatPhoneNumber(data.emergencyContact),
            data.title,
            data.department
        ]));
        return td;
    }

    const fields = [
        "firstName",
        "lastName",
        "dob",
        "phone",
        "email",
        "emergencyContact",
        "title",
        "department",
    ];

    const getInputType = (field) => {
        return field === "dob" ? "date" : "";
    }

    const getHeadData = value => value;

    const getData = (data, field, id, ref) => {
        return state.employeeDirectory.isEditing ? <input id={id} field={field} type={getInputType(field)} className="tableInput" placeholder={data} ref={ref} /> : data;
    }

    let refs;
    const setRefs = (inputRefs) => {
        refs = inputRefs
    }

    const getChanges = (ref) => {
        const changes = {}
        ref.current.forEach(data => {
            data.forEach(d => {
                const value = d.current.value.trim()
                if(value.length){
                    const {
                        id,
                        field
                    } = d.current.attributes;
                    if(changes[id.value]){
                        changes[id.value].push({
                            field: field.value,
                            value
                        })
                    } else {
                        changes[id.value] = [{
                            field: field.value,
                            value
                        }]
                    }
                }
            })
        })
        return changes;
    }

    return (<div className="timeSummary">
        <Paper
            title="Employee Directory"
            color="blue"
            // buttons={ !state.employeeDirectory.isEditing ? 
            //     [{
            //         type: "edit",
            //         color: "blue",
            //         onClick: () => {
            //             dispatch({
            //                 type: Types.TOGGLE_EMPLOYEE_EDITING_STATUS
            //             })
            //         }
            //     }] : [{
            //         type: "cancel",
            //         color: "blue",
            //         onClick: () => {
            //             dispatch({
            //                 type: Types.TOGGLE_EMPLOYEE_EDITING_STATUS
            //             })
            //         }
            //     },
            //     {
            //         type: "submit",
            //         color: "blue",
            //         onClick: () => {
            //             const changes = getChanges(refs)
            //             console.log(changes)
            //         }
            //     }]
            // }
        >
            <Table
                th={getTh()}
                td={getTd()}
                getHeadData={getHeadData}
                getData={getData}
                fields={fields}
                ids={ids}
                setRefs={setRefs}
                onClick={() => {}}
            />
        </Paper>
    </div>);
}

export default EmployeeTable;