import axios from "axios";

var axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default {

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
  }

};
