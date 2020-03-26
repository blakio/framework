export default {

  // formats the side bar data and includes functionality
  adjustSideBarData: (context, Types, customFn) => {
    const {
      dispatch,
      sideBar,
      sideBarOption,
      sideBarChildOption
    } = context;

    // map data to sidebar buttons
    sideBar.forEach(data => {
      // is the option current selected
      const isSelected = data._id === sideBarOption;
      // if the open is selected it is opened
      data.isOpen = isSelected;
      // sets the click event of the parent dropdown
      data.onClick = () => {
        dispatch({
          type: Types.SET_SIDE_BAR_OPTION,
          payload: isSelected ? null : data._id
        })
        // if there is a custom function option, fire it after the dispatch to open the option
        if(data.fn) customFn[data.fn](data)
      }
      // sets the open icon if the option is open, otherwise set the closed icon
      data.icon = isSelected ? "fas fa-dot-circle" : "far fa-dot-circle";
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

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

}
