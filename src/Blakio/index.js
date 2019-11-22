import React, { useState, useContext, useEffect } from 'react';

import moment from "moment";
import axios from "axios";
import DatePicker from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    selectedItems
  } = useContext(DashboardContext);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
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
        {props.data.map((data, i) => {
          return (<div
            key={i}
            className={`SelectBarParent ${(selectedItems.employees[0] === data) && "selected"}`}
            onClick={() => {
              let payload = (!selectedItems.employees[0]) ? [data] : (selectedItems.employees[0] === data) ? [] : [data];
              dispatch({
                type: Types.SET_SELECTED_EMPLOYEES,
                payload
              })
            }}>
            <SelectBar icon="fas fa-user-tie" text={data.name} selectBarIcon={styles.selectBarIcon}/>
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
  return (<div id="TopBar" className="container flex">
    <i className="fas fa-cloud-download-alt"></i>
    <DateTimeWeather />
  </div>)
};

const TopLeftFold = (props) => {
  // requirements
  // height and width needs to be an integer
  return (<div id="TopLeftFold" style={props.styles}>
    <div className="backFold" style={{
      height: props.styles.height * 2,
      width: props.styles.width * 2
    }}></div>
  </div>)
}

const DataPickerTwoDate = () => {
  const {
    dispatch
  } = useContext(DashboardContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (<div className="DataPickerTwoDate">
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
  </div>)
}

const DashboardHead = () => {
  const {
    isAdminMode,
    dispatch
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
    {/*<DataPickerTwoDate />*/}
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
      type: Types[props.action],
      payload: group
    })
  }

  const fetch = () => {
    Axios.fetchEmployees(dispatch);
    Axios.fetchJobNumbers(dispatch);
    Axios.fetchLaborTypes(dispatch);
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
      <IconButton isActive={props.hasSelectedItems(state.selectedItems)} text={"ACTIVATE"} icon="fas fa-link" onClick={() => dispatch({ type: Types.BULK_ACTIVATE, payload: {fn: () => fetch()} })}/>
      <IconButton isActive={props.hasSelectedItems(state.selectedItems)} text={"DEACTIVATE"} icon="fas fa-unlink" onClick={() => dispatch({ type: Types.BULK_DEACTIVATE, payload: {fn: () => fetch()} })}/>
      <IconButton isActive={props.hasSelectedItems(state.selectedItems)} text={"DELETE"} icon="far fa-trash-alt" onClick={() => dispatch({ type: Types.BULK_DELETE, payload: {fn: () => fetch()} })}/>
    </div>}
  </div>)
}

const TimeTrackBar = () => {
  const {
    dispatch,
    selectedItems
  } = useContext(DashboardContext);

  return (<div id="TimeTrackBar">
    <DashPaperRoundedHead
      icon="fas fa-clock"
      sectionName="time sheet"
    />
    <div className="flex" style={{justifyContent: "space-around"}}>
      <IconButton isActive={Util.getActiveTimeButtomStatus("CLOCK IN", selectedItems)} text={"CLOCK IN"} icon="fas fa-clock" onClick={() => dispatch({
        type: Types.CLOCK_IN,
        payload: () => fetch(dispatch)
      })}/>
      <IconButton isActive={Util.getActiveTimeButtomStatus("TO LUNCH", selectedItems)} text={"TO LUNCH"} icon="fas fa-drumstick-bite" onClick={() => dispatch({
        type: Types.GO_TO_LUNCH,
        payload: () => fetch(dispatch)
      })}/>
      <IconButton isActive={Util.getActiveTimeButtomStatus("FROM LUNCH", selectedItems)} text={"FROM LUNCH"} icon="fas fa-bone" onClick={() => dispatch({
        type: Types.BACK_FROM_LUNCH,
        payload: () => fetch(dispatch)
      })}/>
      <IconButton isActive={Util.getActiveTimeButtomStatus("CLOCK OUT", selectedItems)} text={"CLOCK OUT"} icon="fas fa-clock" onClick={() => dispatch({
        type: Types.CLOCK_OUT,
        payload: () => {
          Axios.reset(selectedItems.employees[0].id, () => fetch(dispatch))
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

  const fetch = () => {
    Axios.fetchEmployees(dispatch);
    Axios.fetchJobNumbers(dispatch);
    Axios.fetchLaborTypes(dispatch);
  }

  const onClick = (name) => {
    (activeText === name) ? setActiveText("") : setActiveText(name);
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
      }, fetch);
    } else if (activeText === "Job Number"){
      Axios.addJobNumber({
        isActive: true,
        number: jobNumber
      }, fetch);
    } else if (activeText === "Labor Types"){
      Axios.addLaborType({
        isActive: true,
        name: laborType
      }, fetch);
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
    isAdminMode
  } = useContext(DashboardContext);

  useEffect(() => {
    Axios.fetchJobNumbers(dispatch);
    Axios.fetchLaborTypes(dispatch);
  }, []);

  const data = [
    {sectionName: "JOB NUMBERS", icon: "fas fa-briefcase", className: "paperOne", data: Util.reorderData(jobNumbers, isAdminMode) || [], fieldKey: "number", stateField: "jobNumbers", action: "SET_SELECTED_JOB_NUMBERS", hasSelectedItems: Util.hasSelectedJobNumbers},
    {sectionName: "LABOR TYPES", icon: "fab fa-black-tie", className: "paperTwo", data: Util.reorderData(laborTypes, isAdminMode) || [], fieldKey: "name", stateField: "laborTypes", action: "SET_SELECTED_LABOR_TYPES", hasSelectedItems: Util.hasSelectedLaborTypes}
  ]
  return (<div id="dashboardBodyContainer">
    <div id="DashboardBody">
      {data.map((data, index) => <Paper key={index} {...data} />)}
      <TimeTrackBar />
      {isAdminMode && <AddBar />}
    </div>
  </div>)
}

const Dashboard = () => {
  return (<div id="Dashboard" className="container">
    <TopLeftFold styles={styles.TopLeftFold}/>
    <DashboardHead />
    <DashboardBody />
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
