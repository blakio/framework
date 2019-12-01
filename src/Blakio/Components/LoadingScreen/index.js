import React from "react";
import "./LoadingScreen.css";
import Loader from 'react-loader-spinner'

const LoadingScreen = () => {
  return (<div className="LoadingScreen flex">
    <Loader type="MutatingDots" color="#888" height={100} width={100} />
  </div>)
}

export default LoadingScreen;
