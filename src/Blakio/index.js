import React, { useState, useContext, useEffect } from 'react';

import moment from "moment";
import axios from "axios";

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

import appData from "../appData";

import BlakioUI from "Blakio/Framework";
const {
  SideBarPaper,
  Panel,
  IconButton,
  TopLeftFold,
  HamburgerMenu,
  Table,
  DataVisualization
} = BlakioUI;

const load = (dispatch, bool) => {
  dispatch({
    type: Types.IS_LOADING,
    payload: bool
  });
}

const SideBarHead = () => {
  const onClick = () => {
    console.log("clicked menu")
  }

  return (<div id="SideBarHead" className="flex">
    <img src={logo} alt="logo" />
    <HamburgerMenu size={30} onClick={onClick}/>
  </div>)
}

const DashboardHead = () => {
  return (<div id="DashboardHead" className="flex">
    <div className="flex">
      <p id="DashboardTitleText">DASHBOARD</p>
    </div>
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
      <IconButton isActive={true} text={"CLOCK IN"} icon="fas fa-clock" onClick={() => {}}/>
      <IconButton isActive={false} text={"TO LUNCH"} icon="fas fa-drumstick-bite" onClick={() => {}}/>
      <IconButton isActive={false} text={"FROM LUNCH"} icon="fas fa-bone" onClick={() => {}}/>
      <IconButton isActive={false} text={"CLOCK OUT"} icon="fas fa-clock" onClick={() => {}}/>
    </div>
  </div>)
}

const DashboardBody = () => {
  const {
    ...context
  } = useContext(DashboardContext);

  const components = {
    timesheet: [<TimeTrackBar key={0} />],
    charts: [<DataVisualization key={0} />],
    table: [<Table key={0} />]
  }

  return (<div id="dashboardBodyContainer">
    <div id="DashboardBody">
      {appData.dahsboard.map((data, index) => Util.showComponent(data, context) && <Panel key={index} heading={data.title} components={[components[data.component]]}/>)}
    </div>
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
  const cityId = "4560349";
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
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon"/>
      </span>
    </p>
  </div>);
}

const SideBar = () => {
  const {
    ...context
  } = useContext(DashboardContext);

  const customFn = {
    selectTimesheet: (data) => {
      console.log(data)
    },
    selectEmployeeDropwdown: (data) => {
      console.log(data)
    },
    selectEmployee: (data) => {
      console.log(data)
    }
  }

  Util.adjustSideBarData(appData, context, Types, customFn);

  return (<div id="SideBar" className="container flex">
    <SideBarHead />
    {appData.sideBar.map((data, index) => 
      <SideBarPaper key={index} {...data} />
    )}
  </div>)
}

const TopBar = () => {
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
