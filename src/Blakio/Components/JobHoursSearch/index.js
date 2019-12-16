import React from "react";
import "./JobHoursSearch.css";

const JobHoursSearch = (props) => {
  return (<div className="JobHoursSearch flex">
    <div>
      <p>{`HOURS: ${props.jobHours} hrs`}</p>
    </div>
    <div className="jobNumbersOptions flex">
      {props.data.map((data, index) => (<div
        key={index}
        onClick={data.onClick}
        className={`TagLabel ${data.isSelected && "isSelected"} ${data.isDisabled && "isDisabled"}`}>
        {data.label}
      </div>))}
    </div>
  </div>)
}

export default JobHoursSearch;
