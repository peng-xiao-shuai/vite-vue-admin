import config from "@/config/default-data";
import { create, remove } from '@/utils/watermark'
import { nextTick } from 'vue';

import { drawerSetting, themeColor, log, menuColors, waterMarkType } from '@/utils/interface';
interface state {
  themeColor: themeColor,
  errorLog: log[],
  drawerSetting: drawerSetting,
  menuColors: menuColors,
  waterMark: waterMarkType
}

let state: state = {
  themeColor: config.themeColor,
  errorLog: [],
  drawerSetting: config.settings,
  menuColors: config.menuColors,
  waterMark: config.waterMark,
};
// 添加水印
nextTick(function () {
  config.waterMark.switch && create(config.waterMark)
});

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

  // 修改水印
  setWaterMark(state: any, { val, key }: { val: string, key: string }) {
    state.waterMark[key] = val
    state.waterMark.switch ? create(state.waterMark) : remove()
    window.localStorage.setItem('waterMark', JSON.stringify(state.waterMark))
  },

  // 不走本地缓存 主要用于 非全局配置栏目修改全局配置的数据
  // 因为全局配置栏目数据每次改变都会走本地缓存
  setSetting(state: any, { val, key }: { val: string, key: string }) {
    state.drawerSetting[key] = val
  },
}
export default {
  state,
  mutations
};
