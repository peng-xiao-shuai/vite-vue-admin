const themeColor: any = window.localStorage.getItem("themeColor");
const locale: any = window.localStorage.getItem("locale");

export default {
  name: "vite-admin",
  themeColor: {
    background: themeColor || "#AD49FF",
  },
  // icon图标类型
  iconfont: "viteIcon",
  // tagView 显示的属性值 [name,title]
  tabsName: "title",
  // 卡片阴影
  cardShadow: "hover",
  // 默认语言
  locale: locale || 'zh-CN',
};
