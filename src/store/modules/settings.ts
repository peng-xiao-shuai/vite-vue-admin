import config from "/@/config/defalut-data";
const themeColor: any = window.localStorage.getItem("themeColor");

let state = {
  themeColor: JSON.parse(themeColor) || config.themeColor.background,
};

let mutations = {
  
}
export default {
  state,
  mutations
};
