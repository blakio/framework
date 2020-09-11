import Types from "./Types";
import StateFunctions from "./StateFunctions";

export default (state, action) => {
  const { payload } = action;
  console.table(action)

  switch(action.type){
    case Types.IS_LOGGED_IN:
      return StateFunctions.isLoggedIn(payload, state);

    case Types.IS_LOADING:
      return StateFunctions.isLoading(payload, state);
      
    case Types.GET_EMPLOYEES:
      return StateFunctions.getEmployees(payload, state);
    case Types.GET_PRODUCTS:
      return StateFunctions.getProducts(payload, state);

    case Types.SHORT_MENU:
      return StateFunctions.shortMenu(payload, state);
    case Types.SET_SIDE_BAR:
      return StateFunctions.setSideBar(payload, state);
    case Types.SET_SIDE_BAR_OPTION:
      return StateFunctions.setSideBarOption(payload, state);
    case Types.SET_EMPLOYEES:
      return StateFunctions.setEmployees(payload, state);
    case Types.SET_PRODUCTS:
      return StateFunctions.setProduct(payload, state);
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
    case Types.UPDATE_EMPLOYEE:
      return StateFunctions.updateEmployee(payload, state);
    case Types.UPDATE_PRODUCT:
      return StateFunctions.updateProduct(payload, state);

    // point of sale
    case Types.ADD_TO_CART:
      return StateFunctions.addToCart(payload, state);
    case Types.REMOVE_FROM_CART:
      return StateFunctions.removeFromCart(payload, state);
    case Types.CLEAR_CART:
      return StateFunctions.clearCart(payload, state);
    case Types.SET_CART_ITEMS:
      return StateFunctions.setCartItems(payload, state);
    case Types.ADJUST_ITEM_QUANTITY:
      return StateFunctions.adjustItemQuantity(payload, state);

      // transactions
    case Types.SET_PAYMENT_LIST:
      return StateFunctions.setPaymentList(payload, state);
    case Types.SET_ITEMS_PURCHASED:
      return StateFunctions.setItemsPurchased(payload, state);

    default:
      return state;
  }
}
