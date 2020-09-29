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

import ClockIn from "./page/timesheet/ClockIn/index.js";
import WorkedHours from "./page/timesheet/WorkedHours/index.js";
import TimeSummary from "./page/timesheet/TimeSummary/index.js";
import Notes from "./page/timesheet/Notes/index.js";

import EmployeeTable from "./page/employeeDirectory/EmployeeTable";
import EmployeeForm from "./page/employeeDirectory/EmployeeForm";
import EmployeeEditForm from "./page/employeeDirectory/EmployeeEditForm";

import ProductTable from "./page/products/ProductTable";
import ProductForm from "./page/products/ProductForm";
import ProductEditForm from "./page/products/ProductEditForm";

import ItemScreen from "./page/pointOfSale/ItemScreen";
import TransactionTable from "./page/transaction/TransactionTable";
import ItemsPurchasedTable from "./page/transaction/ItemsPurchasedTable";
import LoginScreen from "./page/loginScreen";

import {
  CircleBtns,
  HamburgerMenu,
  Grid,
  SideBarPaper,
  TopLeftFold
} from "blakio_home/components";

import 'react-widgets/dist/css/react-widgets.css';

import Swipe from 'react-easy-swipe';

const load = (dispatch, bool) => {
  dispatch({
    type: Types.IS_LOADING,
    payload: bool
  });
}

const SideBarHead = () => {
  const [state, dispatch] = StateContext();
  const {
    shortMenu
  } = state.sideBarOptions;

  const onClick = () => {
    dispatch({
      type: Types.SHORT_MENU,
      payload: !shortMenu
    })
  }

  useEffect(() => {
    Util.openPhoneMode(dispatch, true);
  }, []);

  const margin = shortMenu ? "0 auto" : "0 0.58em";
  const width = shortMenu ? "80%" : null;

  return (<div id="SideBarHead" className={`flex ${shortMenu ? "shortMenu" : ""}`}>
    {!shortMenu && <img src={logo} alt="logo" />}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: shortMenu ? "100%" : "auto",
        margin
      }}
    >
      <HamburgerMenu size={30} width={width} onClick={onClick} />
    </div>
  </div>)
}

const DashboardHead = () => {
  const [state, dispatch] = StateContext();

  const {
    sideBarOptions
  } = state;

  const {
    shortMenu,
    sideBar,
    sideBarOption
  } = sideBarOptions;

  const menuButtons = [
    {
      text: "Update",
      icon: "fas fa-spinner",
      onClick: () => window.location.reload(false)
    },
    {
      text: "Menu",
      icon: "fas fa-ellipsis-h",
      onClick: () => {
        if (shortMenu) {
          dispatch({
            type: Types.TOGGLE_MOBILE_MENU
          })
        } else {
          dispatch({
            type: Types.SHORT_MENU,
            payload: true
          })
        }
      }
    }
  ]

  const selected = sideBar.filter(data => data.title === sideBarOption);
  const label = sideBar.length && selected[0] && selected[0].title.toUpperCase();
  return (<div id="DashboardHead" className={`${shortMenu && "shortMenu"}`}>
    <div className="flex">
      <p id="DashboardTitleText">{label ? label : ""}</p>
    </div>
    <div id="dashboardHeadMenu" className="flex">
      {menuButtons.map((data, index) => (<a key={index} className="flex" onClick={data.onClick}>
        <i className={data.icon}></i>
        <p>{data.text}</p>
      </a>))}
    </div>
  </div>)
}

const TimeSheet = props => {
  const [state, dispatch] = StateContext();

  if (!props.show) return <div></div>;
  return (<div>
    <Grid grid="3">
      <ClockIn />
      {state.timeSheet.clockIn.selectedEmployee ? <WorkedHours /> : <div></div>}
      {state.timeSheet.clockIn.selectedEmployee ? <Notes /> : <div></div>}
    </Grid>
    {state.timeSheet.clockIn.selectedEmployee && <Grid grid="1">
      <TimeSummary />
    </Grid>}
  </div>)
}

const EmployeeDirectory = props => {
  const [state, dispatch] = StateContext();

  if (!props.show) return <div></div>;
  return (<div>
    <Grid grid="2">
      {!state.employeeDirectory.updateId ? <Grid grid="1">
        <EmployeeTable />
      </Grid> : <Grid grid="1">
          <EmployeeEditForm />
        </Grid>}
      <Grid grid="1">
        <EmployeeForm />
      </Grid>
    </Grid>
    <Grid grid="2">
      {!state.products.updateId ? <Grid grid="1">
        <ProductTable />
      </Grid> : <Grid grid="1">
          <ProductEditForm />
        </Grid>}
      <Grid grid="1">
        <ProductForm />
      </Grid>
    </Grid>
  </div>)
}

const Product = props => {
  if (!props.show) return <div></div>;
  return (<div>
    <Grid grid="2">
      <Grid grid="1">
        <ProductTable />
      </Grid>
      <Grid grid="1">
        <ProductForm />
      </Grid>
    </Grid>
  </div>)
}

