import React from "react";
import "./TimeSheet.css";

const clockedTime = [
    {
        day: "Mon 03.30",
        hours: "7:30",
        selected: true
    },
    {
        day: "Tue 03.31",
        hours: "8:00"
    },
    {
        day: "Wed 04.01",
        hours: "8:00"
    },
    {
        day: "Thu 04.02",
        hours: "0:00"
    },
    {
        day: "Fri 04.03",
        hours: "0:00"
    },
    {
        day: "Sat 04.04",
        hours: "0:00"
    },
    {
        day: "Sun 04.05",
        hours: "0:00"
    }
]

const TimeSheetHead = () => {
    return (<div class="TimeSheetHead">
        hey
    </div>)
}

const TabletWithDoubleText = (props) => {
    const {
        topText,
        bottomText,
        selected
    } = props;
    return (<div class={`TabletWithDoubleText flex ${selected && "selected"}`}>
        <p class="tableTopText flex">{topText}</p>
        <p class="tableBottomText flex">{bottomText}</p>
    </div>)
}

const TimeSheetBody = () => {
    return (<div class="TimeSheetBody flex">
        {clockedTime.map((data, index) => <TabletWithDoubleText
                key={index} topText={data.day}
                bottomText={data.hours}
                selected={data.selected}
            />)}
    </div>)
}

const TimeSheet = () => {
    return (<div class="TimeSheet">
        <TimeSheetHead />
        <TimeSheetBody />
    </div>)
}

export default TimeSheet;