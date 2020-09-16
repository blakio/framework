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
} from "./blakio_home";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import {
  StateProvider,
  StateContext
} from "blakio_context/State";
import Types from 'blakio_context/Types';
import Axios from 'blakio_axios';
import Util from "blakio_util";

const Loading = () => {
  const [state, dispatch] = StateContext();
  return state.isLoading && <LoadingScreen />
}

const ContentArea = () => {
  const [state, dispatch] = StateContext();

  return (<div id="ContentArea" className={`${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    {/* <TopBar /> */}
    <Dashboard />
</div>)
}

const Content = () => {

  const [state, dispatch] = StateContext();

  useEffect(() => {
    const store = localStorage.getItem("blakio_store");
    if(store){
      Util.load(dispatch, true);
      const checkLocalStorage = true;
      Axios.logIn(store, checkLocalStorage).then(data => {
        Util.load(dispatch, false);
        if(data.data.logIn){
          dispatch({
            type: Types.IS_LOGGED_IN,
            payload: true
          })
        } else {
          localStorage.removeItem("blakio_store")
        }
      }).catch(err => {
        Util.load(dispatch, false);
        console.log(err)
      })
    }
  }, []);

  return (<div>
    {!state.isLoggedIn ? 
     <LogIn /> : (
      <div id="App">
        test
        {/* <SideBar /> */}
        {/* <ContentArea /> */}
        {/* <Loading /> */}
      </div>
     )}
  </div>)
}

function App() {
  return (<StateProvider>
    <ReactNotification />
    <Content />
  </StateProvider>);
}

export default App;
