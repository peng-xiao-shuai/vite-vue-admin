import axios from "axios";
import store from "../store/index";
import { getLangAll } from '@/language/index';
import configDefault from '@/config/default-data';
import { ElMessage } from "element-plus";
import { parseTime } from './parse-time';
import { log } from '@/utils/interface';
import type { UserInfo } from "@/store/modules/user";

const ENV = (import.meta as any).env;

function addBug(error: string, info?: string) {

  let data: log = {
    url: window.location.href,
    info,
    error,
    // 手动添加的type 为 info
    type: 'Ajax',
    name: (store.state.user.userInfo as UserInfo).username,
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
      console.log(response.config.url, response);

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
    // 获取当前语言
    const locales: {[s:string]: string} = getLangAll()[configDefault.locale]
    try {
      switch (error.response.status) {
        case 500:
          ElMessage({ message: locales[error.response.status], type: "error" });
          addBug(error.response.data.message, locales[500])
          break;
        case 503:
          ElMessage({ message: locales[error.response.status], type: "error" });
          break
        case 400:
          ElMessage({ message: locales[error.response.status], type: "error" });
          break
        case 404:
          ElMessage({ message: locales[error.response.status], type: "error" });
          break
        default:
          ElMessage({ message: error.response.data.message, type: "error" });
          break;
      }
      addBug(error.response.data.message, error.response.status)
    } catch (error) {
      ElMessage({ message: locales['000'], type: "error" });
    }

    return Promise.reject(error);
  }
);

export default service;
