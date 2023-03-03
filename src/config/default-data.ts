import {
  ThemeColor,
  DrawerSetting,
  WaterMarkType,
  NavSettingType,
} from '@/utils/interface'
import { getStorage } from '@/utils/index'
// 主题颜色
const themeColor: ThemeColor = {
  primary: '#AD49FF',
  success: '#67c23a',
  info: '#909399',
  warning: '#e6a23c',
  danger: '#f56c6c',
}

const Tcolors: { [s: string]: string } = getStorage('themeColors')
Object.keys(Tcolors).forEach((item: string) => {
  document.documentElement.style.setProperty(item, Tcolors[item])
  const last = item.lastIndexOf('-')
  themeColor[item.substr(last + 1)] = Tcolors[item]

  if (item.substr(last + 1) === 'primary') {
    import('@/store/index').then(({ default: store }) => {
      store.commit('setThemeColor', { key: 'primary', val: themeColor.primary })
    })
  }
})

const settings: DrawerSetting = getStorage('settings')
const waterMark: WaterMarkType = getStorage('waterMark')
const navSetting: NavSettingType = getStorage('navSetting')

export type defaultDataType = {
  name: string
  themeColor: ThemeColor
  iconfont: string
  tabsName: string
  cardShadow: string
  localeSelect: { value: string; label: string }[]
  waterMark: WaterMarkType
  settings: DrawerSetting
  navSetting: NavSettingType
}

export default {
  name: 'Vite-Vue-Admin',
  themeColor,
  // icon图标类型
  iconfont: 'viteIcon',
  // tagView 显示的属性值 [name,title]
  tabsName: 'title',
  // 卡片阴影
  cardShadow: 'hover',
  localeSelect: [
    {
      value: 'zh-CN',
      label: '中文（简）',
    },
    {
      value: 'zh-TW',
      label: '中文（繁）',
    },
    {
      value: 'en-US',
      label: 'English',
    },
  ],
  navSetting: Object.assign(
    {
      // 默认语言
      locale: 'zh-CN',
      size: 'default',
    },
    navSetting
  ),
  // 全局水印
  waterMark: Object.assign(
    {
      switch: 0,
      text: 'Peng_Xiao_Shuai',
      ratio: 0,
      color: '#ddd',
      deg: -20,
      size: 25,
    },
    waterMark
  ),
  settings: Object.assign(
    {
      // layout配置
      fixed: 0,
      isLogo: 1,
      isTagsView: 1,
      defaultMenu: 1,
      leftMargin: 240,
      grayMode: 0,
    },
    settings
  ),
}
