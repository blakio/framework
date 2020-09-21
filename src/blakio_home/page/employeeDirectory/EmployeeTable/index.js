import React, {
    useEffect, useState
} from "react";
import "./main.css";

import {
    StateContext
} from "blakio_context/State";

import {
    Paper,
    Table
} from "../../components";

import Types from "blakio_context/Types";
import Util from "blakio_util";

const EmployeeTable = () => {
    const [state, dispatch] = StateContext();

    const [page, setPage] = useState(0);

    const {
        offset,
        limit
    } = state.employeeDirectory;

    useEffect(() => {
        dispatch({
            type: Types.IS_LOADING,
            payload: true
        });
        Util.getEmployees({
            dispatch,
            page: {
                offset,
                limit
            }
        })
    }, [offset, limit]);

    const getTh = () => ([
        "First Name",
        "Last Name",
        // "DOB",
        "Phone",
        "Email",
        // "Emergency Contact",
        "Title",
        // "Department",
    ]);

    const ids = state.employeeDirectory.employees.map(data => data._id);

    const getTd = () => {
        const td = [];
        state.employeeDirectory.employees.forEach(data => td.push([
            data.firstName,
            data.lastName,
            // Util.formatDate(data.dob),
            Util.formatPhoneNumber(`${data.phone}`),
            data.email,
            // Util.formatPhoneNumber(data.emergencyContact),
            data.title,
            // data.department
        ]));
        return td;
    }

    const fields = [
        "firstName",
        "lastName",
        // "dob",
        "phone",
        "email",
        // "emergencyContact",
        "title",
        // "department",
    ];

    const getHeadData = value => value;

    const getData = data => data;

    const isSelected = id => {
        return id === state.employeeDirectory.updateId;
    }

    return (<div className="timeSummary">
        <Paper
            title="Employee Directory"
            color="blue"
            buttons={[
                {
                    onClick: () => {
                        if (page > 0) {
                            const newPage = page - 1;
                            const newOffset = newPage * limit
                            setPage(newPage);
                            dispatch({
                                type: Types.UPDATE_EMPLOYEE_TABLE_OFFSET,
                                payload: newOffset
                            })
                        }
                    },
                    color: "blue",
                    customIcon: "fas fa-angle-left"
                },
                {
                    text: "1 of 1"
                },
                {
                    onClick: () => {
                        const newPage = page + 1;
                        const newOffset = newPage * limit
                        setPage(newPage);
                        dispatch({
                            type: Types.UPDATE_EMPLOYEE_TABLE_OFFSET,
                            payload: newOffset
                        })
                    },
                    color: "blue",
                    customIcon: "fas fa-angle-right"
                }
            ]}
        >
            <Table
                th={getTh()}
                td={getTd()}
                getHeadData={getHeadData}
                getData={getData}
                isSelected={isSelected}
                fields={fields}
                ids={ids}
                onClick={id => dispatch({
                    type: Types.UPDATE_EMPLOYEE,
                    payload: id !== state.employeeDirectory.updateId ? id : null
                })}
            />
        </Paper>
    </div>);
}

export default EmployeeTable;