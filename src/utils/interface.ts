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
export interface setting {
  drawerSetting?: {
    isLogo?: number,
    isTagsView?: number,
    fixed?: number
  },
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