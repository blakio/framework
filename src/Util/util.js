import moment from "moment";

export default {

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

  getTime: (field, data) => {
    let time = (data[field] ? moment.utc(data[field]).local().format("hh:mm:ssA") : 0);
    return time;
  },

  getHeader: {
    clockInTime: "Clock In",
    clockOutTime: "Clock Out",
    date: "Date",
    endLunch: "Lunch End",
    id: "Id",
    isContractor: "Is Contractor",
    jobNumber: "Job #",
    laborType: "Labor",
    lunchTime: "Lunch Hrs",
    name: "Employee",
    startLunch: "Lunch Start",
    totalHrs: "Hours Worked",
    overTime: "Overtime Hrs"
  },

  getTimeFromString: (time) => {
    if(time === "Invalid date") return "0";
    // const split = time.split(":");
    // return `${split[0] || 0} hr : ${split[1] || 0} min : ${split[2] || 0} sec`;
    return time;
  }

}
