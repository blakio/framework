const initialState = {
  isLoggedIn: false,
  isLoading: false,
  mobileMenuOpen: false,
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
    updateId: null,
    offset: 0,
    limit: 25,
    count: 0
  },
  pointOfSale: {
    cart: [],
    items: []
  },
  products: {
    list: [],
    updateId: null
  },
  payments: {
    list: [],
    itemsPurchased: [],
    paymentId: null
  }
};

export default initialState;
