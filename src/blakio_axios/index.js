import axios from "axios";

import io from "socket.io-client";
import Util from "blakio_util";

const dev = window.location.href.includes("http://localhost:3000/");
const url = dev ? "http://localhost:5000" : "https://blakiodashboardserver.herokuapp.com";
const baseURL = dev ? "http://localhost:5000/api" : "https://blakiodashboardserver.herokuapp.com/api";
const {
  showError,
  showSuccess
} = Util;

// TODO: MAKES AN API CALL
const merchantIdToDatabase = {
  MLFCVCSGSVM2K: "blakio"
};

const socket = io.connect(url);
socket.on("payment", hook => {
  const {
    data,
    merchant_id,
    type
  } = hook.data;
  const store = localStorage.getItem("blakio_store");
  const isTheMerchantTransaction = merchantIdToDatabase[merchant_id] === store;
  if(type === "payment.created" && isTheMerchantTransaction){
    showSuccess("", "Sucessfully charged");
    const {
      payment
    } = data.object;
    const {
      id
    } = payment;
    axiosInstance.post("/square/setPaymentIdWithLastTransaction", {
      database: store,
      paymentId: id
    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
});

socket.on("refresh", () => {
  window.location.reload(false)
})

let axiosInstance = axios.create({
  baseURL,
  headers: {
    blakio_store: localStorage.getItem("blakio_store")
  }
});

window.blakio_setSideBarOptions = () => {
  /**
   * 1. log in to the account to add the sidebar option
   * 2. comment in the side bar options to add
   * 3. run blakio_setSideBarOptions
   */
  const sideBarOptions = [
    { title: "Timesheet", closedIcon: "fas fa-clock" },
    { title: "Directory", closedIcon: "fas fa-user-tie" },
    { title: "Point Of Sale", closedIcon: "fas fa-credit-card" },
    { title: "Product", closedIcon: "fas fa-boxes" },
    { title: "Transaction", closedIcon: "fas fa-cash-register" }
  ];

  const insertOption = async (data) => {
    await axiosInstance.post("/table/SidebarOptions", data);
  }

  sideBarOptions.forEach(data => insertOption(data))
}

window.blakio_getAcessToken = () => {
  axiosInstance.get("/sandbox_request_token");
}

window.blakio_refresh = () => {
  axiosInstance.get("/refresh");
}

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

  getProducts: async () => {
    return await axiosInstance.get("/table/Product");
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
    return await axiosInstance.post("/table/Time", { query: { employeeId }, data, field, setFields: { isClockedIn } });
  },

  getTimeOverRange: async (employeeId, query) => {
    return await axiosInstance.post(`/table/aggregate/Time/${employeeId}`, { query });
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

  addProduct: async (product) => {
    return await axiosInstance.post('/table/Product', product);
  },

  updateEmployee: async (updatedEmployee, _id) => {
    return await axiosInstance.post("/table/Employee", {
      setFields: updatedEmployee,
      query: {
        _id
      }
    });
  },

  updateProduct: async (updatedProduct, _id) => {
    return await axiosInstance.post("/table/Product", {
      setFields: updatedProduct,
      query: {
        _id
      }
    });
  },

  deleteEmployee: async (employeeId) => {
    return await axiosInstance.delete(`/table/Employee/${employeeId}`);
  },

  deleteProduct: async (productId) => {
    return await axiosInstance.delete(`/table/Product/${productId}`);
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
  },

  recordPurchase: async (items) => {
    return await axiosInstance.post("/table/Transaction", {items});
  },
  listPayments: async (query) => {
    if(query){
      const {last_4, total} = query;
      return await axiosInstance.get(`/listPayments/${last_4.replace("/", "")}Z${total}`);
    }
    return await axiosInstance.get(`/listPayments/false`);
  },
  getItemsPurchased: async (paymentId) => {
    return axiosInstance.post("/table/search/Transaction", {
      query: {paymentId}
    })
  },
  refundPayment: async (body) => {
    return axiosInstance.post("/refundPayment", body);
  },
  updateRefundStatus: async (selectedId, paymentId) => {
    return axiosInstance.post("updateRefundStatus", {selectedId, paymentId})
  }

};
