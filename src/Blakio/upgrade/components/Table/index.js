import React from "react";
import "./main.css";

const Table = props => {
    return (<div>
        <table>
            <tr>
                {props.th.map(data => <th>{data}</th>)}
            </tr>
            {props.td.map(data => (<tr>
                {data.map(d => <td>{d}</td>)}
            </tr>))}
        </table>
    </div>);
}

export default Table;

// const th = ["Firstname", "Lastname", "Age"];
// const td = [
//     ["Jill", "Smith", "50"],
//     ["Eve", "Jackson", "94"]
// ]