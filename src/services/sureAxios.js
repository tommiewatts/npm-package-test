import axios from "axios";
import set from "lodash/set";
import get from "lodash/get";

const sureAxios = axios.create({
  baseURL: process.env.REACT_APP_SURE_API_URL,
  headers: {
    "X-Space": "farmers",
  },
});

sureAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (get(error, "response.headers")) {
      set(
        error,
        "response.data.error._hrq",
        error.response.headers["x-request-id"]
      );
    }
    return Promise.reject(error);
  }
);

export default sureAxios;
