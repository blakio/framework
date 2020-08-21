import Util from "blakio_util";
import Axios from "blakio_axios";

export default {
  isLoggedIn: (payload, state) => ({ ...state, isLoggedIn: payload }),
  
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
  selectedEmployeeIsClockedIn: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, selectedEmployeeIsClockedIn: payload }} }),
  setTotalHours: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, totalHrs: payload }} }),
  setWeekNumber: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, weekNumber: payload }} }),

  // employee directory
  toggleEmployeeEditingStatus: (payload, state) =>  ({ ...state, employeeDirectory: { ...state.employeeDirectory, isEditing: !state.employeeDirectory.isEditing } }),
  updateEmployee: (payload, state) =>  ({ ...state, employeeDirectory: { ...state.employeeDirectory, updateId: payload } }),

}
