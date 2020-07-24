import React, {
    useEffect,
    useState
} from "react";
import "./main.css";

import moment from "moment";

import {
    Paper,
    Table
} from "../../components";

import Util from "../../../../Util";
import Axios from "../../../../Axios";
import { StateContext } from "Context/State";

const TimeSummary = () => {
    const [state, dispatch] = StateContext();
    const [offset, setOffset] = useState(null);
    const [tableData, setTableData] = useState({
        th: [],
        td: []
    });

    useEffect(() => {
        const epochWeek = Util.getCurrentWeekInEpoch(offset);
        const range = [epochWeek[0], epochWeek[epochWeek.length - 1]];
        const query = [
            { "$unwind": "$time" },
            { "$match": { "time.timestamp": { "$gte": range[0], "$lte": range[1] } } }
        ];
        const currentWeek = Util.getCurrentWeek(offset);
        const currentWeekWithYear = Util.getCurrentWeekWithYear(offset);
        const employeeId = state.timeSheet.clockIn.selectedEmployee._id;
        const dayHrs = [];
        const getHoursForDays = () => {
            const { length } = dayHrs;
            if(length !== 7){
                Axios.getDayTotalHours(employeeId, currentWeekWithYear[length]).then(data => {
                    dayHrs.push(`Total Hrs: ${data.data.hours}`);
                    getHoursForDays();
                })
            } else {
                getTimeBreakdown()
            }
        };
        getHoursForDays();
        
        const getTimeBreakdown = () => {
            Axios.getTimeOverRange(state.timeSheet.clockIn.selectedEmployee._id, query).then(dates => {            
                const weekHours = {};
                currentWeek.forEach(day => (weekHours[day] = []));
                dates.data.forEach(date => {
                    const formattedTime = moment(date.time.formatted).format("hh:mm:ss a");
                    const formattedDate = moment(date.time.formatted).format("MMMM Do, ddd");
                    weekHours[formattedDate].push({
                        time: formattedTime,
                        clockIn: date.time.hasClockedIn
                    });
                });
                let highestIndex = 0;
                for(let i in weekHours){
                    if(weekHours[i].length > highestIndex){
                        highestIndex = weekHours[i].length;
                    }
                }
                for(let i in weekHours){
                    weekHours[i].length = highestIndex;
                }
                const td = [];
                for(let i = 0; i < highestIndex; i++){
                    td.push([]);
                }
    
                let weekIndex = 0;
                for(let key in weekHours){
                    for(let j = 0; j < weekHours[key].length; j++){
                        if(weekHours[key][j]){
                            td[j][weekIndex] = `${weekHours[key][j].clockIn ? "I": "O"} : ${weekHours[key][j].time}`;
                        } else {
                            td[j][weekIndex] = "";
                        }
                    }
                    weekIndex++;
                }
                td.push(dayHrs);
                setTableData({
                    th: currentWeek,
                    td
                });
            });
        }
        // note: this will reload twice because of state.timeSheet.clockIn.selectedEmployeeIsClockedIn
    }, [offset, state.timeSheet.clockIn.selectedEmployeeIsClockedIn]);

    return (<div className="timeSummary">
        <Paper
            title="Time Summary"
            color="blue"
            buttons={[
                {
                    onClick: () => setOffset(offset - 1),
                    color: "blue",
                    customIcon: "fas fa-angle-left"
                },
                {
                    onClick: () => setOffset(offset + 1),
                    color: "blue",
                    customIcon: "fas fa-angle-right"
                },
                {
                    color: "blue",
                    customIcon: "fas fa-file-download",
                    onClick: () => {},
                    csvData: [tableData.th, ...tableData.td],
                    csvFileName: `${state.timeSheet.clockIn.selectedEmployee.firstName} ${state.timeSheet.clockIn.selectedEmployee.lastName}'s timesheet`
                }
            ]}
        >
            <Table
                th={tableData.th}
                td={tableData.td}
                setRefs={() => {}}
                getTd={() => tableData.td}
                getTh={() => tableData.th}
                fields={[]}
                ids={[]}
                getData={value => {
                    if(!value) return "";
                    if(value.includes("Total")){
                        return <span>{value}</span>
                    } else if(value.includes("I")){
                        return <span><i className="fas fa-arrow-right greenText"></i> {value.replace("I :", "")}</span>
                    } else {
                        return <span><i className="fas fa-arrow-left redText"></i> {value.replace("O :", "")}</span>
                    }
                }}
            ></Table>
        </Paper>
    </div>);
}

export default TimeSummary;