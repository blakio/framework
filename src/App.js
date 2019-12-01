import React, { useReducer } from 'react';
import './App.css';
import Blakio from "./Blakio";
import BlakioUI from "./Blakio/Framework";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import DashboardContext from "./Context/State";
import Reducer from "./Context/Reducer";
import initialState from "./Context/InitialState";

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (<DashboardContext.Provider value={{...state, dispatch}}>
    <div id="App">
      <Blakio.SideBar />
      <div id="ContentArea">
        <Blakio.TopBar />
        <Blakio.Dashboard />
      </div>
      {state.isLoading && <BlakioUI.LoadingScreen />}
    </div>
  </DashboardContext.Provider>);
}

export default App;
