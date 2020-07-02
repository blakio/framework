import React, {
    useEffect,
    useState
} from "react";
import "./main.css";

const TextWithSubText = props => {

    const [inputRef, setInputRef] = useState(null);

    useEffect(() => {
        inputRef && inputRef.focus();
    }, [inputRef]);

    const bigText = props.isInputField ? (<input
        className={`bigTextInput ${props.textColor}`}
        placeholder={props.bigText}
        ref={e => setInputRef(e)}
    />) : (<p className="bigText">{props.bigText}</p>)

    return (<div>
        {bigText}
        <p className="smallText">{props.smallText}</p>
    </div>);
}

export default TextWithSubText;