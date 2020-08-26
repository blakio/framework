import React, {
    useEffect,
    useRef,
    createRef,
} from "react";
import "./main.css";

const Table = props => {

    const {
        onClick,
        isSelected,
        individualIds
    } = props;

    return (<div>
        <table>
            <thead>
                <tr>
                    {props.th.map((data, index) => <th key={index}>{props.getHeadData(data)}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.td.map((data, index) => (<tr key={index}>
                    {data.map((d, i) => {
                        const getParam = () => {
                            if(props && props.ids && props.ids[index]) return props.ids[index]
                            if(individualIds && individualIds[index] && individualIds[index][i]) return individualIds[index][i];
                            return null
                        }
                        return (<td key={i} onClick={() => onClick(getParam())} style={props.additionalStyles && props.additionalStyles[index][i] || {}} className={`${isSelected && isSelected(props.ids[index] || individualIds[index][i]) && "selected"}`}>{props.getData(d, individualIds && individualIds[index][i])}</td>)
                    })}
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