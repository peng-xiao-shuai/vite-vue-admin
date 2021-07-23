import config from "@/config/default-data";

import { drawerSetting, themeColor, log, menuColors } from '@/utils/interface';

interface state {
  themeColor: themeColor,
  errorLog: log[],
  drawerSetting: drawerSetting,
  menuColors: menuColors
}

let state: state = {
  themeColor: config.themeColor,
  errorLog: [],
  drawerSetting: config.settings,
  menuColors: config.menuColors,
};

let mutations = {
  setErrorLog(state: any, val: object) {
    state.errorLog.push(val)
  },
  // 修改主题颜色
  setThemeColor(state: any, { key, val }: { val: string, key: string }) {
    state.themeColor[key] = val
    console.log(state.themeColor[key], val);
  },
  // 修改菜单
  setMenuColor(state: any, { key, val }: { val: string, key: string }) {
    state.menuColors[key] = val
    console.log(state.menuColors, { key, val });

  },
  // 用于修改非颜色属性
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
