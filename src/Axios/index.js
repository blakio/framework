import axios from "axios";

import {
  sideBar
} from "../dbRequests/db.js";

var axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default {

  // SIDE BAR
  getSideBar: (fn) => {
    fn(sideBar);
    // axiosInstance.get("/sidebar")
    //   .then(data => fn(data))
    //   .catch(err => console.log(err));
  },

};
