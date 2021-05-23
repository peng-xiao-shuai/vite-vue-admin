import config from "@/config/defalut-data";

interface setting {
  themeColor: {
    primary: string,
    success: string,
    info: string,
    warning: string,
    danger: string,
  },
  errorLog: any[]
}

let state: setting = {
  themeColor: config.themeColor,
  errorLog: []
};

let mutations = {
  setErrorLog(state: any, val: object) {
    state.errorLog.push(val)
  },
  setThemeColor(state: any, val: string, key: string) {
    console.log(val, key);

    // state.errorLog.push(val)
  }
}
export default {
  state,
  mutations
};
