import moment from "moment";
import util from "./util";

export default {

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

  getLaborType: state => {
    if(state.selectedItems.laborTypes[0]) return state.selectedItems.laborTypes[0].name;
    return state.selectedItems.employees[0].laborType
  },

  getJobNumber: state => {
    if(state.selectedItems.jobNumbers[0]) return state.selectedItems.jobNumbers[0].number;
    return state.selectedItems.employees[0].jobNumber
  },
  formatCSVData: (data) => {
    const csvData = [];
    data.forEach(data => {
      const usedData = util.breakRefAndCopy(data)
      delete usedData.createdAt;
      delete usedData.updatedAt;
      delete usedData.jobTitle;

      usedData.date = moment(data.date).format("MM/DD/YYYY");
      usedData.clockInTime = util.getTime("clockInTime", data);
      usedData.clockOutTime = util.getTime("clockOutTime", data);
      usedData.endLunch = util.getTime("endLunch", data);
      usedData.startLunch = util.getTime("startLunch", data);
      usedData.lunchTime = usedData.lunchTime || "no lunch taken"
      usedData.isContractor = data.isContractor ? "Y" : "N";

      var end  = data.clockOutTime;
      var start = data.clockInTime;
      const difference = moment.utc(moment(end,"DD/MM/YYYY HH:mm:ss").diff(moment(start,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")

      const timeInHours = (time) => {
        const timeArray = time.split(":");
        const hours = parseInt(timeArray[0]);
        const minutes = parseInt(timeArray[1]);
        const seconds = parseInt(timeArray[2]);
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        return totalSeconds / 3600;
      }

      const totalHoursWorked = timeInHours(difference);

      usedData.totalHrs = data.totalHrs && util.getTimeFromString(data.totalHrs);
      usedData.overTime = (totalHoursWorked > 8) ? parseFloat(totalHoursWorked - 8).toFixed(2) : 0;
      usedData.lunchTime = data.lunchTime && util.getTimeFromString(data.lunchTime);

      if(csvData.length === 0){
        const headers = [];
        const headersKeys = Object.keys(usedData);
        headersKeys.forEach(data => {
          const head = util.getHeader[data] || data;
          headers.push(head)
        })
        csvData.push(headers)
      }
      const innerData = [];
      for(let i in usedData){
        innerData.push(usedData[i]);
      }
      csvData.push(innerData);
    })
    return csvData;
  },

  getDefaultLaborType: (isContractor, isTech) => {
    if(isContractor) return "WELDER";
    if(!isTech) return "NONE";
  },

  getDefaultJobNumber: (isContractor, isTech) => {
    if(isContractor) return "OTHER";
    if(!isTech) return "NONE";
  },

}
