import React from "react";
import "./main.css";

const TextWithSubText = props => {

    const {
        bigText,
        smallText,
    } = props;
    
    return (<div>
        <p className="bigText">{bigText}</p>
        <p className="smallText">{smallText}</p>
    </div>);
}

export default TextWithSubText;