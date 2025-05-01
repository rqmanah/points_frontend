import axios, { AxiosInstance } from "axios";
import { userType } from "../types";
import Cookies from "js-cookie";
const hostname = window.location.hostname;
let apiUrl: string;
if (hostname === "ae.school-points.com") {
  apiUrl = "https://ae-api.school-points.com/api/";
} else if (hostname === "eg.school-points.com") {
  apiUrl = "https://eg-api.school-points.com/api/";
} else if (hostname === "sa.school-points.com") {
  apiUrl = "https://sa-api.school-points.com/api/";
} else {
  apiUrl = import.meta.env.VITE_API_URL;
}

const client: AxiosInstance = axios.create({
  baseURL: `${apiUrl}`,
});

client.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("user") != "undefined") {
      const user: userType = JSON.parse(localStorage.getItem("user") ?? "{}");
      const token = user?.token; // Replace with your actual token
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        Cookies.set("token", token);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.pathname = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default client;
