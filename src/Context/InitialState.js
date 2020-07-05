import {
  employees
} from "../dbRequests/db.js";

const initialState = {
  sideBarOptions: {
    shortMenu: false,
    sideBarOption: null,
    sideBar: [],
  },
  isDownloadScreen: false,
  timeSheet: {
    clockIn: {
      selectedEmployee: null,
      inputValue: null
    }
  },
  employeeDirectory: {
    employees
  }
};

export default initialState;
