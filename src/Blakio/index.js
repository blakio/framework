import React, { useState, useContext, useEffect } from 'react';

import moment from "moment";
import axios from "axios";

import './Blakio.css';

import logo from "../imgs/logo.png";

import Axios from "../Axios";
import Types from "../Context/Types";
import DashboardContext from "../Context/State";

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
          return (<div key={i} className="SelectBarParent">
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
      headers={data.headers}
      data={data.data} />)}
  </div>)
};

const Toggle = (props) => {
  const {
    dispatch,
    isAdminMode
  } = useContext(DashboardContext);
  return (<div className="Toggle flex" onClick={() => {
    dispatch({
      type: Types.TOGGLE_ADMIN_MODE
    })
  }}>
    {isAdminMode && <i class="fas fa-toggle-on"></i>}
    {!isAdminMode && <i class="fas fa-toggle-off"></i>}
    <p>Edit</p>
  </div>)
}

const TopBar = () => {
  return (<div id="TopBar" className="container flex">
    <DateTimeWeather />
    <Toggle/>
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

const DashboardHead = () => {
  return (<div id="DashboardHead" className="flex">
    <i className="fas fa-columns"></i>
    <p style={{margin: 0, marginLeft: 10}}>DASHBOARD</p>
  </div>)
}

const DashPaperRoundedHead = (props) => {
  return (<div className="DashPaperRoundedHead darkGreen">
    <p><i className={props.icon}></i>{props.sectionName}</p>
  </div>)
}

const IconButton = (props) => {
  return (<div className="IconButton flex">
    <i className={props.icon}></i>
    <p>{props.text}</p>
  </div>)
}

const SquareLabel = (props) => {
  return (<div
    className={`SquareLabel ${props.isActive && "active"}`}
    onClick={() => props.setIsActive(props.data)}>
    {props.data[props.fieldKey]}
  </div>)
}

const Paper = (props) => {
  const {
    dispatch,
    isAdminMode
  } = useContext(DashboardContext);

  const setIsActive = (data) => {
    debugger
  }

  return (<div className={`Paper flex`} style={{backgroundColor: "#fff"}}>
    <DashPaperRoundedHead
      sectionName={props.sectionName}
      icon={props.icon}
    />
    <div className="flex" style={{flexWrap: "wrap"}}>
      {props.data.map((data, index) => <SquareLabel data={data} fieldKey={props.fieldKey} isActive={false} setIsActive={setIsActive}/>)}
    </div>
    {isAdminMode && <div className="PaperBottomBar flex">
      <IconButton text={"ACTIVATE"} icon="fas fa-link"/>
      <IconButton text={"DEACTIVATE"} icon="fas fa-unlink"/>
      <IconButton text={"ADD"} icon="far fa-plus-square"/>
      <IconButton text={"DELETE"} icon="far fa-trash-alt"/>
    </div>}
  </div>)
}

const TimeTrackBar = () => {
  return (<div id="TimeTrackBar" className="flex">
    <IconButton text={"CLOCK IN"} icon="fas fa-clock"/>
    <IconButton text={"LUNCH"} icon="fas fa-drumstick-bite"/>
    <IconButton text={"FROM LUNCH"} icon="fas fa-bone"/>
    <IconButton text={"CLOCK OUT"} icon="fas fa-clock"/>
  </div>)
}

const DashboardBody = () => {
  const {
    dispatch,
    jobNumbers,
    laborTypes
  } = useContext(DashboardContext);

  useEffect(() => {
    Axios.fetchJobNumbers(dispatch);
    Axios.fetchLaborTypes(dispatch);
  }, []);

  const data = [
    {sectionName: "JOB NUMBERS", icon: "fas fa-briefcase", className: "paperOne", data: jobNumbers || [], fieldKey: "number"},
    {sectionName: "LABOR TYPES", icon: "fab fa-black-tie", className: "paperTwo", data: laborTypes || [], fieldKey: "name"}
  ]
  return (<div id="dashboardBodyContainer">
    <div id="DashboardBody">
      {data.map((data, index) => <Paper key={index} {...data} />)}
      <TimeTrackBar />
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

  const [time, setTime] = useState(moment().format('MM/DD/YYYY hh:mm:ssA'))
  const [temp, setTemp] = useState("")
  const [icon, setIcon] = useState("")

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
      <i class="fas fa-temperature-low"></i>
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
