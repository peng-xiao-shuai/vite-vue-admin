import config from "@/config/defalut-data";

import { setting } from '@/utils/interface';

let state: setting = {
  themeColor: config.themeColor,
  errorLog: [],
  drawerSetting: config.settings
};

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
