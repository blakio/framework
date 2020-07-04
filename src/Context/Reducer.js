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
    case Types.CLOCK_IN_EMPLOYEE:
      return StateFunctions.clockInEmployee(payload, state);
    default:
      return state;
  }
}
