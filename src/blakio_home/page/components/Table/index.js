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

    const getClassName = (index, i) => {
        let className = "";
        if(isSelected){
            if(isSelected(
                props.ids && props.ids[index]
                || individualIds && individualIds[index] && individualIds[index][i]
            )){
                className = "selected";
            }
        }
        return className;
    }

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
                        return (<td
                            key={i}
                            onClick={() => onClick(getParam())}
                            style={props.additionalStyles && props.additionalStyles[index] && props.additionalStyles[index][i] || {}}
                            className={getClassName(index, i)}>
                                {props.getData(d, individualIds && individualIds[index] && individualIds[index][i])}
                        </td>)
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