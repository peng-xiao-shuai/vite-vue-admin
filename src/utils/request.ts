import axios from "axios";
import store from "../store/index";
import { ElMessage } from "element-plus";
import { parseTime } from './parse-time';

const ENV = import.meta.env;
// console.log(ENV);

interface log {
  url: string;
  info?: string;
  time: string | null;
  error: string | any;
  name: string,
  type: string
}
function addBug(error: string, info?: string) {
  console.log(error);

  let data: log = {
    url: window.location.href,
    info,
    error,
    // 手动添加的type 为 info
    type: 'Ajax',
    name: store.state.user.userInfo.username,
    time: parseTime(new Date())

  }
  store.commit('setErrorLog', data)
}


const service = axios.create({
  baseURL: ENV.VITE_BASE_URL,
  timeout: ENV.VITE_TIMEOUT,
});

service.defaults.headers["content-type"] = "application/json";

service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (store.getters.getToken) {
      config.headers["Authorization"] = store.getters.getToken;
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    let code;
    if (ENV.VITE_MOCK === "true") {
      console.log(response);

      code = JSON.parse(response.request.response).code;
    } else {
      code = response.data.code || response.status;
    }

    switch (code) {
      case 502:
        ElMessage({ message: response.data.message, type: "warning" });
        return Promise.reject(response);
      case 401:
        ElMessage({ message: response.data.message, type: "error" });
        return Promise.reject(response);

      // .then((res) => {
      //     router.push('/login')
      // }).catch((err) => {

      // });
      case 200:
        if (ENV.VITE_MOCK === "true") {
          // console.log(response.data);
          return response.data;
        }

        if (
          response.headers["content-type"] &&
          response.headers["content-type"].indexOf("application/json") != -1
        ) {
          return response.data;
        } else {
          return response;
        }

      default:
        ElMessage({ message: response.data.message, type: "error" });
        addBug(response.data.message, code)
        return Promise.reject(response);
    }
  },
  (error) => {
    switch (error.response.status) {
      case 500:
        ElMessage({ message: "服务器打瞌睡了！", type: "error" });
        addBug(error.response.data.message, '服务器打瞌睡了')
        break;
      case 503:
        ElMessage({ message: '后台服务重启中，请稍后再试！', type: "error" });
        break
      case 400:
        ElMessage({ message: '参数错误！', type: "error" });
        break
      case 404:
        ElMessage({ message: '找不到接口！', type: "error" });
        break
      default:
        ElMessage({ message: error.response.data.message, type: "error" });
        addBug(error.response.data.message, error.response.status)
        break;
    }

    // 对响应错误做点什么
    addBug(error.config, error.message)

    return Promise.reject(error);
  }
);

export default service;
