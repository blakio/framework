import Types from "./Types";
import StateFunctions from "./StateFunctions";

export default (state, action) => {
  const { payload } = action;
  console.table(action)

  switch(action.type){

    case Types.SET_SIDE_BAR_OPTION:
      return StateFunctions.setSideBarOption(payload, state);
    case Types.SET_SIDE_BAR_CHILD_OPTION:
      return StateFunctions.setSideBarChildOption(payload, state);
    case Types.SET_CHILD_OPTION:
      return StateFunctions.setChildClickOption(payload, state);








    // SET
    case Types.SET_SELECTED_ITEMS:
      return StateFunctions.setSelectedItems(payload, state);
    case Types.SET_EMPLOYEES:
      return StateFunctions.setEmployees(payload, state);
    case Types.SET_LABOR_TYPES:
      return StateFunctions.setLaborTypes(payload, state);
    case Types.SET_JOB_NUMBERS:
      return StateFunctions.setJobNumbers(payload, state);
    case Types.SET_SELECTED_LABOR_TYPES:
      return StateFunctions.setSelectedLaborTypes(payload, state);
    case Types.SET_SELECTED_JOB_NUMBERS:
      return StateFunctions.setSelectedJobNumbers(payload, state);
    case Types.SET_SELECTED_EMPLOYEES:
      return StateFunctions.setSelectedEmployees(payload, state);

    // CREATE
    case Types.CREATE_EMPLOYEE:
      return StateFunctions.createEmployee(payload, state);
    case Types.CREATE_LABOR_TYPE:
      return StateFunctions.createLaborType(payload, state);
    case Types.CREATE_JOB_NUMBER:
      return StateFunctions.createJobNumber(payload, state);

    // DELETE
    case Types.DELETE_EMPLOYEE:
      return StateFunctions.deleteEmployee(payload, state);
    case Types.DELETE_JOB_NUMBER:
      return StateFunctions.deleteJobNumber(payload, state);
    case Types.DELETE_LABOR_TYPE:
      return StateFunctions.deleteLaborType(payload, state);

    // OTHER
    case Types.CLOCK_IN:
      return StateFunctions.clockIn(payload, state);
    case Types.CLOCK_OUT:
      return StateFunctions.clockOut(payload, state);
    case Types.GO_TO_LUNCH:
      return StateFunctions.toLunch(payload, state);
    case Types.BACK_FROM_LUNCH:
      return StateFunctions.fromLunch(payload, state);
    case Types.BULK_DEACTIVATE:
      return StateFunctions.bulkDeactivate(payload, state);
    case Types.BULK_ACTIVATE:
      return StateFunctions.bulkActivate(payload, state);
    case Types.TOGGLE_ADMIN_MODE:
      return StateFunctions.toggleAdminMode(payload, state);
    case Types.OPEN_MESSAGE:
      return StateFunctions.openMessage(payload, state);
    case Types.CLOSE_MESSAGE:
      return StateFunctions.closeMessage(payload, state);
    case Types.TOGGLE_DOWNLOAD_SCREEN:
      return StateFunctions.toggleDownloadScreen(payload, state);
    case Types.TOGGLE_IS_CONTRACTOR:
      return StateFunctions.toggleIsContractor(payload, state);
    case Types.TOGGLE_IS_TECH:
      return StateFunctions.toggleIsTech(payload, state);
    case Types.CLEAR_CSV_DATA:
      return StateFunctions.clearCSVData(payload, state);
    case Types.GET_CSV_DATA:
      return StateFunctions.getCSVData(payload, state);
    case Types.SET_CSV_DATA:
      return StateFunctions.setCSVData(payload, state);
    case Types.LOG_IN:
      return StateFunctions.logIn(payload, state);
    case Types.OPEN_SIDE_BAR:
      return StateFunctions.openSideBar(payload, state);
    case Types.IS_LOADING:
      return StateFunctions.isLoading(payload, state);
    case Types.OPENED_LIST:
      return StateFunctions.openedList(payload, state);
    case Types.TOGGLE_EMPLOYEE:
      return StateFunctions.toggleEmployeeActivation(payload, state);
    case Types.TOGGLE_JOB_NUMBER:
      return StateFunctions.toggleJobNumberActivation(payload, state);
    case Types.TOGGLE_LABOR_TYPE:
      return StateFunctions.toggleLaborTypeActivation(payload, state);
    case Types.EDIT_EMPLOYEE:
      return StateFunctions.editEmployee(payload, state);

    default:
    return state;
  }
}
