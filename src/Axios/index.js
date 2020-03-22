import axios from "axios";

const baseURL = "http://localhost:5000/eps";

export default {


  // TIME SHEET CALLS
  clockIn: (id, obj, fn) => {
    axios.post(`${baseURL}/clockIn/${id}`,  obj)
    .then(data => {if(fn) fn()})
    .catch(error => { console.log(error) });
  },
  startLunch: (id, obj, fn) => {
    axios.post(`${baseURL}/toLunch/${id}`, obj)
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  endLunch: (id, obj, fn) => {
    axios.post(`${baseURL}/fromLunch/${id}`, obj)
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  clockOut: (id, obj, fn) => {
    axios.post(`${baseURL}/clockOut/${id}`, obj)
    .then(data => {if(fn) fn()})
    .catch(error => console.log(error));
  }
  

};
