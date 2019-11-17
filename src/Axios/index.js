import axios from "axios";
import moment from "moment";
import Types from "../Context/Types.js";

const baseURL = "https://dashboard-api-02.herokuapp.com/api";

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
  get: async (path, params, fn) => {
    await axios.get(path, { params }, getHeaderObj())
      .then(response => { fn && fn(response) })
      .catch(error => console.log(error));
  },
  post: async (path, obj, fn, errorFn) => {
    await axios.post(path, obj, getHeaderObj())
      .then(response => { fn && fn(response) })
      .catch(error => {
        console.log(error);
        if(errorFn) errorFn(error)
      });
  },
  put: async (path, obj, fn) => {
    await axios.put(path, obj, getHeaderObj())
      .then(response => { fn && fn(response) })
      .catch(error => console.log(error));
  },
  delete: async (path, obj, fn) => {
    await axios.delete(path, obj, getHeaderObj())
      .then(response => { fn && fn(response) })
      .catch(error => console.log(error));
  },
  seed: () => {
    const c = [false, false, false, false, false, false, false, false, false, false, false, false, true, true];
    const tt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2];
    const e = ["MIKE KOWAL", "RYAN MCWILLIAMS", "JOSEPH NEES", "BILL CROISSETTE, JR.", "PAUL WICK", "PAUL BEMENT", "MARK SCHOONOVER", "BEN VEHABOVIC", "SHAWN SAVITZ", "CRAIG FULLER", "COURTNEY JOHNSON", "MICHAEL CLUCAS", "LISA THOMAS", "AMBER", "BILL CROISSETTE", "JAKE SHELLHAMMER"];
    const t = ["SHOP MANAGER", "MECHANIC/TECH", "DEPARTMENT MANAGER", "PROJECT MANAGER", "APPLICATION ENGINEER", "DESIGN", "PROJECT MANAGER", "PROJECT MANAGER AND PRODUCTION PLANNER", "OFFICE ADMINISTRATION", "SHIPPER/RECEIVER", "WELDER"];
    const j = ["35000123", "35000234", "35000345", "35000456", "35000567", "35000678", "35000789", "35000891", "35000912", "35000321", "Other"];
    const l = ["BASE", "CRATE", "DP SWITCH", "ADDER: FLEX HOUSE", "PIPPING ASSEMBLY", "ADDER: PUMPS", "PAINT", "REWORK", "TEST", "OTHER"];

    e.forEach((data, index) => {
      axios.post(`${baseURL}/employees`, {
        isActive: true,
        isContractor: c[index],
        jobTitle: t[index],
        name: data,
        travelTime: tt[index]
      }, getHeaderObj())
    })
    j.forEach((data, index) => {
      axios.post(`${baseURL}/jobs`, {
        number: data,
        isActive: true
      }, getHeaderObj())
    })
    l.forEach((data, index) => {
      axios.post(`${baseURL}/laborTypes`, {
        name: data,
        isActive: true
      }, getHeaderObj())
    })
  },
  clockIn: (id, obj, fn) => {
    let url = `${baseURL}/clockin/${id}`;
    axios.put(url,  obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => { console.log(error) });
  },
  startLunch: (id, obj, fn) => {
    let url = `${baseURL}/startlunch/${id}`;
    axios.put(url, obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  endLunch: (id, obj, fn) => {
    let url = `${baseURL}/endlunch/${id}`;
    axios.put(url, obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  clockOut: (id, obj, fn) => {
    let url = `${baseURL}/clockout/${id}`;
    axios.put(url, obj, getHeaderObj())
    .then(data => {if(fn) fn()})
    .catch(error => console.log(error));
  },
  reset: async (id, fn) => {
    const resetEmployee = await axios.put(`${baseURL}/reset/${id}`, {}, getHeaderObj());
    const fetchEmployees = await axios.get(`${baseURL}/employees`);
    fn(fetchEmployees);
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
  fetchEmployees: async (dispatch) => {
    const response = await axios.get(`${baseURL}/employees`, getHeaderObj());
    dispatch({
      type: Types.SET_EMPLOYEES,
      payload: response.data
    })
  },
  fetchLaborTypes: async (dispatch) => {
    const response = await axios.get(`${baseURL}/labortypes`, getHeaderObj());
    dispatch({
      type: Types.SET_LABOR_TYPES,
      payload: response.data
    })
  },
  fetchJobNumbers: async (dispatch) => {
    const response = await axios.get(`${baseURL}/jobs`, getHeaderObj());
    dispatch({
      type: Types.SET_JOB_NUMBERS,
      payload: response.data
    })
  },
  getCsvData: async (payload) => {
    const {
      dispatch,
      startDate,
      endDate
    } = payload;
    const response = await axios.post(`${baseURL}/history`, {
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD")
    }, getHeaderObj());
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
      dispatch({
        type: Types.OPEN_MESSAGE,
        payload: {
          type: "error",
          message: "NO DATA FOR TIMEFRAME"
        }
      })
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
  }
};
