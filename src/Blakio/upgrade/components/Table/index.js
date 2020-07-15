import React, {
    useRef,
    createRef,
} from "react";
import "./main.css";

const Table = props => {
    const elementsRef = useRef(props.td.map(data => data.map(d => createRef())));
    props.setRefs(elementsRef);

    return (<div>
        <table>
            <thead>
                <tr>
                    {props.th.map((data, index) => <th key={index}>{data}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.td.map((data, index) => (<tr key={index}>
                    {data.map((d, i) => <td key={i}>{props.getData(d, props.fields[i], props.ids[index], elementsRef.current[index][i])}</td>)}
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