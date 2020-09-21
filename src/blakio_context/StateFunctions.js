import Util from "blakio_util";
import Axios from "blakio_axios";
import initialState from "./InitialState";

export default {
  isLoggedIn: (payload, state) => ({ ...state, isLoggedIn: payload }),
  
  isLoading: (payload, state) => ({ ...state, isLoading: payload }),

  toggleMobileMenu: (payload, state) => ({ ...state, mobileMenuOpen: !state.mobileMenuOpen }),
  
  getEmployees: (payload, state) => {
    Axios.getEmployees(payload.page).then(employees => {
      payload.fn(employees.data)
    });
    return state;
  },
  getProducts: (payload, state) => {
    Axios.getProducts().then(products => {
      payload.fn(products.data)
    });
    return state;
  },

  shortMenu: (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, shortMenu: payload } }),
  setSideBar: (payload, state) => ({ ...state, sideBarOptions: { ...state.sideBarOptions, sideBar: payload } }),
  setSideBarOption:  (payload, state) => ({ ...initialState, mobileMenuOpen: state.mobileMenuOpen, isLoggedIn: state.isLoggedIn, sideBarOptions: { ...state.sideBarOptions, sideBarOption: payload } }),
  setEmployees: (payload, state) =>  ({ ...state, employeeDirectory: { ...state.employeeDirectory, employees: payload } }),
  setProduct: (payload, state) =>  ({ ...state, products: { ...state.products, list: payload } }),
  toggleDownloadScreen: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isDownloadScreen = payload;
    return {
      ...state,
      isDownloadScreen: currentState.isDownloadScreen
    }
  },
  clockInEmployee: (payload, state) =>  ({ ...state, clockInEmployee: payload }),

  // timesheet
  setClockInInputValue: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, inputValue: payload }} }),
  setClockInSelectedEmployee: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, selectedEmployee: payload }} }),
  selectedEmployeeIsClockedIn: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, selectedEmployeeIsClockedIn: payload }} }),
  setTotalHours: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, totalHrs: payload }} }),
  setWeekNumber: (payload, state) =>  ({ ...state, timeSheet: { ...state.timeSheet, clockIn: { ...state.timeSheet.clockIn, weekNumber: payload }} }),

  // employee directory
  toggleEmployeeEditingStatus: (payload, state) =>  ({ ...state, employeeDirectory: { ...state.employeeDirectory, isEditing: !state.employeeDirectory.isEditing } }),
  updateEmployee: (payload, state) =>  ({ ...state, employeeDirectory: { ...state.employeeDirectory, updateId: payload } }),
  updateProduct: (payload, state) =>  ({ ...state, products: { ...state.products, updateId: payload } }),

  // point of sale
  addToCart: (payload, state) => {
    const {
      cart
    } = state.pointOfSale;
    const isSelected = cart.some(data => data._id === payload._id)
    if(isSelected) return state;
    Util.showSuccess("Cha-Ching!", "Cart Updated", 2000)
    return ({ ...state, pointOfSale: { ...state.pointOfSale, cart: [ ...cart, payload ] } });
  },
  removeFromCart: (payload, state) => {
    const adjustedCart = state.pointOfSale.cart.filter(data => data._id !== payload);
    return ({ ...state, pointOfSale: { ...state.pointOfSale, cart: adjustedCart } })
  },
  clearCart: (payload, state) => ({ ...state, pointOfSale: { ...state.pointOfSale, cart: [] } }),
  setCartItems: (payload, state) => ({ ...state, pointOfSale: { ...state.pointOfSale, items: [ ...payload ] } }),
  adjustItemQuantity: (payload, state) => {
    const {
      id,
      quantity
    } = payload;
    const currentCart = [...state.pointOfSale.cart];
    let index;
    currentCart.forEach((data, i) => {
      if(data._id === id){
        index = i
      }
    });
    currentCart[index].quantity = quantity;
    return ({ ...state, pointOfSale: { ...state.pointOfSale, cart: currentCart } })
  },

  // employee directory
  setPaymentList: (payload, state) =>  ({ ...state, payments: { ...state.payments, list: payload } }),
  setItemsPurchased: (payload, state) =>  ({ ...state, payments: { ...state.payments, itemsPurchased: payload } }),
  setPaymentId: (payload, state) =>  ({ ...state, payments: { ...state.payments, paymentId: payload } }),

}
