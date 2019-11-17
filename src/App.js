import React from 'react';
import './App.css';
import Blakio from "./Blakio";

// import DashboardContext from "./Context/State";
// import Reducer from "./Context/Reducer";
// import initialState from "./Context/InitialState";

function App() {
  // <DashboardContext.Provider value={{...state, dispatch}}>
  // const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <div id="App">
      <Blakio.SideBar />
      <div id="ContentArea">
        <Blakio.TopBar />
        <Blakio.Dashboard />
      </div>
    </div>);
}

export default App;
