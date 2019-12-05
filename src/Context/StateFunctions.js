import Axios from "../Axios";
import initialState from "./InitialState";

import moment from "moment";

import Util from "../Util";

export default {

  // SET
  setSelectedItems: (payload, state) => ({ ...state, selectedItems: payload }),
  setEmployees: (payload, state) =>  ({ ...state, employees: payload }),
  setLaborTypes: (payload, state) => ({ ...state, laborTypes: payload }),
  setJobNumbers: (payload, state) => ({ ...state, jobNumbers: payload }),
  setSelectedLaborTypes: (payload, state) => ({ ...state, selectedItems: { ...state.selectedItems, laborTypes: payload } }),
  setSelectedJobNumbers: (payload, state) => ({ ...state, selectedItems: { ...state.selectedItems, jobNumbers: payload } }),
  setSelectedEmployees: (payload, state) => ({ ...state, selectedItems: { ...state.selectedItems, employees: payload } }),

  // CREATE
  createEmployee: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    const { employees } = currentState;
    employees.push({
      id: (employees.length + 1),
      ...payload
    })
    return {
      ...state,
      employees
    };
  },
  createLaborType: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    const { laborTypes } = currentState;
    if(laborTypes.indexOf(payload) === -1) laborTypes.push(payload.toUpperCase())
    return {
      ...state,
      laborTypes
    };
  },
  createJobNumber: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    const { jobNumbers } = currentState;
    if(jobNumbers.indexOf(payload) === -1) jobNumbers.push(payload.toUpperCase())
    return {
      ...state,
      jobNumbers
    };
  },
  deleteEmployee: (payload, state) => {
    if(state.selectedItems.employees.length){
      Axios.delete(`employees/${state.selectedItems.employees[0]._id}`, null, payload.fn)
    }
    return state;
  },
  deleteJobNumber: (payload, state) => {
    if(state.selectedItems.jobNumbers.length){
      Axios.delete(`jobNumbers/${state.selectedItems.jobNumbers[0]._id}`, null, payload.fn)
    }
    return state;
  },
  deleteLaborType: (payload, state) => {
    if(state.selectedItems.laborTypes.length){
      Axios.delete(`laborTypes/${state.selectedItems.laborTypes[0]._id}`, null, payload.fn)
    }
    return state
  },

  // OTHER
  clockIn: (payload, state) => {
    const employeesId = state.selectedItems.employees[0]._id;
    const isContractor = state.selectedItems.employees[0].isContractor;
    const isTech = state.selectedItems.employees[0].isTech;
    const laborType = state.selectedItems.laborTypes[0] ? state.selectedItems.laborTypes[0].name : Util.getDefaultLaborType(isContractor, isTech);
    const jobNumber = state.selectedItems.jobNumbers[0] ? state.selectedItems.jobNumbers[0].number : Util.getDefaultJobNumber(isContractor, isTech);
    Axios.clockIn(employeesId, {
      laborType,
      jobNumber
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  clockOut: (payload, state) => {
    const employeesId = state.selectedItems.employees[0]._id;
    const isContractor = state.selectedItems.employees[0].isContractor;
    const isTech = state.selectedItems.employees[0].isTech;
    const laborType = state.selectedItems.laborTypes[0] ? state.selectedItems.laborTypes[0].name : Util.getDefaultLaborType(isContractor, isTech);
    const jobNumber = state.selectedItems.jobNumbers[0] ? state.selectedItems.jobNumbers[0].number : Util.getDefaultJobNumber(isContractor, isTech);
    Axios.clockOut(employeesId, {
      ...state.selectedItems.employees[0],
      laborType,
      jobNumber,
      date: moment(new Date).format("YYYY/MM/DD")
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  toLunch: (payload, state) => {
    const employeesId = state.selectedItems.employees[0]._id;
    const isContractor = state.selectedItems.employees[0].isContractor;
    const isTech = state.selectedItems.employees[0].isTech;
    const laborType = state.selectedItems.laborTypes[0] ? state.selectedItems.laborTypes[0].name : Util.getDefaultLaborType(isContractor, isTech);
    const jobNumber = state.selectedItems.jobNumbers[0] ? state.selectedItems.jobNumbers[0].number : Util.getDefaultJobNumber(isContractor, isTech);
    Axios.startLunch(employeesId, {
      laborType,
      jobNumber,
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  fromLunch: (payload, state) => {
    const employeesId = state.selectedItems.employees[0]._id;
    const isContractor = state.selectedItems.employees[0].isContractor;
    const isTech = state.selectedItems.employees[0].isTech;
    const laborType = state.selectedItems.laborTypes[0] ? state.selectedItems.laborTypes[0].name : Util.getDefaultLaborType(isContractor, isTech);
    const jobNumber = state.selectedItems.jobNumbers[0] ? state.selectedItems.jobNumbers[0].number : Util.getDefaultJobNumber(isContractor, isTech);
    Axios.endLunch(employeesId, {
      laborType,
      jobNumber,
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  bulkDeactivate: (payload, state) => {
    const map = {
      employees: "employees",
      laborTypes: "labortypes",
      jobNumbers: "jobs"
    }
    for(let i in state.selectedItems){
      if(state.selectedItems[i].length){
        state.selectedItems[i].forEach(data => Axios.put(`${map[i]}/${data._id}`, { isActive: false }, payload.fn))
      }
    }
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  bulkActivate: (payload, state) => {
    const map = {
      employees: "employees",
      laborTypes: "labortypes",
      jobNumbers: "jobs"
    }
    for(let i in state.selectedItems){
      if(state.selectedItems[i].length){
        state.selectedItems[i].forEach(data => Axios.put(`${map[i]}/${data._id}`, { isActive: true }, payload.fn))
      }
    }
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    };
  },
  updateEmployee: (payload, state) => {
    const {
      id,
      name,
      jobTitle,
      isContractor,
      isTech,
      travelTime,
      fn,
      warning
    } = payload;
    Axios.put(`employees/${id}`, {
      name,
      jobTitle,
      isContractor,
      isTech,
      travelTime
    }, data => fn())
    return {
      ...state,
      selectedItems: {
        ...state.selectedItems,
        employees: []
      }
    };
  },
  toggleAdminMode: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isAdminMode = !currentState.isAdminMode;
    return {
      ...state,
      isAdminMode: currentState.isAdminMode,
      clickedTypes: [],
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      },
      isContractor: false,
      isSideBarOpen: false
    };
  },
  openMessage: (payload, state) => {
    const newMessage = Util.breakRefAndCopy(state.message);
    newMessage[payload.type].status = true;
    newMessage[payload.type].message = payload.message;
    return {
      ...state,
      message: newMessage
    }
  },
  closeMessage: (payload, state) => {
    const newMessage = Util.breakRefAndCopy(state.message);
    newMessage[payload].status = false;
    newMessage[payload].message = "";
    return {
      ...state,
      message: newMessage
    }
  },
  toggleDownloadScreen: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isDownloadScreen = payload;
    return {
      ...state,
      isDownloadScreen: currentState.isDownloadScreen
    }
  },
  toggleIsContractor: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isContractor = payload;
    return {
      ...state,
      isContractor: currentState.isContractor
    }
  },
  toggleIsTech: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isTech = payload;
    return {
      ...state,
      isTech: currentState.isTech
    }
  },
  clearCSVData: (payload, state) => {
    return {
      ...state,
      csvData: {
        data: [],
        startDate: "",
        endDate: ""
      }
    }
  },
  getCSVData: (payload, state) => {
    Axios.getCsvData(payload);
    return state
  },
  setCSVData: (payload, state) => {
    const { data, startDate, endDate } = payload;
    return {
      ...state,
      csvData: {
        data: Util.formatCSVData(data),
        startDate,
        endDate
      }
    }
  },
  logIn: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    const isAdminLoggedIn = payload.data.isAdmin;
    window.localStorage.setItem('data', JSON.stringify(payload.data));
    return {
      ...state,
      token: JSON.stringify(payload.data),
      isAdminLoggedIn
    }
  },
  openSideBar: (payload, state) => ({ ...state, isSideBarOpen: payload }),
  isLoading: (payload, state) => ({ ...state, isLoading: payload }),
  openedList: (payload, state) => {
    return {
      ...state,
      openList: (state.openList !== payload) ? payload : ""
    }
  },
  toggleEmployeeActivation: (payload, state) => {
    Axios.toggleEmployeeActivation(payload);
    return {
      ...state,
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      }
    }
  },
  toggleJobNumberActivation: (payload, state) => {
    Axios.toggleJobNumberActivation(payload);
    return {
      ...state,
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      }
    }
  },
  toggleLaborTypeActivation: (payload, state) => {
    Axios.toggleLaborTypeActivation(payload);
    return {
      ...state,
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      }
    }
  },
  editEmployee: (payload, state) => {
    Axios.editEmployee(payload);
    return state
  }
}
