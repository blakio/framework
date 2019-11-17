import React, { useReducer } from 'react';
import './App.css';
import Blakio from "./Blakio";

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
    </div>
  </DashboardContext.Provider>);
}

export default App;
