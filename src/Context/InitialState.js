import {
  employees
} from "../dbRequests/db.js";

const initialState = {
  shortMenu: false,
  sideBarOption: null,
  sideBar: [],
  isDownloadScreen: false,
  employees,
  clockInEmployee: null
};

export default initialState;
