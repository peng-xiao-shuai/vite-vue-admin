let themeColor: any = {
  primary: "#AD49FF",
  success: '#67c23a',
  info: '#909399',
  warning: '#e6a23c',
  danger: '#f56c6c',
}

Object.keys(themeColor).forEach((item: any) => {
  themeColor[item] = window.localStorage.getItem(item) ? window.localStorage.getItem(item) : themeColor[item]
  document.documentElement.style.setProperty('--color-' + item, themeColor[item])
})
const locale: any = window.localStorage.getItem("locale");

export default {
  name: "vite-admin",
  themeColor,
  // icon图标类型
  iconfont: "viteIcon",
  // tagView 显示的属性值 [name,title]
  tabsName: "title",
  // 卡片阴影
  cardShadow: "hover",
  // 默认语言
  locale: locale || 'zh-CN',
};
