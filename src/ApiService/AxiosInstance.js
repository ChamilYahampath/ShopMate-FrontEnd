import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8081/api/",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    const token = localStorage.getItem("jwt");
    console.log(token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
