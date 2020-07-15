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
      inputValue: "",
      employeeTitle: ""
    }
  },
  employeeDirectory: {
    employees: [],
    isEditing: false
  }
};

export default initialState;
