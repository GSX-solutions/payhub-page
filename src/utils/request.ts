import axios from "axios";

export interface ResponseError {
  code: number;
  data: any;
  message: string;
}

const isDev = process.env.NODE_ENV !== "production";

// init axios CancelToken
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const service = axios.create({
  baseURL: "/_api",
  // 请求超时时间
  // timeout: 1200000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request拦截器
// service.interceptors.request.use(
//   async (config) => {
//     config.headers["Lang"] = `${lang}` || "en_US";
//
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   },
// );

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status !== 200) {
      const errRes: ResponseError = res;
      return Promise.reject(errRes);
    } else {
      return res.data;
    }
  },
  (error: any) => {
    let code = 0;
    try {
      code = error.response.status;
    } catch (e) {
      if (error.toString().indexOf("Error: timeout") !== -1) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
export default service;
