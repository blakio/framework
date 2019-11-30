import moment from "moment";
import util from "./util";

export default {

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

  hasSelectedEmployees: (selectedItems) => selectedItems["employees"].length,
  hasSelectedLaborTypes: (selectedItems) => selectedItems["laborTypes"].length,
  hasSelectedJobNumbers: (selectedItems) => selectedItems["jobNumbers"].length,

  reorderData: (data, isAdminMode) => {
    let reorderData = JSON.parse(JSON.stringify(data));
    if(reorderData.length){
      const activeItems = reorderData.filter(data => data.isActive);
      const notActiveItems = reorderData.filter(data => !data.isActive);
      if(isAdminMode){
        reorderData = activeItems.concat(notActiveItems);
      } else {
        reorderData = activeItems;
      }
    }
    return reorderData;
  },

  getActiveTimeButtomStatus: (text, selectedItems) => {
    const selectedEmployee = selectedItems.employees[0];
    const selectedJob = selectedItems.jobNumbers[0];
    const selectedLaborType = selectedItems.laborTypes[0];
    if(!selectedEmployee) return false;

    const buttonActive = (isTech, isContractor, isOffice, selectedJob, selectedLaborType) => {
      if(isTech && selectedJob && selectedLaborType){
        return true;
      } else if(isContractor){
        return true;
      } else if(isOffice && selectedJob){
        return true;
      }
    }
    const {
      clockInTime,
      clockOutTime,
      startLunch,
      endLunch,
      isTech,
      isContractor
    } = selectedEmployee;
    const isOffice = !isTech && !isContractor;
    if(text === "CLOCK IN" && !clockInTime){
      return buttonActive(isTech, isContractor, isOffice, selectedJob, selectedLaborType)
    } else if(text === "TO LUNCH" && clockInTime && !startLunch){
      return buttonActive(isTech, isContractor, isOffice, selectedJob, selectedLaborType)
    } else if(text === "FROM LUNCH" && clockInTime && startLunch && !endLunch){
      return buttonActive(isTech, isContractor, isOffice, selectedJob, selectedLaborType)
    } else if(text === "CLOCK OUT" && clockInTime){
      return buttonActive(isTech, isContractor, isOffice, selectedJob, selectedLaborType)
    }
    return false;
  },

  getObjFromArray: (value, key, arr) => {
    let obj;
    arr.forEach(data => {
      if(data[key] === value){
        obj = data;
      }
    })
    return obj;
  },

  filterFieldFromArrObj: (arrObj, field) => {
    const arr = [];
    arrObj.forEach(data => arr.push(data[field]));
    return arr;
  },

  getEmployees: (data, isAdminMode) => {
    let employees;
    if(!isAdminMode){
      employees = data.filter(data => data.isActive);
    } else {
      const active = data.filter(data => data.isActive);
      const notActive = data.filter(data => !data.isActive);
      employees = active.concat(notActive);
    }
    return employees;
  },

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
