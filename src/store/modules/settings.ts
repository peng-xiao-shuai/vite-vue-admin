import config from "@/config/default-data";

import { setting, themeColor, log } from '@/utils/interface';

interface state {
  themeColor: themeColor,
  errorLog: log[],
  drawerSetting: setting
}

let state: state = {
  themeColor: config.themeColor,
  errorLog: [],
  drawerSetting: config.settings
};

console.log(state.drawerSetting);


let mutations = {
  setErrorLog(state: any, val: object) {
    state.errorLog.push(val)
  },
  setThemeColor(state: any, val: string, key: string) {
    console.log(val, key);
    // state.errorLog.push(val)
  },
  setDrawerSetting(state: any, { val, key }: { val: string, key: string }) {
    state.drawerSetting[key] = val
    window.localStorage.setItem('settings', JSON.stringify(state.drawerSetting))
  },
}
export default {
  state,
  mutations
};
