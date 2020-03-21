import moment from "moment";
import util from "./util";

export default {

  adjustSideBarData: (appData, context, Types, customFn) => {
    const {
      dispatch,
      sideBarOption,
      sideBarChildOption
    } = context;

    // map data to sidebar buttons
    appData.sideBar.forEach(data => {
      const isSelected = data.id === sideBarOption;
      data.isOpen = isSelected;
      data.onClick = () => {
        dispatch({
          type: Types.SET_SIDE_BAR_OPTION,
          payload: isSelected ? null : data.id
        })
        if(data.fn) customFn[data.fn](data)
      }
      data.icon = isSelected ? "fas fa-dot-circle" : "far fa-dot-circle";
      data.data.forEach(list => {
        const isChildSelected = sideBarChildOption === list.id;
        if(list.types.includes("list") && list.types.includes("click")){
          list.isOpen = isChildSelected
          list.onClick = () => {
            dispatch({
              type: Types.SET_SIDE_BAR_CHILD_OPTION,
              payload: isChildSelected ? null : list.id
            })
            dispatch({
              type: list.clickType,
              payload: list.id
            })
            if(list.fn) customFn[list.fn](list)
          }
        } else if(list.types.includes("list")){
          list.isOpen = sideBarChildOption === list.head;
          list.onClick = () => {
            dispatch({
              type: Types.SET_SIDE_BAR_CHILD_OPTION,
              payload: isChildSelected ? null : list.id
            })
            if(list.fn) customFn[list.fn](list)
          } 
        }
        list.data.forEach(childList => {
          childList.onClick = () => customFn[childList.fn](childList);
        })
      })
    });
  },

  showComponent: (data, context) => {
    const { conditions } = data;
    const { sideBarChildOption, sideBarOption } = context;
    return conditions.includes(sideBarChildOption) || conditions.includes(sideBarOption);
  },








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
      clockIn,
      clockOutTime,
      toLunch,
      fromLunch,
      isTech,
      isContractor
    } = selectedEmployee;
    const isOffice = !isTech && !isContractor;
    if(text === "CLOCK IN" && !clockIn){
      return buttonActive(isTech, isContractor, isOffice, selectedJob, selectedLaborType)
    } else if(text === "TO LUNCH" && clockIn && !toLunch){
      return buttonActive(isTech, isContractor, isOffice, selectedJob, selectedLaborType)
    } else if(text === "FROM LUNCH" && clockIn && toLunch && !fromLunch){
      return buttonActive(isTech, isContractor, isOffice, selectedJob, selectedLaborType)
    } else if(text === "CLOCK OUT" && clockIn){
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

      usedData.date = moment(data.date).format("MM/DD/YYYY");
      usedData.clockIn = util.getTime("clockIn", data);
      usedData.clockOut = util.getTime("clockOut", data);
      usedData.endLunch = util.getTime("fromLunch", data) || "none";
      usedData.startLunch = util.getTime("toLunch", data) || "none";
      usedData.lunchTime = usedData.lunchTime || "none";
      usedData.isContractor = data.isContractor ? "Y" : "N";
      usedData.isTech = data.isTech ? "Y" : "N";

      usedData.totalHrs = data.totalTime.toFixed(2);
      usedData.overTime = data.overTime.toFixed(2);

      delete usedData.__v;
      delete usedData._id;
      delete usedData.totalTime;
      delete usedData.startLunch;
      delete usedData.endLunch;

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
