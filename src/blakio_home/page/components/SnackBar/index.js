import React from "react";
import "./main.css";

const SnackBar = props => {
    const {
        text,
        type,
        isNote
    } = props;
    return (<div className={`snackBar ${type}`}>
        <p>{isNote && <strong>Note: </strong>}{text}</p>
    </div>)
}

export default SnackBar;