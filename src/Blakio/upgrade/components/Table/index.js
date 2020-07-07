import React from "react";
import "./main.css";

const Table = props => {
    return (<div>
        <table>
            <thead>
                <tr>
                    {props.th.map((data, index) => <th key={index}>{data}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.td.map(data => (<tr>
                    {data.map((d, i) => <td key={i}>{d}</td>)}
                </tr>))}
            </tbody>
        </table>
    </div>);
}

export default Table;

// const th = ["Firstname", "Lastname", "Age"];
// const td = [
//     ["Jill", "Smith", "50"],
//     ["Eve", "Jackson", "94"]
// ]