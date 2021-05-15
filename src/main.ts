import { createApp, inject } from "vue";
import App from "./App.vue";
import Cookies from "js-cookie";
import router from "./router/index";
import store from "./store";
// 工具类
import { parseTime } from '/@/utils/parse-time';

import ElementPlus from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import powerfulTable from "el-plus-powerful-table";

// i18n
import VueI18n from './language'
import { useI18n } from 'vue-i18n';

// 国际化
import "dayjs/locale/zh-cn";
import cn from "element-plus/lib/locale/lang/zh-cn";
import "dayjs/locale/en";
import en from "element-plus/lib/locale/lang/en";

import "./permission";
import "./icons";

// 全局组件
import SvgIcon from "./components/SvgIcon/index.vue"; // svg component
// import powerfulTable from "./components/powerful-table/index.vue";
import uploadFile from "./components/upload-file/index.vue";

// 全局静态配置
import defalutData from "./config/defalut-data";

// css
import "./style/index.scss";

import { mockXHR } from "../mock/index";
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
    t() {
      const { t } = useI18n()
      return t
    },
    // 全局颜色
    themeColor() {
      return store.getters.getThemeColor;
    },
  },
});

// 判断语言
const locale = defalutData.locale === 'zh-CN' ? cn : en

app
  .use(store)
  .use(router)
  .use(powerfulTable)
  .use(ElementPlus, { size: Cookies.get('size') || 'medium', zIndex: 3000, locale })
  .use(VueI18n)
  .mount("#app");

app.component("svg-icon", SvgIcon);
// app.component("powerful-table", powerfulTable);
app.component("upload-file", uploadFile);

interface log {
  url: string;
  info: string;
  time: string | null;
  error: string | any;
  name: string,
  type: string
}
app.config.errorHandler = (error, vm, info) => {

  let data: log = {
    url: window.location.href,
    info,
    error,
    // 手动添加的type 为 info
    type: 'Bug',
    name: store.state.user.userInfo.username,
    time: parseTime(new Date())

  }
  store.commit('setErrorLog', data)
};

// 全局挂载
app.config.globalProperties.defalutData = defalutData;
