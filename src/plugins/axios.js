import axios from "axios";
import store from "../store";
import router from "../router";

// Full config:  https://github.com/axios/axios#request-config
const config = {
  baseURL: "",
  timeout: 60 * 1000,
  withCredentials: false,
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (cfg) => {
    const token = store.state.accessToken;
    if (store.state.isAuthenticated) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    // Do something with response data
    return res.data;
  },
  (err) => {
    if (err.response.status === 401) {
      store.dispatch("logout").then(() =>
        router.push({
          name: "Login",
          params: { msg: "Bad credentials or session expired." },
        })
      );
    }
    return Promise.reject(err);
  }
);

export default {
  install(app) {
    app.config.globalProperties.$axios = axiosInstance;
  },
};
