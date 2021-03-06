const initialState = {
  isLoggedIn: false,
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
      inputValue: "",
      weekNumber: null
    }
  },
  employeeDirectory: {
    employees: [],
    isEditing: false,
    updateId: null
  }
};

export default initialState;
