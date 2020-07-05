import Types from "./Types";
import StateFunctions from "./StateFunctions";

export default (state, action) => {
  const { payload } = action;
  console.table(action)

  switch(action.type){
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

    default:
      return state;
  }
}
