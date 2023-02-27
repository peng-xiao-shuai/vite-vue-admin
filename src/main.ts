import { createApp } from 'vue'
import { Store } from 'vuex'
import { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import App from './App.vue'
import Cookies from 'js-cookie'
import router from './router/index'
import store, { State } from './store'
import type { UserInfo } from './store/modules/user'

// 指令
import directive from './directives/directive'
// 工具类
import { parseTime } from '@/utils/parse-time'

import ElementPlus from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import powerfulTable from 'el-plus-powerful-table-ts/es'

// i18n
import VueI18n from './language'
import { useI18n } from 'vue-i18n'

// 国际化
import 'dayjs/locale/zh-cn'
import cn from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/en'
import en from 'element-plus/lib/locale/lang/en'

// 路由守卫
import './permission'

// 注入svg脚本
import 'virtual:svg-icons-register'

// markdow 编辑器
import { VMdEditor, VMdPreview } from './md-editor'

// 全局组件
// import SvgIcon from "./components/SvgIcon/index.vue"; // svg component
import uploadFile from './components/upload-file/index.vue'
import viewName from './components/view-name/view-name.vue'

// 全局静态配置
import defaultData, { defaultDataType } from './config/default-data'
import { debounce, throttle } from '@/config/debounce-throttle'
import { permissionFun } from '@/config/roles-permission'

// css
import './styles/index.scss'

import { mockXHR } from '../mock/index'
// if (
//   import.meta.env.VITE_MOCK === "true"
// ) {
mockXHR()
// }

if ((import.meta as any).env.MODE !== 'development') {
  window.console.log = () => {}
}

const app = createApp(App)
app.provide('$message', ElMessage)
app.provide('messageBox', ElMessageBox)

app.mixin({
  computed: {
    t() {
      const { t } = useI18n()
      return t
    },
    themeColor() {
      return store.getters.getThemeColor
    },
  },
})

// 判断语言
const locale = defaultData.locale === 'zh-CN' ? cn : en

app
  .use(router)
  .use(store)
  .use(powerfulTable)
  .use(ElementPlus, {
    size: Cookies.get('size') || 'small',
    zIndex: 3000,
    locale,
  })
  .use(VueI18n)
  .use(VMdEditor)
  .use(VMdPreview)
  .mount('#app')

// app.component("svg-icon", SvgIcon);
app.component('UploadFile', uploadFile)
app.component('ViewName', viewName)

directive(app)

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    UploadFile: typeof uploadFile
    ViewName: typeof viewName
  }
  interface ComponentCustomProperties {
    themeColor: string
    t: (str: string) => string
    defaultData: defaultDataType // 这里可以用$Api具体的类型代替any
    $debounce: Function
    $throttle: Function
    $permission: Function
    $store: Store<State>
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }
}

// 错误拦截
interface log {
  url: string
  info: string
  time: string | null
  error: string
  name: string
  type: string
}
app.config.errorHandler = (error: string, vm: any, info: string) => {
  console.error(error)

  const data: log = {
    url: window.location.href,
    info,
    error,
    // 手动添加的type 为 info
    type: 'Bug',
    name: (store.state.user.userInfo as UserInfo).username,
    time: parseTime(new Date()),
  }
  store.commit('setErrorLog', data)
}

// 全局挂载
app.config.globalProperties.defaultData = defaultData
app.config.globalProperties.$debounce = debounce
app.config.globalProperties.$throttle = throttle
app.config.globalProperties.$permission = permissionFun
