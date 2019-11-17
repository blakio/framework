import Types from "./Types";
import StateFunctions from "./StateFunctions";

export default (state, action) => {
  const { payload } = action;
  console.table(action)

  switch(action.type){
    // SET
    case Types.SET_SELECTED_ITEMS:
      return StateFunctions.setSelectedItems(payload, state);
    case Types.SET_EMPLOYEES:
      return StateFunctions.setEmployees(payload, state);
    case Types.SET_LABOR_TYPES:
      return StateFunctions.setLaborTypes(payload, state);
    case Types.SET_JOB_NUMBERS:
      return StateFunctions.setJobNumbers(payload, state);

    // CREATE
    case Types.CREATE_EMPLOYEE:
      return StateFunctions.createEmployee(payload, state);
    case Types.CREATE_LABOR_TYPE:
      return StateFunctions.createLaborType(payload, state);
    case Types.CREATE_JOB_NUMBER:
      return StateFunctions.createJobNumber(payload, state);

    // DELETE
    case Types.BULK_DELETE:
      return StateFunctions.bulkDelete(payload, state);

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
    case Types.UPDATE_EMPLOYEE:
      return StateFunctions.updateEmployee(payload, state);
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

    default:
    return state;
  }
}
