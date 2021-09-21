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
 * layout 配置
 * @param isLogo 是否显示logo
 * @param isTagsView 是否显示顶部标签
 * @param fixed 是否固定显示顶部
 * @param leftMargin 左侧菜单栏宽度
 * @param defaultMenu 默认菜单展开
 * @param grayMode 灰度模式
 */
export interface drawerSetting {
  isLogo: number,
  isTagsView: number,
  fixed: number,
  leftMargin: number,
  defaultMenu: number
  grayMode: number,
  [s: string]: number
}
/**
* 菜单颜色
* @param menuBackground 菜单背景颜色
* @param itemHoverBackground 悬浮背景颜色
* @param itemHoverColor 悬浮文字颜色
* @param childrenBackground 下级菜单颜色
* @param childrenHoverBackground 下级菜单悬浮背景颜色
* @param submenuTitleColor 菜单文字颜色
* @param logo logo文字颜色
* @param logoBackground logo背景颜色
*/

export interface menuColors {
  // 菜单颜色
  menuBackground: string,
  itemHoverBackground: string,
  itemHoverColor: string,
  childrenBackground: string,
  childrenHoverBackground: string,
  submenuTitleColor: string,
  logoColor: string,
  logoBackground: string,
  [s: string]: string
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

export interface waterMarkType {
  switch: number,
  text: string,
  ratio: number,
  color: string,
  deg: number,
  size: number,
  [s: string]: string|number
}