const PointOfSale = props => {
  const [state, dispatch] = StateContext();

  if (!props.show) return <div></div>;
  return (<div>
    <Grid grid="2">
      <Grid grid="1">
        <ProductTable page={"pos"} />
      </Grid>
      <Grid grid="1">
        <ItemScreen />
      </Grid>
    </Grid>
    <Grid grid="1">
      {
        !state.payments.paymentId ?
          <Grid grid="1">
            <TransactionTable />
          </Grid> : <Grid grid="1">
            <ItemsPurchasedTable />
          </Grid>
      }
    </Grid>
    <Grid grid="2">
      {!state.products.updateId ? <Grid grid="1">
        <ProductTable />
      </Grid> : <Grid grid="1">
          <ProductEditForm />
        </Grid>}
      <Grid grid="1">
        <ProductForm />
      </Grid>
    </Grid>
  </div>)
}

const Transaction = props => {
  if (!props.show) return <div></div>;
  return (<div>
    <Grid grid="2">
      <Grid grid="1">
        <TransactionTable />
      </Grid>
      <Grid grid="1">
        <ItemsPurchasedTable />
      </Grid>
    </Grid>
  </div>)
}

const Footer = () => {
  return (<div className="footer">
  </div>)
}

const DashboardBody = () => {
  const [state, dispatch] = StateContext();

  const menuButtons = [
    {
      // text: "refresh",
      use: "refresh",
      icon: "fas fa-cloud-download-alt",
      color: "blue",
      onClick: () => window.location.reload(false)
    },
    {
      use: "menu",
      icon: "fas fa-bars",
      color: "blue",
      onClick: () => {
        dispatch({
          type: Types.TOGGLE_MOBILE_MENU
        })
      }
    }
  ];

  const getMenuButtons = () => {
    let usedMenuButtons = menuButtons;
    if (!state.sideBarOptions.shortMenu) {
      const filtered = usedMenuButtons.filter(data => data.use !== "menu");
      usedMenuButtons = filtered;
    }
    return usedMenuButtons;
  }


  return (<div id="dashboardBodyContainer" className={state.sideBarOptions.shortMenu ? "shortMenu" : ""}>
    <div id="DashboardBody">
      <TimeSheet show={state.sideBarOptions.sideBarOption === "Timesheet"} />
      <EmployeeDirectory show={state.sideBarOptions.sideBarOption === "Directory"} />
      <PointOfSale show={state.sideBarOptions.sideBarOption === "Point Of Sale"} />
      {/* <Product show={state.sideBarOptions.sideBarOption === "Product"} /> */}
      {/* <Transaction show={state.sideBarOptions.sideBarOption === "Transactions"} /> */}
    </div>
    <Footer />
    {/* <CircleBtns
      buttons={getMenuButtons()}
    /> */}
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
      const F = (K - 273.15) * (9 / 5) + 32;
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
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
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
    if (state.sideBarOptions.sideBar.length && !state.sideBarOptions.sideBarOption) {
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

  let classes = "container flex";
  if (state.sideBarOptions.shortMenu) {
    classes += " shortMenu"
  }
  if (state.mobileMenuOpen) {
    classes += " open"
  }

  return (<div id="SideBar" className={classes}>
    <SideBarHead />
    {state.sideBarOptions.sideBar.map((data, index) =>
      (data.isActive ? <SideBarPaper key={index} {...data} shortMenu={state.sideBarOptions.shortMenu} /> : <></>)
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
  const [xInitial, setXInitial] = useState(false)
  const [yInitial, setYInitial] = useState(false)

  const onSwipeStart = e => {
    console.log(e)
  }

  let x, y;

  const onSwipeMove = (position, event) => {
    if (!xInitial) {
      setXInitial(position.x)
      setYInitial(position.y)
    }
    x = position.x;
    y = position.y;
  }

  const onSwipeEnd = e => {
    const yInRange = Math.abs((y - yInitial) < 1600);
    const absX = Math.abs(x);
    const absXInitial = Math.abs(xInitial);
    if ((x + xInitial > 0) && (absX - absXInitial > 100)) {
      if (!state.mobileMenuOpen && state.sideBarOptions.shortMenu) {
        dispatch({
          type: Types.TOGGLE_MOBILE_MENU
        })
      }
    } else if ((x + xInitial < 0) && (absXInitial - absX < 100)) {
      if (state.mobileMenuOpen && state.sideBarOptions.shortMenu) {
        dispatch({
          type: Types.TOGGLE_MOBILE_MENU
        })
      }
    }
    setXInitial(false);
    setYInitial(false);
  }

  const foldSize = state.sideBarOptions.shortMenu ? 20 : 25;

  return (<div id="Dashboard" className={`container ${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    <Swipe
      onSwipeStart={onSwipeStart}
      onSwipeMove={onSwipeMove}
      onSwipeEnd={onSwipeEnd}
    >
      <TopLeftFold height={foldSize} width={foldSize} backgroundColor="#FFFFFF" />
      <DashboardHead />
      <DashboardBody />
    </Swipe>
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
