import axios from "axios";
import moment from "moment";
import Types from "../Context/Types.js";

const local = false;
const baseURL = local ? "http://localhost:5000/eps" : "https://blakiodashserver.herokuapp.com/eps";

const getHeaderObj = () => {
  const data = window.localStorage.data ? JSON.parse(window.localStorage.data) : {};
  const token = data && data.token || {};
  return {
    headers: {
      'auth-token': localStorage.data ? JSON.parse(localStorage.data).token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM5NjY4ODd9.8phBRfYpSE4l6FSKaWQU0rF3XFKYqRYF2iOrVojs5iE"
    }
  }
}

export default {
  delete: async (path, obj, fn) => {
    await axios.delete(`${baseURL}/${path}`, obj, getHeaderObj())
      .then(response => { fn && fn(response) })
      .catch(error => console.log(error));
  },
  clockIn: (id, obj, fn) => {
    let url = `${baseURL}/clockIn/${id}`;
    axios.post(url,  obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => { console.log(error) });
  },
  startLunch: (id, obj, fn) => {
    let url = `${baseURL}/toLunch/${id}`;
    axios.post(url, obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  endLunch: (id, obj, fn) => {
    let url = `${baseURL}/fromLunch/${id}`;
    axios.post(url, obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  clockOut: (id, obj, fn) => {
    let url = `${baseURL}/clockOut/${id}`;
    axios.post(url, obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => console.log(error));
  },
  addEmployee: (data, fn, errFn) => {
    let url = `${baseURL}/employees`;
    axios.post(url, data, getHeaderObj()).then(response => {
      if(typeof response.data === "string"){
        errFn(response.data);
      } else {
        fn();
      }
    }).catch(e => {
      if(typeof e.response.data === "string"){
        errFn(e.response.data)
      }
    });
  },
  addJobNumber: (data, fn, errFn) => {
    let url = `${baseURL}/jobNumbers`;
    axios.post(url, data, getHeaderObj()).then(response => {
      if(typeof response.data === "string"){
        errFn(response.data);
      } else {
        fn();
      }
    });
  },
  addLaborType: (data, fn, errFn) => {
    let url = `${baseURL}/laborTypes`;
    axios.post(url, data, getHeaderObj()).then(response => {
      if(typeof response.data === "string"){
        errFn(response.data);
      } else {
        fn();
      }
    });
  },
  updateEmployee: (id, laborType, jobNumber, fn) => {
    let url = `${baseURL}/employees/`
    const updates = {};
    if(laborType.length){
      updates.laborType = laborType
    }
    if(jobNumber){
      updates.jobNumber = jobNumber
    }
    axios.put(url + id, updates, getHeaderObj()).then(response => fn());
  },
  fetchEmployees: async (dispatch, fn) => {
    const response = await axios.get(`${baseURL}/employees`, getHeaderObj());
    dispatch({
      type: Types.SET_EMPLOYEES,
      payload: response.data
    });
    if(fn) fn();
  },
  fetchLaborTypes: async (dispatch, fn) => {
    const response = await axios.get(`${baseURL}/laborTypes`, getHeaderObj());
    dispatch({
      type: Types.SET_LABOR_TYPES,
      payload: response.data
    });
    if(fn) fn();
  },
  fetchJobNumbers: async (dispatch, fn) => {
    const response = await axios.get(`${baseURL}/jobNumbers`, getHeaderObj());
    dispatch({
      type: Types.SET_JOB_NUMBERS,
      payload: response.data
    });
    if(fn) fn();
  },
  getCsvData: async (payload) => {
    const {
      dispatch,
      startDate,
      endDate,
      noData
    } = payload;
    const response = await axios.post(`${baseURL}/history`, {
      startDate,
      endDate
    }, getHeaderObj());
    payload.success();
    if(response.data.length){
      dispatch({
        type: Types.SET_CSV_DATA,
        payload: {
          data: response.data,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD")
        }
      })
    } else {
      payload.noData();
    }
  },
  logIn: async (username, password, fn) => {
    const response = await axios.post(`${baseURL}/login`, {
      username,
      password
    }, getHeaderObj());
    if(response) fn(response);
  },
  getWeather: () => {
    const apiKey = "1001a1dcc738f2ecade5496fbf796f50";
    const cityId = "4562144&APPID";
    const string = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}=${apiKey}`
    axios.get(string).then(data => {
    })
  },
  toggleEmployeeActivation: async (payload) => {
    await axios.post(`${baseURL}/employees/toggleActivation/${payload.id}`, getHeaderObj())
      .then(response => { payload.fn() })
      .catch(error => console.log(error));
  },
  toggleJobNumberActivation: async (payload) => {
    await axios.post(`${baseURL}/jobNumbers/toggleActivation/${payload.id}`, getHeaderObj())
      .then(response => { payload.fn() })
      .catch(error => console.log(error));
  },
  toggleLaborTypeActivation: async (payload) => {
    await axios.post(`${baseURL}/laborTypes/toggleActivation/${payload.id}`, getHeaderObj())
      .then(response => { payload.fn() })
      .catch(error => console.log(error));
  },
  editEmployee: async (payload) => {
    await axios.post(`${baseURL}/editEmployee/${payload.id}`, {edits: payload.edits}, getHeaderObj());
    payload.fn();
  }
};
