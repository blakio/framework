import Axios from "../Axios";
import initialState from "./InitialState";

import moment from "moment";

import Util from "../Util";

export default {
  shortMenu: (payload, state) => ({ ...state, shortMenu: payload }),
  setSideBar: (payload, state) => ({ ...state, sideBar: payload }),
  setSideBarOption:  (payload, state) => ({ ...state, sideBarOption: payload }),
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
}
