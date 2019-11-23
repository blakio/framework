import React, { useState, useContext, useEffect } from 'react';
import { CSVLink } from "react-csv";

import moment from "moment";
import axios from "axios";
import DatePicker from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

import './Blakio.css';

import Util from "../Util";

import logo from "../imgs/logo.png";

import Axios from "../Axios";
import Types from "../Context/Types";
import DashboardContext from "../Context/State";

const fetch = (dispatch) => {
  Axios.fetchEmployees(dispatch);
  Axios.fetchJobNumbers(dispatch);
  Axios.fetchLaborTypes(dispatch);
}

const SAMPLE = () => {
  return (<div id="SAMPLE">
  </div>)
}

const RoundedHeader = (props) => {
  return (<div id="RoundedHeader" className="flex" onClick={props.onClick}>
    <p className="roundedHeaderText" style={props.styles.text}>{props.text}</p>
    <i className="fas fa-user" style={props.styles.icon}></i>
  </div>)
}

const SelectBar = (props) => {
  return (<div className="SelectBar flex">
    <div style={{marginLeft: 20, marginRight: 20}}>
      <i className={props.icon} style={props.selectBarIcon}></i>
    </div>
    <p>{props.text}</p>
  </div>)
}

const HamburgerMenu = (props) => {
  return (<div
    id="HamburgerMenu"
    className="flex"
    style={{
      height: props.styles.size,
      width: props.styles.size
    }}>
      <i className="fas fa-bars" style={{
        fontSize: props.styles.size * 0.4
    }}></i>
  </div>)
}

const BottomBarText = (props) => {
  return (<div className="BottomBarText">
    {props.subText}
  </div>)
}

const SideBarHead = () => {
  return (<div id="SideBarHead" className="flex">
    <img src={logo} />
    <HamburgerMenu styles={{
      size: 30
    }}/>
  </div>)
}

const SideBarSection = (props) => {
  const {
    dispatch,
    selectedItems,
    isAdminMode,
    jobNumbers,
    laborTypes
  } = useContext(DashboardContext);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const getIcon = (data) => {
    if(data.isContractor) return "fas fa-id-card-alt";
    if(data.isTech) return "fas fa-wrench";
    return "fas fa-user-tie"
  }
  const employees = Util.getEmployees(props.data, isAdminMode);

  return (<div className="SideBarSection">
    {props.headers.map((data, index) => {
      return (<div key={index} className={`innerBar ${open && "open"}`}>
        <RoundedHeader styles={{
          text: {
            color: "#fff",
            fontSize: "12px",
            backgroundColor: "rgba(0, 37, 78, 0.5)"
          },
          icon: {
            color: "rgb(0, 37, 78)",
            marginRight: "1em"
          }
        }}
        text={data} onClick={toggle}/>
        {employees.map((data, i) => {
          return (<div
            key={i}
            className={`SelectBarParent ${(selectedItems.employees[0] === data) && "selected"} ${!data.isActive && "notActive"}`}
            onClick={() => {
              let payload = (!selectedItems.employees[0]) ? [data] : (selectedItems.employees[0] === data) ? [] : [data];
              dispatch({
                type: Types.OPEN_SIDE_BAR,
                payload: payload.length ? true : false
              })
              dispatch({
                type: Types.SET_SELECTED_EMPLOYEES,
                payload
              })
              if(payload[0]){
                const jobNumberObj = Util.getObjFromArray(payload[0].jobNumber, "number", jobNumbers);
                const laborTypeObj = Util.getObjFromArray(payload[0].laborType, "name", laborTypes);
                if(jobNumberObj){
                  dispatch({
                    type: Types.SET_SELECTED_JOB_NUMBERS,
                    payload: [jobNumberObj]
                  })
                }
                if(laborTypeObj){
                  dispatch({
                    type: Types.SET_SELECTED_LABOR_TYPES,
                    payload: [laborTypeObj]
                  })
                }
              }
            }}>
            <SelectBar icon={getIcon(data)} text={data.name} selectBarIcon={styles.selectBarIcon}/>
            <BottomBarText subText={data.jobTitle}/>
          </div>)
        })}
      </div>)
    })}
  </div>)
}

