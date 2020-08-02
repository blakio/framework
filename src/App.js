import React, {
  useEffect
} from 'react';
import './App.css';
import {
  SideBar,
  TopBar,
  Dashboard,
  LoadingScreen,
  LogIn
} from "./Blakio";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import {
  StateProvider,
  StateContext
} from "./Context/State";
import Types from './Context/Types';

const Loading = () => {
  const [state, dispatch] = StateContext();
  return state.isLoading && <LoadingScreen />
}

const ContentArea = () => {
  const [state, dispatch] = StateContext();

  return (<div id="ContentArea" className={`${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    <TopBar />
    <Dashboard />
</div>)
}

function App() {
  return (<StateProvider>
    <ReactNotification />
    <LogIn />
    {/* <div id="App">
      <SideBar />
      <ContentArea />
      <Loading />
    </div> */}
  </StateProvider>);
}

export default App;
