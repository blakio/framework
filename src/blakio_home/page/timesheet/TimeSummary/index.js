import React, {
    useEffect,
    useState
} from "react";
import moment from "moment";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import "./main.css";
import {
    Paper,
    Table
} from "../../components";
import Util from "blakio_util";
import Axios from "blakio_axios";
import { StateContext } from "blakio_context/State";
import Types from "blakio_context/Types";

import {
    SnackBar
} from "blakio_home/page/components";

const TimeSummary = () => {
    const [state, dispatch] = StateContext();
    const [offset, setOffset] = useState(null);
    const [tableData, setTableData] = useState({
        th: [],
        td: []
    });
    const [adjustTimeId, setAdjustTimeId] = useState(false);
    const [dateMapper, setDateMapper] = useState({});
    const [dateMapperFormatted, setDateMapperFormatted] = useState({});

    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    const getLocalTime = (date) => {
        const tIndex = date.time.formatted.indexOf("T");
        const mTime = date.time.formatted.slice(tIndex + 1);
        const suffix = mTime.slice(mTime.indexOf("."), mTime.length);
        const militaryTime = mTime.replace(suffix, "");
        return moment(militaryTime, 'HH:mm:ss').format("hh:mm:ss a");
    }

    const setDateIdToTimeStampMapper = (data) => {
        const mapper = {};
        const mapperFormatted = {};
        data.forEach(d => mapper[d.time._id] = d.time.timestamp);
        data.forEach(d => mapperFormatted[d.time._id] = d.time.formatted);
        setDateMapper(mapper);
        setDateMapperFormatted(mapperFormatted);
    }

    const updateTimeTable = () => {
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
            Util.load(dispatch, true);
            Axios.getTimeOverRange(state.timeSheet.clockIn.selectedEmployee._id, query).then(dates => {
                Util.load(dispatch, false);

                setDateIdToTimeStampMapper(dates.data)
                const weekHours = {};
                currentWeek.forEach(day => (weekHours[day] = []));
                dates.data.forEach(date => {
                    const formattedTime = getLocalTime(date);
                    const formattedDate = moment(date.time.formatted).format(Util.dateFormat1);
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
            }).catch(err => {
                Util.load(dispatch, true);
                Util.showError("Error", "error loading page")
            });
        }
    }

    useEffect(() => {
        updateTimeTable()
        // note: this will reload twice because of state.timeSheet.clockIn.selectedEmployeeIsClockedIn
    }, [offset, state.timeSheet.clockIn.selectedEmployeeIsClockedIn, state.timeSheet.clockIn.selectedEmployee]);

    const isSelected = id => (adjustTimeId && id === adjustTimeId);

    const handleDateChange = data => {
        const offsetInMin = moment().utcOffset();
        const formatted = moment(data._d).add(offsetInMin, "minutes").toISOString();

        const max = moment(maxDate).add(offsetInMin * -1, "minutes");
        const min = moment(minDate).add(offsetInMin * -1, "minutes");
        const isBefore = !maxDate ? true : moment(data._d).isBefore(max);
        const isAfter = !minDate ? true : moment(data._d).isAfter(min);
        const isBeforeCurrentTime = moment().isAfter(data._d);
        if((isBeforeCurrentTime || (isBefore && isAfter)) && ((isBefore && isAfter) || (!minDate && !maxDate))){
            Axios.updateClockinTime({
                id: adjustTimeId,
                formatted,
                timestamp: moment(formatted).add(offsetInMin, "minutes").unix()
            }).then(data => {
                updateTimeTable();
                Util.showSuccess("Sucess", `Sucessfully changed time`)
            }).catch(err => Util.showError("Error", "error loading time table"))
        } else {
            if(!isBeforeCurrentTime){
                Util.showError("Time error", `Time must be before ${moment().add(offsetInMin * -1, "minutes").format("MMMM Do YYYY, h:mm:ss a")}`)
            } else if(!minDate){
                Util.showError("Time error", `Time must be before ${moment(maxDate).add(offsetInMin * -1, "minutes").format("MMMM Do YYYY, h:mm:ss a")}`)
            } else if(!maxDate){
                Util.showError("Time error", `Time must be after ${moment(minDate).add(offsetInMin * -1, "minutes").format("MMMM Do YYYY, h:mm:ss a")}`)
            } else {
                Util.showError("Time error", `Time must be between ${moment(minDate).add(offsetInMin * -1, "minutes").format("MMMM Do YYYY, h:mm:ss a")} and ${moment(maxDate).add(offsetInMin * -1, "minutes").format("MMMM Do YYYY, h:mm:ss a")}`)
            }
        }
    }

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
            <SnackBar
                text="Selected time from table to edit"
                type="warning"
                isNote
            />
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
                getData={(value, id) => {
                    if(!value) return "";

                    if(id === adjustTimeId && !adjustTimeId.includes("Total")){
                        const offsetInMin = moment().utcOffset() * -1;
                        const defaultValue = moment(dateMapperFormatted[id]).add(offsetInMin, "minutes");
                        return (<div>
                            <TimePicker
                                showSecond={true}
                                use12Hours={true}
                                defaultValue={defaultValue}
                                onChange={handleDateChange}
                                addon={() => {}}
                                open={isSelected}
                            />
                        </div>)
                    }

                    if(value.includes("Total")){
                        return <span>{value}</span>
                    } else if(value.includes("I")){
                        return <span><i className="fas fa-arrow-right greenText"></i> {value.replace("I :", "")}</span>
                    } else {
                        return <span><i className="fas fa-arrow-left redText"></i> {value.replace("O :", "")}</span>
                    }
                }}
                onClick={async (timeId) => {
                    const employeeId = state.timeSheet.clockIn.selectedEmployee._id;

                    const timestamp = dateMapper[timeId];
                    if(timestamp){
                        const timeBoundaries = await Axios.findTimeBoundaries(employeeId, timestamp);
                        setMinDate(timeBoundaries.prev && new Date(timeBoundaries.prev))
                        setMaxDate(timeBoundaries.next && new Date(timeBoundaries.next))
                    }
                    setAdjustTimeId(timeId);
                }}
            ></Table>
        </Paper>
    </div>);
}

export default TimeSummary;