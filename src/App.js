import React, { useReducer } from 'react';
import './App.css';
import {
  SideBar,
  TopBar,
  Dashboard,
  LoadingScreen
} from "./Blakio";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import DashboardContext from "./Context/State";
import Reducer from "./Context/Reducer";
import initialState from "./Context/InitialState";

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (<DashboardContext.Provider value={{...state, dispatch}}>
    <div id="App">
      <SideBar />
      <div id="ContentArea" className={`${state.shortMenu && "shortMenu"}`}>
        <TopBar />
        <Dashboard />
      </div>
      {state.isLoading && <LoadingScreen />}
    </div>
  </DashboardContext.Provider>);
}

export default App;
