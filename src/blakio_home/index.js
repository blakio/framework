import React, { useState, useEffect } from 'react';

import moment from "moment";
import axios from "axios";

import Loader from 'react-loader-spinner'

import './Blakio.css';

import Util from "blakio_util";
import logo from "../imgs/logo.png";
import Axios from "blakio_axios";
import Types from "blakio_context/Types";
import {
  StateContext
} from "blakio_context/State";


import BlakioUI from "blakio_home/Framework";

import ClockIn from "./page/timesheet/ClockIn/index.js";
import WorkedHours from "./page/timesheet/WorkedHours/index.js";
import TimeSummary from "./page/timesheet/TimeSummary/index.js";
import Notes from "./page/timesheet/Notes/index.js";

import EmployeeTable from "./page/employeeDirectory/EmployeeTable";
import EmployeeForm from "./page/employeeDirectory/EmployeeForm";

import ItemScreen from "./page/pointOfSale/ItemScreen";
import PurchaseScreen from "./page/pointOfSale/PurchaseScreen";

import LoginScreen from "./page/loginScreen";

const {
  SideBarPaper,
  TopLeftFold,
  HamburgerMenu,
  Grid
} = BlakioUI;

const load = (dispatch, bool) => {
  dispatch({
    type: Types.IS_LOADING,
    payload: bool
  });
}

const SideBarHead = () => {
  const [state, dispatch] = StateContext();
  const [isClosed, setIsClosed] = useState(false);

  const onClick = () => {
    setIsClosed(!isClosed);
    dispatch({
      type: Types.SHORT_MENU,
      payload: !isClosed
    })
  }

  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      onClick();
    }
  }, []);

  const margin = isClosed ? "0 auto" : "0 1em";
  const width = isClosed ? 62 : null;

  return (<div id="SideBarHead" className={`flex ${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    {!isClosed && <img src={logo} alt="logo" />}
    <div
      style={{
        margin
      }}
    >
      <HamburgerMenu size={30} width={width} onClick={onClick}/>
    </div>
  </div>)
}

const DashboardHead = () => {
  const [state, dispatch] = StateContext();

  const selected = state.sideBarOptions.sideBar.filter(data => data.title === state.sideBarOptions.sideBarOption);
  const label = state.sideBarOptions.sideBar.length && selected[0] && selected[0].title.toUpperCase();
  return (<div id="DashboardHead" className="flex">
    <div className="flex">
      <p id="DashboardTitleText">{label ? label : ""}</p>
    </div>
  </div>)
}

const TimeSheet = props => {
  const [state, dispatch] = StateContext();

  if(!props.show) return <div></div>;
  return (<div>
    <Grid grid="2">
      <ClockIn />
      <Grid grid="1_2">
        {state.timeSheet.clockIn.selectedEmployee ? <WorkedHours /> : <div></div>}
        {state.timeSheet.clockIn.selectedEmployee ? <Notes /> : <div></div>}
      </Grid>
    </Grid>
    {state.timeSheet.clockIn.selectedEmployee && <Grid grid="1" additionalStyles={{
      overflowX: "scroll"
    }}>
      <TimeSummary />
    </Grid>}
  </div>)
}

const EmployeeDirectory = props => {
  if(!props.show) return <div></div>;
  return (<div>
    <Grid grid="1" additionalStyles={{
      overflowX: "scroll"
    }}>
      <EmployeeTable />
      <EmployeeForm />
    </Grid>
  </div>)
}

const PointOfSale = props => {
  if(!props.show) return <div></div>;
  return (<div>
    <Grid grid="2" splitWidth>
      <div style={{
        height: "90vh",
        overflowY: "scroll"
      }}>
        <ItemScreen />
      </div>
      <PurchaseScreen />
    </Grid>
  </div>)
}

const DashboardBody = () => {
  const [state, dispatch] = StateContext();


  return (<div id="dashboardBodyContainer" className={state.sideBarOptions.shortMenu && "shortMenu"}>
    <div id="DashboardBody">
      <TimeSheet show={state.sideBarOptions.sideBarOption === "Timesheet"} />
      <EmployeeDirectory show={state.sideBarOptions.sideBarOption === "Employee Directory"}/>
      <PointOfSale show={state.sideBarOptions.sideBarOption === "Point Of Sale"}/>
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
  const [state, dispatch] = StateContext();


  const setSideBarState = (data) => {
    dispatch({
      type: Types.SET_SIDE_BAR,
      payload: data.data
    })
  }

  useEffect(() => {
    Axios.getSideBar(setSideBarState)
  }, []);

  useEffect(() => {
    if(state.sideBarOptions.sideBar.length && !state.sideBarOptions.sideBarOption){
      dispatch({
        type: Types.SET_SIDE_BAR_OPTION,
        payload: state.sideBarOptions.sideBar[0].title
      })
    }
  }, [state.sideBarOptions.sideBar])

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

  Util.adjustSideBarData(state, dispatch, Types, customFn);

  return (<div id="SideBar" className={`container flex ${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    <SideBarHead />
    {state.sideBarOptions.sideBar.map((data, index) =>
      <SideBarPaper key={index} {...data} shortMenu={state.sideBarOptions.shortMenu} />
    )}
  </div>)
}

const TopBar = () => {
  const [state, dispatch] = StateContext();

  return (<div id="TopBar" className={`container flex ${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    <DateTimeWeather />
  </div>)
}

const Dashboard = () => {
  const [state, dispatch] = StateContext();

  return (<div id="Dashboard" className={`container ${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    {!state.sideBarOptions.shortMenu && <TopLeftFold height={50} width={50} backgroundColor="#FFFFFF"/>}
    {!state.sideBarOptions.shortMenu && <DashboardHead />}
    <DashboardBody />
  </div>)
}

const LoadingScreen = () => {
  return (<div className="LoadingScreen flex">
    <Loader type="MutatingDots" color="#888" height={100} width={100} />
  </div>)
}

const LogIn = () => {
  return (<div>
    <LoginScreen />
  </div>)
}

export {
  LogIn,
  SideBar,
  TopBar,
  Dashboard,
  LoadingScreen
}
