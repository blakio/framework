import React, { useState, useContext, useEffect } from 'react';
import { CSVLink } from "react-csv";

import moment from "moment";
import axios from "axios";

import DatePicker from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

import Loader from 'react-loader-spinner'

import './Blakio.css';

import Util from "../Util";
import logo from "../imgs/logo.png";
import Axios from "../Axios";
import Types from "../Context/Types";
import DashboardContext from "../Context/State";

import BlakioUI from "Blakio/Framework";
const {
  SideBarPaper,
  Panel,
  PaperHead,
  Tags,
  IconButton,
  TopLeftFold,
  HamburgerMenu,
  Toggle,
  Table,
  DataVisualization
} = BlakioUI;

const load = (dispatch, bool) => {
  dispatch({
    type: Types.IS_LOADING,
    payload: bool
  });
}

const fetch = (dispatch) => {
  load(dispatch, true);
  Axios.fetchEmployees(dispatch);
  Axios.fetchJobNumbers(dispatch);
  Axios.fetchLaborTypes(dispatch, () => load(dispatch, false));
}

const SideBarHead = () => {
  const onClick = () => {
    console.log("clicked menu")
  }

  return (<div id="SideBarHead" className="flex">
    <img src={logo} />
    <HamburgerMenu size={30} onClick={onClick}/>
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
    <p className="dateLabel">START DATE</p>
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
    <p className="dateLabel">END DATE</p>
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
        load(dispatch, true);
        dispatch({
          type: Types.GET_CSV_DATA,
          payload: {
            startDate,
            endDate,
            dispatch,
            noData: () => {
              store.addNotification({
                title: "Warning",
                message: `No data available for date range`,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                showIcon: true,
                dismiss: {
                  duration: 5000
                }
              });
            },
            success: () => load(dispatch, false)
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
    dispatch
  } = useContext(DashboardContext);
  return (<div id="DashboardHead" className="flex">
    <div className="flex">
      <p style={{
        margin: 0, marginLeft: 10, fontSize: "1rem", fontWeight: 800, opacity: 0.65
      }}>DASHBOARD</p>
    </div>
    <Toggle
      text="Edit"
      onClick={() => {
        dispatch({
          type: Types.TOGGLE_ADMIN_MODE
        })
      }}
      isActive={isAdminMode}/>
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
          fetch(dispatch);
          setConfirmedNotification(employee);
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
        travelTime: parseFloat(travelTime)
      }, () => { fetch(dispatch) }, res => warning(res));
    } else if (activeText === "Job Number"){
      Axios.addJobNumber({
        isActive: true,
        number: jobNumber
      }, () => { fetch(dispatch) }, res => warning(res));
    } else if (activeText === "Labor Type"){
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

  const labelData = [
    {label: "Employee", isSelected: (activeText === "Employee"), isDisabled: false, onClick: () => onClick("Employee")},
    {label: "Job Number", isSelected: (activeText === "Job Number"), isDisabled: false, onClick: () => onClick("Job Number")},
    {label: "Labor Type", isSelected: (activeText === "Labor Type"), isDisabled: false, onClick: () => onClick("Labor Type")}
  ]

  return (<div className="AddBar">
    <div className="flex" style={{flexDirection: "column"}}>
      <Tags data={labelData}/>
      <div className="flex" style={{
        width: "20em"
      }}>
        <div className="flex" style={{flexDirection: "column"}}>
          {(activeText === "Employee") && <AddInput type="text" text="full name" value={fullName} onChange={setFullName}/>}
          {(activeText === "Employee") && <AddInput type="text" text="job title" value={jobTitle} onChange={setJobTitle}/>}
          {(activeText === "Employee") && <AddInput type="number" text="travel time" value={travelTime} onChange={setTravelTime}/>}
          {(activeText === "Job Number") && <AddInput type="text" text="job number" value={jobNumber} onChange={setJobNumber}/>}
          {(activeText === "Labor Type") && <AddInput type="text" text="labor type" value={laborType} onChange={setLaborType}/>}
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
      </div>
      {(activeText !== "") && <div style={{marginTop: "1em"}}>
        <IconButton isActive={true} text={"ADD"} icon="fas fa-plus-square" onClick={add}/>
      </div>}
    </div>
  </div>)
}

const EditBar = (props) => {

  const {
    dispatch,
    selectedItems,
    employees
  } = useContext(DashboardContext);

  const [activeText, setActiveText] = useState("");
  const [isContractor, setIsContractor] = useState(false);
  const [isTechnician, setIsTechnician] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [travelTime, setTravelTime] = useState(0);
  const [laborType, setLaborType] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeChoices, setEmployeeChoices] = useState([]);

  const onClick = (name) => {
    if(activeText === name){
      setActiveText("")
      setSelectedEmployee(null);
    } else {
      setActiveText(name);
      if(name === "Employee"){
        setEmployeeChoices(employees)
      }
    }
  }

  const onClickEmployee = (data) => {
    setSelectedEmployee(data)
    setFullName(data.name);
    setIsContractor(data.isContractor);
    setIsTechnician(data.isTech);
    setJobTitle(data.jobTitle);
    setTravelTime(data.travelTime);
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

  const edit = (value, data) => {
    if(activeText === "Employee"){
      dispatch({
        type: Types.EDIT_EMPLOYEE,
        payload: {
          id: selectedEmployee._id,
          edits: [
            {key: "isContractor", value: isContractor || false},
            {key: "isTech", value: isTechnician || false},
            {key: "jobTitle", value: jobTitle},
            {key: "name", value: fullName},
            {key: "travelTime", value: travelTime},
          ],
          fn: () => fetch(dispatch),
          warning: res => warning(res)
        }
      })
      setActiveText("");
      setSelectedEmployee(null);
    } else if (activeText === "Job Number"){
      Axios.addJobNumber({
        isActive: true,
        number: jobNumber
      }, () => { fetch(dispatch) }, res => warning(res));
    } else if (activeText === "Labor Type"){
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

  const labelData = [
    {label: "Employee", isSelected: (activeText === "Employee"), isDisabled: false, onClick: () => onClick("Employee")}
  ]

  const employeeData = [];
  employeeChoices.forEach(data => employeeData.push({ label: data.name, onClick: () => onClickEmployee(data) }));

  return (<div className="AddBar">
    <div className="flex" style={{flexDirection: "column"}}>
      <Tags data={labelData} />
      {!selectedEmployee && activeText === "Employee" && <Tags data={employeeData} />}
      <div className="flex">
        <div className="flex" style={{flexDirection: "column"}}>
          {(activeText === "Employee" && selectedEmployee) && <AddInput type="text" text="full name" value={fullName} onChange={setFullName}/>}
          {(activeText === "Employee" && selectedEmployee) && <AddInput type="text" text="job title" value={jobTitle} onChange={setJobTitle}/>}
          {(activeText === "Employee" && selectedEmployee) && <AddInput type="number" text="travel time" value={travelTime} onChange={setTravelTime}/>}
          {(activeText === "Job Number") && <AddInput type="text" text="job number" value={jobNumber} onChange={setJobNumber}/>}
          {(activeText === "Labor Type") && <AddInput type="text" text="labor type" value={laborType} onChange={setLaborType}/>}
          {(activeText === "Employee" && selectedEmployee) && <div className="flex" style={{
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
      </div>
      {(activeText !== "" && selectedEmployee) && <div style={{marginTop: "1em"}}>
        <IconButton isActive={true} text={"EDIT"} icon="far fa-edit" onClick={edit}/>
      </div>}
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
    load(dispatch, true);
    Axios.fetchJobNumbers(dispatch);
    Axios.fetchLaborTypes(dispatch, () => load(dispatch, false));
  }, []);

  const jobNumberList = jobNumbers.length ? Util.reorderData(jobNumbers, isAdminMode) : [];
  const laborTypeList = laborTypes.length ? Util.reorderData(laborTypes, isAdminMode) : [];
  const jobNumberArray = [];
  const laborTypeArray = [];

  jobNumberList.forEach(data => jobNumberArray.push({
    label: data.number,
    isSelected: selectedItems.jobNumbers[0] && selectedItems.jobNumbers[0].number === data.number,
    isDisabled: !data.isActive,
    onClick: () => {
      if(selectedItems.jobNumbers[0] && selectedItems.jobNumbers[0].number === data.number){
        dispatch({
          type: Types.SET_SELECTED_JOB_NUMBERS,
          payload: []
        })
      } else {
        dispatch({
          type: Types.SET_SELECTED_JOB_NUMBERS,
          payload: [data]
        })
      }
    }
  }));

  laborTypeList.forEach(data => laborTypeArray.push({
    label: data.name,
    isSelected: selectedItems.laborTypes[0] && selectedItems.laborTypes[0].name === data.name,
    isDisabled: !data.isActive,
    onClick: () => {
      if(selectedItems.laborTypes[0] && selectedItems.laborTypes[0].name === data.name){
        dispatch({
          type: Types.SET_SELECTED_LABOR_TYPES,
          payload: []
        })
      } else {
        dispatch({
          type: Types.SET_SELECTED_LABOR_TYPES,
          payload: [data]
        })
      }
    }
  }))

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
      } else if (isTech && (data === "JOB NUMBERS" || data === "LABOR TYPES")) {
        return true;
      } else if(isOffice && data === "JOB NUMBERS") {
        return true;
      }
    }
    return false;
  }

  const jobNumberButtons = isAdminMode && (<div className="PaperBottomBar flex">
    <IconButton isActive={Util.hasSelectedJobNumbers(selectedItems)} text={"TOGGLE"} icon="fas fa-toggle-on" onClick={() => dispatch({ type: Types.TOGGLE_JOB_NUMBER, payload: {id: selectedItems.jobNumbers[0]._id, fn: () => fetch(dispatch)} })}/>
    <IconButton isActive={Util.hasSelectedJobNumbers(selectedItems)} text={"DELETE"} icon="far fa-trash-alt" onClick={() => dispatch({ type: Types.DELETE_JOB_NUMBER, payload: {id: selectedItems.jobNumbers[0]._id, fn: () => fetch(dispatch)} })}/>
  </div>);

  const labelTypeButtons = isAdminMode && (<div className="PaperBottomBar flex">
    <IconButton isActive={Util.hasSelectedLaborTypes(selectedItems)} text={"TOGGLE"} icon="fas fa-toggle-on" onClick={() => dispatch({ type: Types.TOGGLE_LABOR_TYPE, payload: {id: selectedItems.laborTypes[0]._id, fn: () => fetch(dispatch)} })}/>
    <IconButton isActive={Util.hasSelectedLaborTypes(selectedItems)} text={"DELETE"} icon="far fa-trash-alt" onClick={() => dispatch({ type: Types.DELETE_LABOR_TYPE, payload: {id: selectedItems.laborTypes[0]._id, fn: () => fetch(dispatch)} })}/>
  </div>);

  return (<div id="dashboardBodyContainer">
    <div id="DashboardBody">
      {show("JOB NUMBERS") && <Panel heading={"JOB NUMBERS"} components={[<Tags key={0} data={jobNumberArray}/>, <BlakioUI.Separator key={1} />, jobNumberButtons]} />}
      {show("LABOR TYPES") && <Panel heading={"LABOR TYPES"} components={[<Tags key={0} data={laborTypeArray}/>, <BlakioUI.Separator key={1} />, labelTypeButtons]} />}
      {!isAdminMode && <Panel heading="time sheet" components={[<TimeTrackBar key={0} />]}/>}
      {isAdminMode && <Panel heading="add items here" components={[<AddBar key={0} />]}/>}
      {isAdminMode && <Panel heading="edit items here" components={[<EditBar key={0} />]}/>}
      {/*<Panel heading="history" noPadding overflow components={[<Table key={0} />]}/>*/}
      {/*<Panel heading="charts" components={[<DataVisualization key={0} />]} />*/}
    </div>
  </div>)
}

const DashboardSidePopOut = () => {
  const {
    dispatch,
    isSideBarOpen,
    selectedItems
  } = useContext(DashboardContext);
  return (<div className={`DashboardSidePopOut flex ${isSideBarOpen && "open"}`}>
    <IconButton isActive={true} text={"TOGGLE"} icon="fas fa-toggle-on" onClick={() => dispatch({ type: Types.TOGGLE_EMPLOYEE, payload: {
        id: selectedItems.employees[0]._id,
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

const DateTimeWeather = () => {

  const [time, setTime] = useState(moment().format('MM/DD/YYYY hh:mm:ssA'));
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");

  const second = 1000;
  const halfHour = 1800000;
  const baseURL = "https://api.openweathermap.org/data/2.5/forecast";
  const apiKey = "1001a1dcc738f2ecade5496fbf796f50";
  const cityId = "4562144";
  const getWeather = () => {
    axios.get(`${baseURL}?id=${cityId}&APPID=${apiKey}`).then(data => {
      const K = data.data.list[0].main.temp;
      const F = (K - 273.15) * (9/5) + 32;
      setTemp(`${F.toFixed(2)} F`);
      setIcon(data.data.list[0].weather[0].icon)
    });
  }

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format('MM/DD/YYYY hh:mm:ssA'));
    }, second);
    setInterval(() => {
      getWeather();
    }, halfHour);
    getWeather();
  }, []);

  return (<div id="dateTimeWeather" className="flex">
    <p>
      <i className="far fa-calendar-alt"></i> {`${time} | `}
      <i className="fas fa-temperature-low"></i>
      {temp}
      <span>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      </span>
    </p>
  </div>);
}

const SideBar = () => {
  const {
    dispatch,
    employees,
    isAdminMode,
    isSideBarOpen,
    jobNumbers,
    laborTypes,
    openList,
    selectedItems
  } = useContext(DashboardContext);

  useEffect(() => {
    load(dispatch, true);
    Axios.fetchEmployees(dispatch, () => load(dispatch, false));
  }, []);

  const sideBarData = {
    head: "timesheet",
    icon: "fas fa-cog",
    data: [
      {
        head: "employees",
        icons: ["far fa-user-circle", "fas fa-circle"],
        isOpen: (openList === "employees"),
        onClick: () => {
          dispatch({
            type: Types.OPENED_LIST,
            payload: "employees"
          })
        },
        data: []
      },
      {
        head: "historical data",
        icons: ["far fa-file-alt", "fas fa-circle"],
        isOpen: (openList === "historical data"),
        onClick: () => {
          dispatch({
            type: Types.OPENED_LIST,
            payload: "historical data"
          })
        },
        data: [],
        component: <DatePickerTwoDate />
      }
    ]
  }

  const getIcon = (data) => {
    if(data.isContractor) return "fas fa-id-card-alt";
    if(data.isTech) return "fas fa-wrench";
    return "fas fa-user-tie"
  }

  const getPushObj = (data) => {
    return {
      icon: getIcon(data),
      text: data.name,
      subText: data.jobTitle,
      isActive: (selectedItems.employees[0] && (data.name === selectedItems.employees[0].name)),
      onClick: () => {
        const employees = (!selectedItems.employees[0] || (selectedItems.employees[0] && selectedItems.employees[0].name !== data.name)) ? [data] : [];
        dispatch({
          type: Types.SET_SELECTED_EMPLOYEES,
          payload: employees
        });
        if(!isAdminMode){
          dispatch({
            type: Types.SET_SELECTED_JOB_NUMBERS,
            payload: data.jobNumber ? [Util.getObjFromArray(data.jobNumber, "number", jobNumbers)] : []
          });
          dispatch({
            type: Types.SET_SELECTED_LABOR_TYPES,
            payload: data.laborType ? [Util.getObjFromArray(data.laborType, "name", laborTypes)] : []
          });
        }
        if(isAdminMode){
          dispatch({
            type: Types.OPEN_SIDE_BAR,
            payload: employees.length
          });
        }
      }
    }
  }

  if(employees.length){
    const list = Util.getEmployees(employees, isAdminMode);
    list.forEach(data => {
      if(!isAdminMode){
        if(data.isActive){
          sideBarData.data[0].data.push(getPushObj(data))
        }
      } else {
        sideBarData.data[0].data.push({ ...getPushObj(data), disabled: !data.isActive })
      }
    })
  }
  
  return (<div id="SideBar" className="container flex">
    <SideBarHead />
    <SideBarPaper head={sideBarData.head} icon={sideBarData.icon} data={sideBarData.data}/>
  </div>)
}

const TopBar = () => {
  const {
    dispatch
  } = useContext(DashboardContext);

  return (<div id="TopBar" className="container flex">
    <DateTimeWeather />
  </div>)
}

const Dashboard = () => {
  return (<div id="Dashboard" className="container">
    <ReactNotification />
    <TopLeftFold height={50} width={50} backgroundColor="#FFFFFF"/>
    <DashboardHead />
    <DashboardBody />
    <DashboardSidePopOut />
  </div>)
}

const LoadingScreen = () => {
  return (<div className="LoadingScreen flex">
    <Loader type="MutatingDots" color="#888" height={100} width={100} />
  </div>)
}

const SAMPLE = () => {
  const {
    dispatch
  } = useContext(DashboardContext);
  return (<div id="SAMPLE">
  </div>)
}

export default {
  SideBar,
  TopBar,
  Dashboard,
  LoadingScreen
}
