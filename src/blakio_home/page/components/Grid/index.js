import React from "react";
import "./Grid.css";

const Grid = (props) => {
  return (<div className={`Grid col${props.grid} ${props.splitWidth && "splitWidth"}`} style={props.additionalStyles || {}}>
    {props.children}
  </div>)
}

export default Grid;

// media query with grid component
// function onWindowResize () {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
// }
// window.addEventListener('resize', onWindowResize);



// grid-column: 1/-1; one row until last column

// grid-column: span 2; starts at current position and spans 2 colums

// grid-template-column: repeat(auto-fit, minmax(100px, 1fr)) makes the colums responsive
// grid-auto-row: 75px; sets a height for all rows
