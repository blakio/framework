import Axios from "../Axios";
import initialState from "./InitialState";

import moment from "moment";

import Util from "../Util";

export default {
  shortMenu: (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, shortMenu: payload } }),
  setSideBar: (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, sideBar: payload } }),
  setSideBarOption:  (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, sideBarOption: payload } }),
  setEmployees: (payload, state) =>  ({ ...state, employees: payload }),
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
}
