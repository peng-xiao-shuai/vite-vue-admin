import config from "/@/config/defalut-data";

let state = {
  themeColor: config.themeColor.background,
  errorLog: []
};

let mutations = {
  setErrorLog(state: any, val: object) {
    state.errorLog.push(val)
  }
}
export default {
  state,
  mutations
};