const SideBar = () => {
  const {
    dispatch,
    employees
  } = useContext(DashboardContext);

  useEffect(() => {
    Axios.fetchEmployees(dispatch);
  }, []);

  const sections = [
    {headers: ["EMPLOYEES"], data: employees},
    // {headers: ["EMPLOYEES"], data: []} add sections like this
  ]

  return (<div id="SideBar" className="container flex">
    <SideBarHead />
    {sections.map((data, index) => <SideBarSection
      key={index}
      headers={data.headers}
      data={data.data} />)}
  </div>)
};

const Toggle = (props) => {
  return (<div className="Toggle flex" onClick={props.onClick}>
    {props.isOn && <i className="fas fa-toggle-on"></i>}
    {!props.isOn && <i className="fas fa-toggle-off"></i>}
    <p>{props.text}</p>
  </div>)
}

const TopBar = () => {
  const {
    dispatch,
    isDownloadScreen
  } = useContext(DashboardContext);

  return (<div id="TopBar" className="container flex">
    <div className="topBarOptions" onClick={() => {
      dispatch({
        type: Types.TOGGLE_DOWNLOAD_SCREEN,
        payload: !isDownloadScreen
      })
    }}>
      <i className="fas fa-cloud-download-alt"></i>
    </div>
    <DateTimeWeather />
  </div>)
};

const TopLeftFold = (props) => {
  // requirements
  // height and width needs to be an integer
  const [duration, setDuration] = useState(0);
  return (<div id="TopLeftFold" style={props.styles}>
      <div className="backFold" style={{
        height: props.styles.height * 2,
        width: props.styles.width * 2
      }}></div>
  </div>)
}

