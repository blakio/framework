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
} from "./Blakio";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import {
  StateProvider,
  StateContext
} from "./Context/State";
import Types from './Context/Types';
import Axios from './Axios';

const Loading = () => {
  const [state, dispatch] = StateContext();
  return state.isLoading && <LoadingScreen />
}

const ContentArea = () => {
  const [state, dispatch] = StateContext();

  return (<div id="ContentArea" className={`${state.sideBarOptions.shortMenu && "shortMenu"}`}>
    <TopBar />
    <Dashboard />
</div>)
}

const Content = () => {

  const [state, dispatch] = StateContext();

  useEffect(() => {
    const store = localStorage.getItem("blakio_store");
    if(store){
      const checkLocalStorage = true;
      Axios.logIn(store, checkLocalStorage).then(data => {
        if(data.data.logIn){
          dispatch({
            type: Types.IS_LOGGED_IN,
            payload: true
          })
        } else {
          localStorage.removeItem("blakio_store")
        }
      }).catch(err => console.log(err))
    }
  }, []);

  return (<div>
    {!state.isLoggedIn ? 
     <LogIn /> : (
      <div id="App">
        <SideBar />
        <ContentArea />
        <Loading />
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
