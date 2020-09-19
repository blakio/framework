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
        individualIds,
        ids,
        additionalStyles,
        getHeadData,
        getData,
        getStyle,
        getHeadStyle,
        inputfilters
    } = props;

    const usedHead = props.th || [];
    const usedData = props.td || [[]];
    const usedOnClick = onClick || (() => {});

    const getClassName = (index, i) => {
        let className = "";
        if(isSelected){
            if(isSelected(
                ids && ids[index]
                || individualIds && individualIds[index] && individualIds[index][i]
            )){
                className = "selected";
            }
        }
        return className;
    }

    return (<div>
        {inputfilters ? inputfilters.map((filter, index) => (<div key={index} className="employeeFormContainer">
            <p>{filter.headerText}</p>
            <input className="employeeInput" placeholder={filter.placeholder} type={filter.type} onChange={filter.onChange} value={filter.value} maxlength={filter.maxlength}/>
            <button className="submitBtn" onClick={filter.onSubmit}>Submit</button>
        </div>)) : <></>}
        <table>
            <thead>
                <tr>
                    {usedHead.map((data, index) => <th
                        key={index}
                        style={getHeadStyle && getHeadStyle(index) || {}}
                    >{getHeadData(data)}</th>)}
                </tr>
            </thead>
            <tbody>
                {usedData.map((data, index) => (<tr key={index}>
                    {data.map((d, i) => {
                        const getParam = () => {
                            if(props && ids && ids[index]) return ids[index]
                            if(individualIds && individualIds[index] && individualIds[index][i]) return individualIds[index][i];
                            return null
                        }
                        return (<td
                            key={i}
                            onClick={() => usedOnClick(getParam())}
                            style={(getStyle && getStyle(i)) || (additionalStyles && additionalStyles[index] && additionalStyles[index][i] || {})}
                            className={getClassName(index, i)}>
                                <p>{getData(d, individualIds && individualIds[index] && individualIds[index][i])}</p>
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