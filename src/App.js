import React, { useReducer } from 'react';
import './App.css';
import Blakio from "./Blakio";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import DashboardContext from "./Context/State";
import Reducer from "./Context/Reducer";
import initialState from "./Context/InitialState";

const LoadingScreen = () => {
  return (<div className="LoadingScreen flex">
    <Loader type="MutatingDots" color="#888" height={80} width={80} />
  </div>)
}

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (<DashboardContext.Provider value={{...state, dispatch}}>
    <div id="App">
      <Blakio.SideBar />
      <div id="ContentArea">
        <Blakio.TopBar />
        <Blakio.Dashboard />
      </div>
      {state.isLoading && <LoadingScreen />}
    </div>
  </DashboardContext.Provider>);
}

export default App;
