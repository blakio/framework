const initialState = {
  isLoggedIn: false,
  isLoading: false,
  deviceType: null,
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
  },
  pointOfSale: {
    cart: [],
    items: []
  }
};

export default initialState;
