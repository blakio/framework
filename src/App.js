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

function App() {
  return (<StateProvider>
    <div id="App">
      <SideBar />
      <div id="ContentArea" className={`${StateContext.shortMenu && "shortMenu"}`}>
        <TopBar />
        <Dashboard />
      </div>
      {StateContext.isLoading && <LoadingScreen />}
    </div>
  </StateProvider>);
}

export default App;
