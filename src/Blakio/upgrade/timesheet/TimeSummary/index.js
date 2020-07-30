import React, {
    useEffect,
    useState
} from "react";
import "./main.css";

import moment from "moment";

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    Paper,
    Table
} from "../../components";

import Util from "../../../../Util";
import Axios from "../../../../Axios";
import { StateContext } from "Context/State";
import Types from "../../../../Context/Types";

const TimeSummary = () => {
    const [state, dispatch] = StateContext();
    const [offset, setOffset] = useState(null);
    const [tableData, setTableData] = useState({
        th: [],
        td: []
    });
    const [adjustTimeId, setAdjustTimeId] = useState(false);

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
        const dayHrsNumbers = [];
        const getHoursForDays = () => {
            const { length } = dayHrs;
            if(length !== 7){
                Axios.getDayTotalHours(employeeId, currentWeekWithYear[length]).then(data => {
                    dayHrs.push(`Total Hrs: ${data.data.hours}`);
                    dayHrsNumbers.push(parseFloat(data.data.hours));
                    getHoursForDays();
                })
            } else {
                const totalHours = dayHrsNumbers.reduce((a, b) => a + b, 0)
                dispatch({
                    type: Types.SET_TOTAL_HOURS,
                    payload: totalHours
                })
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
                    if(weekHours[formattedDate]){
                        weekHours[formattedDate].push({
                            time: formattedTime,
                            clockIn: date.time.hasClockedIn,
                            employeeId: date._id,
                            timeId: date.time._id
                        });
                    }
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
                const individualIds = [];
                for(let i = 0; i < highestIndex; i++){
                    td.push([]);
                    individualIds.push([]);
                }
    
                let weekIndex = 0;
                for(let key in weekHours){
                    for(let j = 0; j < weekHours[key].length; j++){
                        if(weekHours[key][j]){
                            td[j][weekIndex] = `${weekHours[key][j].clockIn ? "I": "O"} : ${weekHours[key][j].time}`;
                            individualIds[j][weekIndex] = weekHours[key][j].timeId;
                        } else {
                            individualIds[j][weekIndex] = null;
                            td[j][weekIndex] = "";
                        }
                    }
                    weekIndex++;
                }
                td.push(dayHrs);
                individualIds.push(dayHrs);
                setTableData({
                    th: currentWeek,
                    td,
                    individualIds
                });

                const weekNumber = dates.data.length ? moment(dates.data[0].time.formatted).week() : null;
                dispatch({
                    type: Types.SET_WEEK_NUMBER,
                    payload: weekNumber
                })
            });
        }
        // note: this will reload twice because of state.timeSheet.clockIn.selectedEmployeeIsClockedIn
    }, [offset, state.timeSheet.clockIn.selectedEmployeeIsClockedIn]);

    const isSelected = id => id === adjustTimeId;

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
                individualIds={tableData.individualIds}
                isSelected={isSelected}
                setRefs={() => {}}
                getTd={() => tableData.td}
                getTh={() => tableData.th}
                fields={[]}
                ids={[]}
                getHeadData={value => {
                    return value;
                }}
                getData={value => {
                    if(!value) return "";

                    // return <DatePicker
                    //     selected={Date.now()}
                    //     onChange={handleDateChange}
                    //     showTimeSelect
                    //     timeIntervals={5}
                    //     minDate={new Date()}
                    //     maxDate={addMonths(new Date(), 5)}
                    //     showDisabledMonthNavigation
                    // />

                    if(value.includes("Total")){
                        return <span>{value}</span>
                    } else if(value.includes("I")){
                        return <span><i className="fas fa-arrow-right greenText"></i> {value.replace("I :", "")}</span>
                    } else {
                        return <span><i className="fas fa-arrow-left redText"></i> {value.replace("O :", "")}</span>
                    }
                }}
                onClick={id => {
                    if(!id) return;
                    id === adjustTimeId ? setAdjustTimeId(false) : setAdjustTimeId(id);
                }}
            ></Table>
            {/* {adjustTimeId ? <div className="timesheetReplacementTime">
                <p className="timeReplacementText">Enter a replacement time:</p>
                <TimePicker
                    showSecond={false}
                    use12Hours={true}
                    defaultValue={moment()}
                />
                <div className="timeSelectBox">
                    <button>Submit</button>
                    <button>Cancel</button>
                </div>
            </div> : <div></div>} */}
        </Paper>
    </div>);
}

export default TimeSummary;