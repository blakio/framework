import React from "react";
import "./main.css";

const SnackBar = props => {
    const {
        text,
        type,
        isNote,
        isTip
    } = props;
    const getText = () => {
        if(isNote) return <><strong>Note: </strong>{text}</>;
        if(isTip) return <><strong>Tip: </strong>{text}</>;
        return text;
    }
    return (<div className={`snackBar ${type}`}>
        <p>{getText()}</p>
    </div>)
}

export default SnackBar;