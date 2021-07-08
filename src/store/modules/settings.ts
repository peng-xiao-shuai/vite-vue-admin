import config from "@/config/default-data";

import { drawerSetting, themeColor, log } from '@/utils/interface';

interface state {
  themeColor: themeColor,
  errorLog: log[],
  drawerSetting: drawerSetting
}

let state: state = {
  themeColor: config.themeColor,
  errorLog: [],
  drawerSetting: config.settings
};

let mutations = {
  setErrorLog(state: any, val: object) {
    state.errorLog.push(val)
  },
  setThemeColor(state: any, { key, val }: { val: string, key: string }) {
    state.themeColor[key] = val
    console.log(state.themeColor[key], val);

  },
  setDrawerSetting(state: any, { val, key }: { val: string, key: string }) {
    state.drawerSetting[key] = val
    window.localStorage.setItem('settings', JSON.stringify(state.drawerSetting))
  },

  // 不走本地缓存
  setSetting(state: any, { val, key }: { val: string, key: string }) {
    state.drawerSetting[key] = val
  },
}
export default {
  state,
  mutations
};
