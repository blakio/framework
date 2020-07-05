import React, { useReducer } from 'react';
import './App.css';
import {
  SideBar,
  TopBar,
  Dashboard,
  LoadingScreen
} from "./Blakio";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import {
  StateProvider,
  StateContext
} from "./Context/State";

const ContentArea = () => {
  const [state, dispatch] = StateContext();

  return (<div id="ContentArea" className={`${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    <TopBar />
    <Dashboard />
</div>)
}

function App() {
  return (<StateProvider>
    <div id="App">
      <SideBar />
      <ContentArea />
      {StateContext.isLoading && <LoadingScreen />}
    </div>
  </StateProvider>);
}

export default App;
