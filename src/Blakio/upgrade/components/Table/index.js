import React, {
    useEffect,
    useRef,
    createRef,
} from "react";
import "./main.css";

const Table = props => {

    const {
        onClick,
        isSelected
    } = props;

    return (<div>
        <table>
            <thead>
                <tr>
                    {props.th.map((data, index) => <th key={index}>{props.getHeadData(data)}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.td.map((data, index) => (<tr key={index} class={`${isSelected(props.ids[index]) && "selected"}`}>
                    {data.map((d, i) => <td key={i} onClick={() => onClick(props.ids[index])}>{props.getData(d)}</td>)}
                </tr>))}
            </tbody>
        </table>
    </div>);
}

export default Table;

// getData = (data) => data
// const th = ["Firstname", "Lastname", "Age"];
// const td = [
//     ["Jill", "Smith", "50"],
//     ["Eve", "Jackson", "94"]
// ]