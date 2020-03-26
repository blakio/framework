import axios from "axios";

var axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default {

  //GET
  get: (table, fn) => {
    axiosInstance.get(`/table/${table}`)
      .then(data => fn(data))
      .catch(err => console.log(err));
  },

  // SIDE BAR
  getSideBar: (fn) => {
    axiosInstance.get("/sidebar")
      .then(data => fn(data))
      .catch(err => console.log(err));
  },

  // TIME SHEET CALLS
  clockIn: (id, obj, fn) => {
    axiosInstance.post(`/clockIn/${id}`,  obj)
    .then(data => {if(fn) fn()})
    .catch(error => { console.log(error) });
  },
  startLunch: (id, obj, fn) => {
    axiosInstance.post(`/toLunch/${id}`, obj)
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  endLunch: (id, obj, fn) => {
    axiosInstance.post(`/fromLunch/${id}`, obj)
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  clockOut: (id, obj, fn) => {
    axiosInstance.post(`/clockOut/${id}`, obj)
    .then(data => {if(fn) fn()})
    .catch(error => console.log(error));
  }
  

};
