import React, {
  useEffect
} from 'react';
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
import Types from './Context/Types';

const Loading = () => {
  const [state, dispatch] = StateContext();
  return state.isLoading && <LoadingScreen />
}

const ContentArea = () => {
  const [state, dispatch] = StateContext();

  // load initial data
  useEffect(() => {
    dispatch({
      type: Types.GET_EMPLOYEES,
      payload: {
        fn: (employees) => {
          dispatch({
            type: Types.SET_EMPLOYEES,
            payload: employees
          })
        }
      }
    })
  }, []);

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
      <Loading />
    </div>
  </StateProvider>);
}

export default App;