const DatePickerTwoDate = () => {
  const {
    dispatch,
    csvData
  } = useContext(DashboardContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (<div className="DatePickerTwoDate flex">
    <DatePicker
      maxDate={new Date()}
      selected={startDate}
      onChange={date => {
        const isAfterEndDate = moment(date).diff(endDate, 'hours') > 0;
        if(isAfterEndDate) setEndDate(date);

        setStartDate(date);
        dispatch({ type: Types.CLEAR_CSV_DATA })
      }}
      selectsStart
      startDate={startDate}
      endDate={endDate}
    />
    <DatePicker
      maxDate={new Date()}
      selected={endDate}
      onChange={date => {
        setEndDate(date)
        dispatch({ type: Types.CLEAR_CSV_DATA })
      }}
      selectsEnd
      endDate={endDate}
      minDate={startDate}
    />
    <div className="buttonSection flex">

      <IconButton isActive={startDate && endDate} text={"get"} icon="fas fa-file-import" onClick={() => {
        dispatch({
          type: Types.GET_CSV_DATA,
          payload: {
            startDate,
            endDate,
            dispatch
          }
        })
      }}/>

      <CSVLink
        data={csvData.data}
        style={{textDecoration: "none"}}
        filename={`Cummins Wagner Timesheet ${moment(csvData.startDate).format("MM/DD/YYYY")} to ${moment(csvData.endDate).format("MM/DD/YYYY")}.csv`}
        onClick={() => csvData.data.length > 0}>
        <IconButton isActive={csvData.data.length} text={"download"} icon="fas fa-file-download" onClick={() => {}}/>
      </CSVLink>
    </div>
  </div>)
}

const DashboardHead = () => {
  const {
    isAdminMode,
    dispatch,
    isDownloadScreen
  } = useContext(DashboardContext);
  return (<div id="DashboardHead" className="flex">
    <div className="flex">
      <i className="fas fa-columns"></i>
      <p style={{margin: 0, marginLeft: 10}}>DASHBOARD</p>
    </div>
    <Toggle
      text="Edit"
      onClick={() => {
        dispatch({
          type: Types.TOGGLE_ADMIN_MODE
        })
      }}
      isOn={isAdminMode}/>
    {isDownloadScreen && <DatePickerTwoDate />}
  </div>)
}

const DashPaperRoundedHead = (props) => {
  return (<div className="DashPaperRoundedHead lightGreen">
    <p><i className={props.icon}></i>{props.sectionName}</p>
  </div>)
}

const IconButton = (props) => {
  return (<div className={`IconButton flex ${props.isActive && "active"}`} onClick={() => {if(props.isActive) props.onClick()}}>
    <i className={props.icon}></i>
    <p>{props.text}</p>
  </div>)
}

const SquareLabel = (props) => {
  return (<div
    className={`SquareLabel ${props.isActive && "active"} ${!props.data.isActive && "deactivated"}`}
    onClick={() => props.setIsActive(props.data)}>
    {props.data[props.fieldKey]}
  </div>)
}

const SquareLabelDirectData = (props) => {
  return (<div
    className={`SquareLabel ${props.activeText === props.name && "active"}`}
    onClick={() => props.onClick(props.name)}>
    {props.name}
  </div>)
}

const Paper = (props) => {
  const {
    dispatch,
    isAdminMode,
    ...state
  } = useContext(DashboardContext);

  const setIsActive = (data) => {
    let group = Util.breakRefAndCopy(state.selectedItems[props.stateField]);
    if(isAdminMode){
      const alreadyClicked = group.some(d => d.id === data.id);
      if(!alreadyClicked){
        group.push(data)
      } else {
        let index;
        group.forEach((d, i) => {if(d.id === data.id) index = i});
        group.splice(index, 1);
      }
    } else {
      const alreadyClicked = group.some(d => d.id === data.id);
      if(alreadyClicked){
        group = [];
      } else {
        group = [data];
      }
    }
    dispatch({
      type: Types[props.actions[0]],
      payload: group
    })
  }

  return (<div className={`Paper flex`} style={{backgroundColor: "#fff"}}>
    <DashPaperRoundedHead
      sectionName={props.sectionName}
      icon={props.icon}
    />
    <div className="flex" style={{flexWrap: "wrap"}}>
      {props.data.map((data, index) => {
        const isActive = state.selectedItems[props.stateField].some(d => d.id === props.data[index].id);
        return <SquareLabel key={index} data={data} fieldKey={props.fieldKey} isActive={isActive} setIsActive={setIsActive}/>})}
    </div>
    {isAdminMode && <div className="PaperBottomBar flex">
      <IconButton isActive={props.hasSelectedItems(state.selectedItems)} text={"ACTIVATE"} icon="fas fa-link" onClick={() => dispatch({ type: Types.BULK_ACTIVATE, payload: {fn: () => fetch(dispatch)} })}/>
      <IconButton isActive={props.hasSelectedItems(state.selectedItems)} text={"DEACTIVATE"} icon="fas fa-unlink" onClick={() => dispatch({ type: Types.BULK_DEACTIVATE, payload: {fn: () => fetch(dispatch)} })}/>
      <IconButton isActive={props.hasSelectedItems(state.selectedItems)} text={"DELETE"} icon="far fa-trash-alt" onClick={() => dispatch({ type: Types[props.actions[1]], payload: {fn: () => fetch(dispatch)} })}/>
    </div>}
  </div>)
}

const TimeTrackBar = () => {
  const {
    dispatch,
    selectedItems
  } = useContext(DashboardContext);

  const setConfirmedNotification = () => {
    store.addNotification({
      title: "Confirmation",
      message: `Your punch is Confirmed ${employee}`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      showIcon: true,
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }

  const employee = selectedItems.employees[0] && selectedItems.employees[0].name;

  return (<div id="TimeTrackBar">
    <DashPaperRoundedHead
      icon="fas fa-clock"
      sectionName="time sheet"
    />
    <div className="flex" style={{justifyContent: "space-around"}}>
      <IconButton isActive={Util.getActiveTimeButtomStatus("CLOCK IN", selectedItems)} text={"CLOCK IN"} icon="fas fa-clock" onClick={() => dispatch({
        type: Types.CLOCK_IN,
        payload: () => {
          fetch(dispatch);
          setConfirmedNotification(employee);
        }
      })}/>
      <IconButton isActive={Util.getActiveTimeButtomStatus("TO LUNCH", selectedItems)} text={"TO LUNCH"} icon="fas fa-drumstick-bite" onClick={() => dispatch({
        type: Types.GO_TO_LUNCH,
        payload: () => {
          fetch(dispatch);
          setConfirmedNotification(employee);
        }
      })}/>
      <IconButton isActive={Util.getActiveTimeButtomStatus("FROM LUNCH", selectedItems)} text={"FROM LUNCH"} icon="fas fa-bone" onClick={() => dispatch({
        type: Types.BACK_FROM_LUNCH,
        payload: () => {
          fetch(dispatch);
          setConfirmedNotification(employee);
        }
      })}/>
      <IconButton isActive={Util.getActiveTimeButtomStatus("CLOCK OUT", selectedItems)} text={"CLOCK OUT"} icon="fas fa-clock" onClick={() => dispatch({
        type: Types.CLOCK_OUT,
        payload: () => {
          Axios.reset(selectedItems.employees[0].id, () => {
            fetch(dispatch);
            setConfirmedNotification(employee);
          })
        }
      })}/>
    </div>
  </div>)
}

const AddInput = (props) => {
  return (<div className="AddInput">
    <p>{props.text}</p>
    <input type={props.type} value={props.value} onChange={e => props.onChange(e.target.value)} placeholder={props.placeholder}/>
  </div>)
}

const AddBar = (props) => {

  const {
    dispatch
  } = useContext(DashboardContext);

  const [activeText, setActiveText] = useState("");
  const [isContractor, setIsContractor] = useState(false);
  const [isTechnician, setIsTechnician] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [travelTime, setTravelTime] = useState(0);
  const [laborType, setLaborType] = useState("");
  const [jobNumber, setJobNumber] = useState("");

  const onClick = (name) => {
    (activeText === name) ? setActiveText("") : setActiveText(name);
  }

  const warning = (message) => {
    store.addNotification({
      title: "Warning",
      message,
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000
      }
    });
  }

  const add = (value, data) => {
    if(activeText === "Employee"){
      Axios.addEmployee({
        isActive: true,
        isContractor: isContractor,
        isTech: isTechnician,
        jobTitle: jobTitle,
        name: fullName,
        travelTime: travelTime
      }, () => { fetch(dispatch) }, res => warning(res));
    } else if (activeText === "Job Number"){
      Axios.addJobNumber({
        isActive: true,
        number: jobNumber
      }, () => { fetch(dispatch) }, res => warning(res));
    } else if (activeText === "Labor Types"){
      Axios.addLaborType({
        isActive: true,
        name: laborType
      }, () => { fetch(dispatch) }, res => warning(res));
    }
    setIsContractor(false);
    setIsTechnician(false);
    setJobTitle("");
    setFullName("");
    setTravelTime(0);
    setLaborType("");
    setJobNumber("");
  }

  return (<div className="AddBar">
    <DashPaperRoundedHead
      icon="far fa-plus-square"
      sectionName="add items here"
    />
    <div className="flex" style={{flexDirection: "column"}}>
      <div>
        <SquareLabelDirectData onClick={onClick} activeText={activeText} name="Employee"/>
        <SquareLabelDirectData onClick={onClick} activeText={activeText} name="Job Number"/>
        <SquareLabelDirectData onClick={onClick} activeText={activeText} name="Labor Types"/>
      </div>
      <div className="flex" style={{
        width: "20em",
        justifyContent: "space-between"
      }}>
        <div className="flex" style={{flexDirection: "column"}}>
          {(activeText === "Employee") && <AddInput type="text" text="full name" value={fullName} onChange={setFullName}/>}
          {(activeText === "Employee") && <AddInput type="text" text="job title" value={jobTitle} onChange={setJobTitle}/>}
          {(activeText === "Employee") && <AddInput type="number" text="travel time" value={travelTime} onChange={setTravelTime}/>}
          {(activeText === "Job Number") && <AddInput type="text" text="job number" value={jobNumber} onChange={setJobNumber}/>}
          {(activeText === "Labor Types") && <AddInput type="text" text="labor type" value={laborType} onChange={setLaborType}/>}
          {(activeText === "Employee") && <div className="flex" style={{
            width: "19em",
            justifyContent: "space-around",
            marginTop: "1em"
          }}>
            <Toggle
              text="Contractor"
              onClick={() => setIsContractor(!isContractor)}
              isOn={isContractor}/>
            <Toggle
              text="Technician"
              onClick={() => setIsTechnician(!isTechnician)}
              isOn={isTechnician}/>
          </div>}
        </div>
        {(activeText !== "") && <div>
          <i className="fas fa-plus-square" style={{
            color: "var(--darkGreen)",
            fontSize: "3em"
          }} onClick={add}></i>
        </div>}
      </div>
    </div>
  </div>)
}

const DashboardBody = () => {
  const {
    dispatch,
    jobNumbers,
    laborTypes,
    isAdminMode,
    selectedItems
  } = useContext(DashboardContext);

  useEffect(() => {
    Axios.fetchJobNumbers(dispatch);
    Axios.fetchLaborTypes(dispatch);
  }, []);

  const data = [
    {sectionName: "JOB NUMBERS", icon: "fas fa-briefcase", className: "paperOne", data: Util.reorderData(jobNumbers, isAdminMode) || [], fieldKey: "number", stateField: "jobNumbers", actions: ["SET_SELECTED_JOB_NUMBERS", "DELETE_JOB_NUMBER"], hasSelectedItems: Util.hasSelectedJobNumbers},
    {sectionName: "LABOR TYPES", icon: "fab fa-black-tie", className: "paperTwo", data: Util.reorderData(laborTypes, isAdminMode) || [], fieldKey: "name", stateField: "laborTypes", actions: ["SET_SELECTED_LABOR_TYPES", "DELETE_LABOR_TYPE"], hasSelectedItems: Util.hasSelectedLaborTypes}
  ];

  const show = (data) => {
    const {
      laborTypes,
      jobNumbers,
      employees
    } = selectedItems;
    if(isAdminMode) return true;
    if(employees[0]){
      const {
        isTech,
        isContractor
      } = employees[0];
      const isOffice = !isTech && !isContractor;
      if(isContractor){
        return false;
      } else if (isTech && (data.sectionName === "JOB NUMBERS" || data.sectionName === "LABOR TYPES")) {
        return true;
      } else if(isOffice && data.sectionName === "JOB NUMBERS") {
        return true;
      }
    }
    return false;
  }

  return (<div id="dashboardBodyContainer">
    <div id="DashboardBody">
      {data.map((data, index) => show(data) && <Paper key={index} {...data} />)}
      <TimeTrackBar />
      {isAdminMode && <AddBar />}
    </div>
  </div>)
}

const Dashboard = () => {
  return (<div id="Dashboard" className="container">
    <ReactNotification />
    <TopLeftFold styles={styles.TopLeftFold}/>
    <DashboardHead />
    <DashboardBody />
    <DashboardSidePopOut />
  </div>)
}

const DashboardSidePopOut = () => {
  const {
    dispatch,
    isSideBarOpen
  } = useContext(DashboardContext);
  return (<div className={`DashboardSidePopOut flex ${isSideBarOpen && "open"}`}>
    <IconButton isActive={true} text={"ACTIVATE"} icon="fas fa-link" onClick={() => dispatch({ type: Types.BULK_ACTIVATE, payload: {
        fn: () => {
          fetch(dispatch);
          dispatch({
            type: Types.OPEN_SIDE_BAR,
            payload: false
          })
        }
      }
    })}/>
    <IconButton isActive={true} text={"DEACTIVATE"} icon="fas fa-unlink" onClick={() => dispatch({ type: Types.BULK_DEACTIVATE, payload: {
        fn: () => {
          fetch(dispatch);
          dispatch({
            type: Types.OPEN_SIDE_BAR,
            payload: false
          })
        }
      }
    })}/>
    <IconButton isActive={true} text={"DELETE"} icon="far fa-trash-alt" onClick={() => dispatch({ type: Types.DELETE_EMPLOYEE, payload: {
        fn: () => {
          fetch(dispatch);
          dispatch({
            type: Types.OPEN_SIDE_BAR,
            payload: false
          })
        }
      }
    })}/>
  </div>)
}

const styles = {
  TopLeftFold: {
    height: 50,
    width: 50,
    backgroundColor: "#FFFFFF"
  },
  selectBarIcon: {
    color: "#fff",
    opacity: 0.6
  }
}

const DateTimeWeather = () => {

  const [time, setTime] = useState(moment().format('MM/DD/YYYY hh:mm:ssA'));
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    function update() {
      setTime(moment().format('MM/DD/YYYY hh:mm:ssA'));
    }
    setInterval(update, 1000);
    const apiKey = "1001a1dcc738f2ecade5496fbf796f50";
    const cityId = "4562144&APPID";
    const string = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}=${apiKey}`
    axios.get(string).then(data => {
      const K = data.data.list[0].main.temp;
      const F = (K - 273.15) * (9/5) + 32;
      setTemp(`${F.toFixed(2)} F`);
      setIcon(data.data.list[0].weather[0].icon)
    })
  }, []);

  const {
    dispatch
  } = useContext(DashboardContext);

  return (<div id="dateTimeWeather" className="flex">
    <p>
      <i className="fas fa-calendar"></i>
      {time}
      {" | "}
      <i className="fas fa-temperature-low"></i>
      {`${temp}`}
      <span>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      </span>
    </p>
  </div>);
}

export default {
  SideBar,
  TopBar,
  Dashboard
}
