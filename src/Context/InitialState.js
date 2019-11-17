const initialState = {
  token: "",
  isAdminMode: false,
  isAdminLoggedIn: true,
  isDownloadScreen: false,
  isContractor: false,
  isTech: true,
  message: {
    confirmation: {
      status: false,
      message: ""
    },
    error: {
      status: false,
      message: ""
    },
    warning: {
      status: false,
      message: ""
    }
  },
  selectedItems: {
    laborTypes: [],
    jobNumbers: [],
    employees: []
  },
  laborTypes: [],
  jobNumbers: [],
  employees: [],
  csvData: {
    data: [],
    startDate: "",
    endDate: ""
  }
};

export default initialState;
