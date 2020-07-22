const initialState = {
  isLoading: false,
  sideBarOptions: {
    shortMenu: false,
    sideBarOption: null,
    sideBar: [],
  },
  isDownloadScreen: false,
  timeSheet: {
    clockIn: {
      selectedEmployee: null,
      selectedEmployeeIsClockedIn: null,
      inputValue: ""
    }
  },
  employeeDirectory: {
    employees: [],
    isEditing: false
  }
};

export default initialState;
