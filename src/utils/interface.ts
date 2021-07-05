/**
 * ts 接口
 */

// powerful-table 自定义事件
export interface handle {
  row: any,
  index: number,
}

export interface themeColor {
  primary: string,
  success: string,
  info: string,
  warning: string,
  danger: string,
  [s: string]: string
}
/**
 * @param isLogo 是否显示logo
 * @param isTagsView 是否显示顶部标签
 * @param fixed 是否固定显示顶部
 * @param leftMargin 左侧菜单栏宽度
 */
export interface drawerSetting {
  isLogo?: number,
  isTagsView?: number,
  fixed?: number,
  leftMargin?: number,
}

// 全局错误拦截
export interface log {
  url: string;
  info?: string;
  time: string | null;
  error: string | any;
  name: string,
  type: string
}