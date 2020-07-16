import Util from "../Util";
import Axios from "../Axios";

export default {
  isLoading: (payload, state) => ({ ...state, isLoading: payload }),
  
  getEmployees: (payload, state) => {
    Axios.getEmployees().then(employees => {
      payload.fn(employees.data)
    });
    return state;
  },

  shortMenu: (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, shortMenu: payload } }),
  setSideBar: (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, sideBar: payload } }),
  setSideBarOption:  (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, sideBarOption: payload } }),
  setEmployees: (payload, state) =>  ({ ...state, employeeDirectory: { ...state.employeeDirectory, employees: payload } }),
  toggleDownloadScreen: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isDownloadScreen = payload;
    return {
      ...state,
      isDownloadScreen: currentState.isDownloadScreen
    }
  },
  clockInEmployee: (payload, state) =>  ({ ...state, clockInEmployee: payload }),

  // timesheet
  setClockInInputValue: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, inputValue: payload }} }),
  setClockInSelectedEmployee: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, selectedEmployee: payload }} }),

  // employee directory
  toggleEmployeeEditingStatus: (payload, state) =>  ({ ...state, employeeDirectory: { ...state.employeeDirectory, isEditing: !state.employeeDirectory.isEditing } }),
}
