import axios from "axios";

const dev = false;
const baseURL = dev ? "http://localhost:5000/api" : "https://blakiodashboardserver.herokuapp.com/api"

let axiosInstance = axios.create({
  baseURL,
  headers: {
    blakio_store: localStorage.getItem("blakio_store")
  }
});

export default {

  resetAxiosInstance: () => {
    axiosInstance = axios.create({
      baseURL,
      headers: {
        blakio_store: localStorage.getItem("blakio_store")
      }
    });
  },

  getEmployees: async () => {
    return await axiosInstance.get("/table/Employee");
  },

  // SIDE BAR
  getSideBar: async (fn) => {
    const sidebarOptions = await axiosInstance.get("/table/SidebarOptions");
    fn({
      data: sidebarOptions.data
    })
  },

  getTime: async () => {
    return await axiosInstance.get("/time");
  },

  recordEmployeeTime: async (data) => {
    return await axiosInstance.post("/table/Time", data);
  },

  getEmployeeTimeLog: async (query) => {
    return await query ? axiosInstance.post("/table/search/Time", query) : axiosInstance.get("/table/Time");
  },

  addToTimeLog: async (employeeId, data, field, isClockedIn) => {
    return await axiosInstance.post("/table/Time", {query: {employeeId}, data, field, setFields: {isClockedIn}});
  },

  getTimeOverRange: async (employeeId, query) => {
    return await axiosInstance.post(`/table/aggregate/Time/${employeeId}`, {query});
  },

  getDayTotalHours: async (id, day) => {
    return await axiosInstance.post(`/timesheet/hours/day/${id}`, { day })
  },

  createWeeklyNote: async (query) => {
    return await axiosInstance.post("/table/Note", query);
  },

  findWeeklyNotes: async (query) => {
    return await axiosInstance.post("/table/search/Note", query);
  },

  deleteWeeklyNote: async (id) => {
    return await axiosInstance.delete(`/table/Note/${id}`);
  },

  addEmployee: async (employee) => {
    return await axiosInstance.post('/table/Employee', employee);
  },

  updateEmployee: async (updatedEmployee, _id) => {
    return await axiosInstance.post("/table/Employee", {
      setFields: updatedEmployee,
      query: {
        _id
      }
    });
  },

  deleteEmployee: async (employeeId) => {
    return await axiosInstance.delete(`/table/Employee/${employeeId}`);
  },

  findTimeBoundaries: async (employeeId, timestamp) => {
    const boundaries = await axiosInstance.post(`/getTimeBoundaries/${employeeId}/${timestamp}`);
    return {
      prev: boundaries.data.prev && boundaries.data.prev.time.formatted,
      next: boundaries.data.next && boundaries.data.next.time.formatted
    }
  },

  logIn: async (pin, checkLocalStorage) => {
    const body = checkLocalStorage ? { check: pin } : { pin }
    return await axiosInstance.post(`/login`, body);
  },

  updateClockinTime: async (query) => {
    return await axiosInstance.post(`/updateTime`, query);
  }

};
