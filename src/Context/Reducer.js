import Types from "./Types";
import StateFunctions from "./StateFunctions";

export default (state, action) => {
  const { payload } = action;
  console.table(action)

  switch(action.type){
    case Types.IS_LOADING:
      return StateFunctions.isLoading(payload, state);
      
    case Types.GET_EMPLOYEES:
      return StateFunctions.getEmployees(payload, state);

    case Types.SHORT_MENU:
      return StateFunctions.shortMenu(payload, state);
    case Types.SET_SIDE_BAR:
      return StateFunctions.setSideBar(payload, state);
    case Types.SET_SIDE_BAR_OPTION:
      return StateFunctions.setSideBarOption(payload, state);
    case Types.SET_EMPLOYEES:
      return StateFunctions.setEmployees(payload, state);
    case Types.TOGGLE_DOWNLOAD_SCREEN:
      return StateFunctions.toggleDownloadScreen(payload, state);

    // timesheet
    case Types.SET_CLOCK_IN_INPUT_VALUE:
      return StateFunctions.setClockInInputValue(payload, state);
    case Types.SET_CLOCK_IN_SELECTED_EMPLOYEE:
      return StateFunctions.setClockInSelectedEmployee(payload, state);
    case Types.SELECTED_EMPLOYEE_IS_CLOCKED_IN:
      return StateFunctions.selectedEmployeeIsClockedIn(payload, state);
    case Types.SET_TOTAL_HOURS:
      return StateFunctions.setTotalHours(payload, state);
    case Types.SET_WEEK_NUMBER:
      return StateFunctions.setWeekNumber(payload, state);

     // employee directory
    case Types.TOGGLE_EMPLOYEE_EDITING_STATUS:
      return StateFunctions.toggleEmployeeEditingStatus(payload, state);

    default:
      return state;
  }
}
