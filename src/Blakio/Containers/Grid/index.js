import React from "react";
import "./Grid.css";

const Grid = (props) => {
  return (<div className={`Grid col${props.grid}`}>
  </div>)
}

export default Grid;

// media query with grid component
// function onWindowResize () {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
// }
// window.addEventListener('resize', onWindowResize);
