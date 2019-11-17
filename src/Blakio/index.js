import React from 'react';

import './Blakio.css';

import logo from "../imgs/logo.png";

const SAMPLE = () => {
  return (<div id="SAMPLE">
  </div>)
}

const RoundedHeader = (props) => {
  return (<div id="RoundedHeader" className="flex">
    <p className="roundedHeaderText" style={props.styles.text}>{props.text}</p>
    <i class="fas fa-user" style={props.styles.icon}></i>
  </div>)
}

const SelectBar = (props) => {
  return (<div className="SelectBar flex">
    <div style={{marginLeft: 20, marginRight: 20}}>
      <i class={props.icon} style={props.selectBarIcon}></i>
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
      <i class="fas fa-bars" style={{
        fontSize: props.styles.size * 0.4
    }}></i>
  </div>)
}

const BottomBarText = () => {
  return (<div className="BottomBarText">
    Project Manager
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

const SideBarSection = () => {
  const parentArray = [1, 2, 3, ]
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  return (<div className="SideBarSection">
    {parentArray.map((data, index) => {
      return (<div key={index} className="innerBar">
        <RoundedHeader styles={{
          text: {
            color: "#fff",
            fontSize: "12px",
            backgroundColor: "rgba(0, 37, 78, 0.5)"
          },
          icon: {
            color: "rgb(0, 37, 78)"
          }
        }} text={"EMPLOYEES"}/>
        {array.map((data, i) => {
          return (<div key={i} className="SelectBarParent">
            <SelectBar icon="fas fa-user-tie" text="Full Name" selectBarIcon={styles.selectBarIcon}/>
            <BottomBarText />
          </div>)
        })}
      </div>)
    })}
  </div>)
}

const SideBar = () => {
  return (<div id="SideBar" className="container flex">
    <SideBarHead />
    <SideBarSection />
    <SideBarSection />
    <SideBarSection />
    <SideBarSection />
    <SideBarSection />
    <SideBarSection />
    <SideBarSection />
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
    <i class="fas fa-columns"></i>
    <p style={{margin: 0, marginLeft: 10}}>DASHBOARD</p>
  </div>)
}

const Paper = (props) => {
  return (<div className={`Paper ${props.col}`}>
    hey
  </div>)
}

const DashboardBody = () => {
  return (<div id="DashboardBody">
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
    <Paper col="col-12"/>
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
