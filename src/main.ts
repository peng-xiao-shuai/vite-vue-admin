import { createApp, inject } from "vue";
import App from "./App.vue";
import Cookies from "js-cookie";
import router from "./router/index";
import store from "./store";
import ElementPlus from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import powerfulTable from "el-plus-powerful-table";

// import DigitRoll from "digit-roll";

// 国际化
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

import "./permission";
import "./icons";

// 全局组件
import SvgIcon from "./components/SvgIcon/index.vue"; // svg component
// import powerfulTable from "./components/powerful-table/index.vue";
import uploadFile from "./components/upload-file/index.vue";

// 全局静态配置
import defalutData from "./config/defalut-data";

// css
// vite 暂不支持scss :export
import "./style/iconfont.css";
// import "element-plus/packages/theme-chalk/src/index.scss";
import "./style/index.scss";

import { mockXHR } from "../mock/index";
import { CommonPicker } from "element-plus/lib/el-time-picker";
// if (
//   import.meta.env.VITE_MOCK === "true"
// ) {
  mockXHR();
// }

let app = createApp(App);
app.provide("$message", ElMessage);
app.provide("messageBox", ElMessageBox);

app.mixin({
  computed: {
    // 全局颜色
    themeColor() {
      return store.getters.getThemeColor;
    },
  },
});
console.log( store.getters.getElementSize);

app
  .use(store)
  .use(router)
  .use(powerfulTable)
  .use(ElementPlus, { size: Cookies.get('size') || 'medium', zIndex: 3000, locale })
  .mount("#app");

app.component("svg-icon", SvgIcon);
// app.component("powerful-table", powerfulTable);
app.component("upload-file", uploadFile);

// 全局挂载
app.config.globalProperties.defalutData = defalutData;
