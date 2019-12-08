import React, {useState, useEffect} from "react";
import "./DataVisualization.css";
import '../../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  LineSeries,
  VerticalBarSeries,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

const DataVisualization = () => {

  const getYPoint = () => Math.floor(Math.random() * 8);

  useEffect(() => {
    setInterval(() => {
      setData([
          {x: 0, y: getYPoint()},
          {x: 1, y: getYPoint()},
          {x: 2, y: getYPoint()},
          {x: 3, y: getYPoint()},
          {x: 4, y: getYPoint()},
          {x: 5, y: getYPoint()},
          {x: 6, y: getYPoint()},
          {x: 7, y: getYPoint()},
          {x: 8, y: getYPoint()},
          {x: 9, y: getYPoint()}
      ]);
    }, 4400)
  }, [])

  useEffect(() => {
    setInterval(() => {
      setData2([
          {x: 0, y: getYPoint()},
          {x: 1, y: getYPoint()},
          {x: 2, y: getYPoint()},
          {x: 3, y: getYPoint()},
          {x: 4, y: getYPoint()},
          {x: 5, y: getYPoint()},
          {x: 6, y: getYPoint()},
          {x: 7, y: getYPoint()},
          {x: 8, y: getYPoint()},
          {x: 9, y: getYPoint()}
      ]);
    }, 4500)
  }, [])

  const [data, setData] = useState([
      {x: 0, y: getYPoint()},
      {x: 1, y: getYPoint()},
      {x: 2, y: getYPoint()},
      {x: 3, y: getYPoint()},
      {x: 4, y: getYPoint()},
      {x: 5, y: getYPoint()},
      {x: 6, y: getYPoint()},
      {x: 7, y: getYPoint()},
      {x: 8, y: getYPoint()},
      {x: 9, y: getYPoint()}
  ]);

  const [data2, setData2] = useState([
      {x: 0, y: getYPoint()},
      {x: 1, y: getYPoint()},
      {x: 2, y: getYPoint()},
      {x: 3, y: getYPoint()},
      {x: 4, y: getYPoint()},
      {x: 5, y: getYPoint()},
      {x: 6, y: getYPoint()},
      {x: 7, y: getYPoint()},
      {x: 8, y: getYPoint()},
      {x: 9, y: getYPoint()}
  ]);

  const getFullHeight = () => {
    const chart = document.getElementById("chart");
    return (chart && chart.clientHeight * 0.45) || 100;
  }

  const getFullWidth = () => {
    const chart = document.getElementById("chart");
    return (chart && chart.clientWidth * 0.45) || 100;
  }

  const xTitle = "X Axis Title";
  const yTitle = "Y Axis Title";
  const duration = 6000;
  const colors = ["#3E739D", "#0e325a"]

  return (<div id="chart" className="DataVisualization flex">
    <XYPlot height={getFullHeight()} width= {getFullWidth()} animation={{duration}}>
      <VerticalGridLines animation={{duration}} />
      <HorizontalGridLines animation={{duration}} />
      <XAxis position="middle" animation={{duration}}/>
      <YAxis position="middle" animation={{duration}}/>
      <LineSeries data={data}  color={"#3E739D"} />
      <LineSeries data={data2} color={"#0e325a"} />
    </XYPlot>
    <XYPlot height={getFullHeight()} width= {getFullWidth()} animation={{duration}}>
      <VerticalGridLines animation={{duration}} />
      <HorizontalGridLines animation={{duration}} />
      <XAxis position="middle" animation={{duration}}/>
      <YAxis position="middle" animation={{duration}}/>
      <VerticalBarSeries data={data}  color={"#3E739D"} />
      <VerticalBarSeries data={data2} color={"#0e325a"} />
    </XYPlot>
    <XYPlot height={getFullHeight()} width= {getFullWidth()} animation={{duration}}>
      <VerticalGridLines animation={{duration}} />
      <HorizontalGridLines animation={{duration}} />
      <XAxis position="middle" animation={{duration}}/>
      <YAxis position="middle" animation={{duration}}/>
      <MarkSeries data={data}  color={"#3E739D"} />
      <MarkSeries data={data2} color={"#0e325a"} />
    </XYPlot>
    <div className="flex">
      <p>Use data visualization to make informed decisions</p>
    </div>
  </div>)
}

export default DataVisualization;
