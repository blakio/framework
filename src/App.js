import React from 'react';
import './App.css';
import Blakio from "./Blakio";

function App() {
  return (
    <div id="App" className="flex">
      <Blakio.SideBar />
      <div id="ContentArea">
        <Blakio.TopBar />
        <Blakio.Dashboard />
      </div>
    </div>
  );
}

export default App;
