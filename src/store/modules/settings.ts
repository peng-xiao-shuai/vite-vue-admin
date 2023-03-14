import config from '@/config/default-data'
import { create, remove } from '@/utils/watermark'
import { nextTick } from 'vue'
import {
  DrawerSetting,
  ThemeColor,
  Log,
  WaterMarkType,
} from '@/utils/interface'
export interface SettingsState {
  themeColor: ThemeColor
  errorLog: Log[]
  drawerSetting: DrawerSetting
  waterMark: WaterMarkType
}

// 初始化，是否灰度模式
if (config.settings.grayMode) {
  document.getElementsByTagName('body')[0].style.filter = 'grayscale(1)'
}

const state: SettingsState = {
  themeColor: config.themeColor,
  errorLog: [],
  drawerSetting: config.settings,
  waterMark: config.waterMark,
}
// 添加水印
nextTick(function () {
  config.waterMark.switch && create(config.waterMark)
})

const mutations = {
  setErrorLog(state: SettingsState, val: Log) {
    state.errorLog.push(val)
  },
  // 修改主题颜色
  setThemeColor(
    state: SettingsState,
    { key, val }: { val: string; key: string }
  ) {
    state.themeColor[key] = val
  },
  // 用于修改非颜色属性
  setDrawerSetting(
    state: SettingsState,
    { val, key }: { val: number; key: string }
  ) {
    state.drawerSetting[key] = val
    window.localStorage.setItem('settings', JSON.stringify(state.drawerSetting))
  },

  // 修改水印
  setWaterMark(
    state: SettingsState,
    { val, key }: { val: string; key: string }
  ) {
    state.waterMark[key] = val
    state.waterMark.switch ? create(state.waterMark) : remove()
    window.localStorage.setItem('waterMark', JSON.stringify(state.waterMark))
  },

  // 不走本地缓存 主要用于 非全局配置栏目修改全局配置的数据
  // 因为全局配置栏目数据每次改变都会走本地缓存
  setSetting(state: SettingsState, { val, key }: { val: any; key: string }) {
    state.drawerSetting[key] = val
  },
}
export default {
  state,
  mutations,
}
