/**
 * ts 接口
 */

// powerful-table 自定义事件
export interface Handle {
  row: any
  index: number
}

export interface ThemeColor {
  primary: string
  success: string
  info: string
  warning: string
  danger: string
  [s: string]: string
}

/**
 * layout 配置
 * @param isLogo 是否显示logo
 * @param isTagsView 是否显示顶部标签
 * @param fixed 是否固定显示顶部
 * @param leftMargin 左侧菜单栏宽度
 * @param defaultMenu 默认菜单展开
 * @param grayMode 灰度模式
 */
export interface DrawerSetting {
  isLogo: number
  isTagsView: number
  fixed: number
  leftMargin: number
  defaultMenu: number
  grayMode: number
  [s: string]: number
}

// 全局错误拦截
export interface Log {
  url: string
  info?: string
  time: string | null
  error: string | any
  name: string
  type: string
}

export interface WaterMarkType {
  switch: number
  text: string
  ratio: number
  color: string
  deg: number
  size: number
  [s: string]: string | number
}

export interface NavSettingType {
  dark: boolean
  size: string
  locale: string
  [s: string]: string | boolean
}

// 类型保护
export function isType<T extends Indexes>(
  pet: T | keyof any,
  k?: string | number
): pet is T {
  return (k && (<T>pet)[k]) !== undefined
}
