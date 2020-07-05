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
      const isSelected = data._id === sideBarOption;
      // if the open is selected it is opened
      data.isOpen = isSelected;
      // sets the click event of the parent dropdown
      data.onClick = () => {
        if(!isSelected){
          dispatch({
            type: Types.SET_SIDE_BAR_OPTION,
            payload: isSelected ? null : data._id
          })
          // if there is a custom function option, fire it after the dispatch to open the option
          if(data.fn) customFn[data.fn](data)
        }
      }
      // sets the open icon if the option is open, otherwise set the closed icon
      data.icon = isSelected ? "fas fa-dot-circle" : "far fa-dot-circle";
      // sets the active background color
      data.selected = isSelected;
      // loops through the inner dropdowns "Children"
      data.data.forEach(list => {
        // is the child selected
        const isChildSelected = sideBarChildOption === list._id;
        // sets the open status
        list.isOpen = isChildSelected
        // set the click event
        list.onClick = () => {
          // click event to toggle the open status
          dispatch({
            type: Types.SET_SIDE_BAR_CHILD_OPTION,
            payload: isChildSelected ? null : list._id
          })
          // open the grandchildren if the option is a dropdown
          if(list.types.includes("list") && list.types.includes("click")){
            dispatch({
              type: list.clickType,
              payload: list._id
            })
          }
          // fires a custom function if it includes one
          if(list.fn) customFn[list.fn](list);
        }
        // loop through any grandchildren options and sets the custom functions
        list.data.forEach(childList => {
          childList.onClick = () => customFn[childList.fn](childList);
        })
      })
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
  }

}
