import React, { useState, useContext, useEffect } from 'react';

import './Blakio.css';

// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM5NjY4ODd9.8phBRfYpSE4l6FSKaWQU0rF3XFKYqRYF2iOrVojs5iE"

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

const TopBar = () => {
  return (<div id="TopBar" className="container">
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

const Paper = () => {
  return (<div className="Paper" style={{backgroundColor: "#fff"}}>
  </div>)
}

const DashboardBody = () => {
  return (<div id="DashboardBody">
    <Paper />
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

export default {
  SideBar,
  TopBar,
  Dashboard
}
