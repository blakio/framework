export default {

  adjustSideBarData: (appData, context, Types, customFn) => {
    const {
      dispatch,
      sideBarOption,
      sideBarChildOption
    } = context;

    // map data to sidebar buttons
    appData.sideBar.forEach(data => {
      const isSelected = data.id === sideBarOption;
      data.isOpen = isSelected;
      data.onClick = () => {
        dispatch({
          type: Types.SET_SIDE_BAR_OPTION,
          payload: isSelected ? null : data.id
        })
        if(data.fn) customFn[data.fn](data)
      }
      data.icon = isSelected ? "fas fa-dot-circle" : "far fa-dot-circle";
      data.data.forEach(list => {
        const isChildSelected = sideBarChildOption === list.id;
        if(list.types.includes("list") && list.types.includes("click")){
          list.isOpen = isChildSelected
          list.onClick = () => {
            dispatch({
              type: Types.SET_SIDE_BAR_CHILD_OPTION,
              payload: isChildSelected ? null : list.id
            })
            dispatch({
              type: list.clickType,
              payload: list.id
            })
            if(list.fn) customFn[list.fn](list)
          }
        } else if(list.types.includes("list")){
          list.isOpen = sideBarChildOption === list.head;
          list.onClick = () => {
            dispatch({
              type: Types.SET_SIDE_BAR_CHILD_OPTION,
              payload: isChildSelected ? null : list.id
            })
            if(list.fn) customFn[list.fn](list)
          } 
        }
        list.data.forEach(childList => {
          childList.onClick = () => customFn[childList.fn](childList);
        })
      })
    });
  },

  showComponent: (data, context) => {
    const { conditions } = data;
    const { sideBarChildOption, sideBarOption } = context;
    return conditions.includes(sideBarChildOption) || conditions.includes(sideBarOption);
  },

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

}
