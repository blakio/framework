import Types from "blakio_context/Types";

import { store } from 'react-notifications-component';

import moment from "moment";
import mtz from "moment-timezone";

const total = (a, b) => {
  return parseInt(a) + parseInt(b);
}

const columnToClassMapper = {
  "3_3_3_3": "4",
  "12": "1",
  "4_4_4": "3",
  "6_3_3": "2_1_1",
  "6_6": "2",
  "3_3_6": "1_1_2",
  "4_8": "1_2",
  "8_4": "2_1",
  "2.4_2.4_2.4_2.4_2.4_2.4": "5",
  "2_2_2_2_2_2": "6",
  "1.7_1.7_1.7_1.7_1.7_1.7_1.7": "7",
  "1.5_1.5_1.5_1.5_1.5_1.5_1.5_1.5": "8",
  "1.3_1.3_1.3_1.3_1.3_1.3_1.3_1.3_1.3": "9",
  "1.2_1.2_1.2_1.2_1.2_1.2_1.2_1.2_1.2_1.2": "10",
  "1.09_1.09_1.09_1.09_1.09_1.09_1.09_1.09_1.09_1.09_1.09": "11",
  "1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1": "12"
}

export default {

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

  hasMatchingStrings: (str1, str2) => {
    return str1.toLowerCase() === str2.toLowerCase();
  },

  getEmployees: dispatch => {
    dispatch({
      type: Types.GET_EMPLOYEES,
      payload: {
        fn: (employees) => {
          dispatch({
            type: Types.SET_EMPLOYEES,
            payload: employees
          })
        }
      }
    })
  },

  getProducts: dispatch => {
    dispatch({
      type: Types.GET_PRODUCTS,
      payload: {
        fn: (product) => {
          dispatch({
            type: Types.SET_PRODUCTS,
            payload: product
          })
        }
      }
    })
  },

  load: (dispatch, isLoading) => {
    dispatch({
      type: Types.IS_LOADING,
      payload: isLoading
    })
  },

  showError: (title, message) => {
    store.addNotification({
        title,
        message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });
  },
  
  showSuccess: (title, message) => {
    store.addNotification({
        title,
        message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });
  },

  formatDate: (date) => {
    return moment(date).format("MMMM DD, YYYY");
  },

  formatPhoneNumber: (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
  
    return null
  },

  getCurrentWeek: (offset) => {
    var currentDate = moment();
    var weekStart = currentDate.startOf('week');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      if(offset){
        days.push(moment(weekStart).add(i, 'days').add(offset * 7, 'days').format("MMMM Do, ddd"));
      } else {
        days.push(moment(weekStart).add(i, 'days').format("MMMM Do, ddd"));
      }
    }
    return days;
  },

  getCurrentWeekWithYear: (offset) => {
    var currentDate = moment();
    var weekStart = currentDate.startOf('week');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      if(offset){
        days.push(moment(weekStart).add(i, 'days').add(offset * 7, 'days').format("MM/DD/YY"));
      } else {
        days.push(moment(weekStart).add(i, 'days').format("MM/DD/YY"));
      }
    }
    return days;
  },

  getCurrentWeekInEpoch: (offset) => {
    var currentDate = moment();
    var weekStart = currentDate.startOf('week');
    var epoch = [];
    for (var i = 0; i <= 7; i++) {
      if(offset){
        epoch.push(moment(weekStart).add(i, 'days').add(offset * 7, 'days'))
      } else {
        epoch.push(moment(weekStart).add(i, 'days'))
      }
    }
    const lastDayReplacement = moment(epoch[epoch.length - 1]).subtract(1, "minute");
    epoch[6] = lastDayReplacement;
    epoch.pop();

    const tzDifference = mtz(moment()).tz("America/New_York").format();
    const diffString = tzDifference.slice(tzDifference.length - 6);
    const split = diffString.split(":");
    const sign = split[0].includes("-") ? "subtract" : "add";
    const hours = split[0].replace("-", "");
    const minutes = split[1];

    const unix = epoch.map(data => moment(data)[sign](hours, "hours")[sign](minutes, "minutes").unix());
    return unix;
  },




  // formats the side bar data and includes functionality
  adjustSideBarData: (state, dispatch, Types, customFn) => {
    const {
      sideBarOptions
    } = state;

    const {
      sideBar,
      sideBarOption,
      sideBarChildOption
    } = sideBarOptions;

    // map data to sidebar buttons
    sideBar.forEach(data => {
      // is the option current selected
      const isSelected = data.title === sideBarOption;
      // if the open is selected it is opened
      data.isOpen = isSelected;
      // sets the click event of the parent dropdown
      data.onClick = () => {
        if(!isSelected){
          dispatch({
            type: Types.SET_SIDE_BAR_OPTION,
            payload: isSelected ? null : data.title
          })
          // if there is a custom function option, fire it after the dispatch to open the option
          if(data.fn) customFn[data.fn](data)
        }
      }
      // sets the open icon if the option is open, otherwise set the closed icon
      data.icon = isSelected ? "fas fa-dot-circle" : "far fa-dot-circle";
      // sets the active background color
      data.selected = isSelected;
    });
  },

  // logic to tel the dashboard which components to show
  showComponent: (data, context) => {
    const { conditions } = data;
    const { sideBarChildOption, sideBarOption } = context;
    const hasParent = conditions.includes(sideBarOption);
    const hasChild = conditions.includes(sideBarChildOption);
    return (conditions.length > 1) ? (hasParent && hasChild) : hasParent;
  },

  setGrid: (gridArray, data) => {
    const { columns } = data;
    const count = parseInt(columns);
    if(gridArray.length){
      let insertData;
      let insertIndex;
      let newCount;
      let newInsertion = false;
      gridArray.forEach((d, i) => {
        if(!d.isFull){
          insertIndex = i;
          const count = total(columns, d.count);
          if(count <= 12){
            insertData = [...d.components, data];
            newCount = parseInt(count);
          } else {
            newInsertion = true;
            insertData = [data];
            newCount = parseInt(columns);
          }
        }
      });

      if(newInsertion){
        gridArray[insertIndex].isFull = true;
        gridArray.push({
          count: parseInt(newCount),
          components: insertData
        })
      } else {
        gridArray[insertIndex] = {
          count: parseInt(newCount),
          components: insertData
        }
      }
      
    } else {
      if(count === 12){
        gridArray.push({
          count: parseInt(count),
          components: [data],
          isFull: true
        })
      } else {
        gridArray.push({
          count: parseInt(count),
          components: [data]
        })
      }
    }
  },
  getGridClasses: grid => {
    const componentColumns = [];
    grid.forEach(data => {
      const remainingColums = 12 - data.count;
      let cols = []
      if(remainingColums){
        cols.push(remainingColums)
      }
      data.components.forEach(componentData => {
        cols.push(componentData.columns)
      });
      const colString = cols.join("_");
      componentColumns.push(colString);
    });
    grid.forEach((data, i) => {
      const className = columnToClassMapper[componentColumns[i]]
      data.class = className;
      let componentLength = 1;
      const stringLength = componentColumns[i].length;
      for(let j = 0; j < stringLength; j++){
        if(componentColumns[i][j] === "_"){
          componentLength++;
        }
      }
      data.components.length = componentLength;
    });
    grid.forEach(data => {
      for(let i = 0; i < data.components.length; i++){
        if(!data.components[i]){
          data.components[i] = {}
        }
      }
    })
  },

  openPhoneMode: (dispatch, shortMenu) => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      dispatch({
        type: Types.SHORT_MENU,
        payload: !shortMenu
      })
    }
  }

}

export const strings = {
  timesheet: {
    cantClockIn: {
      title: "Sorry",
      body: "Unable to submit. Please try again later."
    }
  }
}