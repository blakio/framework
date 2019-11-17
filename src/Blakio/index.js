import React from 'react';
import './Blakio.css';

const SAMPLE = () => {
  return (<div id="SAMPLE">
  </div>)
}

const SideBar = () => {
  return (<div id="SideBar" className="container">
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

const Dashboard = () => {
  return (<div id="Dashboard" className="container">
    <TopLeftFold styles={styles.TopLeftFold}/>
  </div>)
}

const styles = {
  TopLeftFold: {
    height: 50,
    width: 50,
    backgroundColor: "#FFFFFF"
  }
}

export default {
  SideBar,
  TopBar,
  Dashboard
}
