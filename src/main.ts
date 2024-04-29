import { Component, createApp } from 'vue'
import { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { useSettingStore, useUserStore } from '@/stores/index'

// 指令
import directive from './directives/directive'
// 工具类
import { parseTime } from '@/utils/parse-time'

// css
import './styles/index.scss'
import * as ElementIcon from '@element-plus/icons-vue'
import powerfulTable from 'el-plus-powerful-table-ts/es'

// i18n
import VueI18n from './language'
import { useI18n } from 'vue-i18n'

// 国际化
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

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
import defaultData, { DefaultDataType } from './config/default-data'
import { debounce, throttle } from '@/config/debounce-throttle'
import { permissionFun } from '@/config/roles-permission'
import { mockXHR } from '../mock/index'
// if (
//   import.meta.env.VITE_MOCK === "true"
// ) {
/**
 * mock 会存在请求不到高德jsapi的地图数据问题。请在 8364行添加
 * this.custom.xhr.responseType = this.responseType
 */
mockXHR()
// }

if ((import.meta as any).env.MODE !== 'development') {
  window.console.log = () => {}
}

const app = createApp(App)

app.mixin({
  computed: {
    t() {
      const { t } = useI18n()
      return t
    },
    themeColor() {
      return useSettingStore().themeColor.primary
    },
  },
})

app
  .use(router)
  .use(createPinia())
  .use(powerfulTable)
  .use(VueI18n)
  .use(VMdEditor)
  .use(VMdPreview)
  .mount('#app')

// app.component("svg-icon", SvgIcon);
app.component('UploadFile', uploadFile)
app.component('ViewName', viewName)
for (const key in ElementIcon) {
  app.component(
    (ElementIcon as { [s: string]: Component })[key].name || key,
    (ElementIcon as { [s: string]: Component })[key]
  )
}

directive(app)

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    UploadFile: typeof uploadFile
    ViewName: typeof viewName
  }
  interface ComponentCustomProperties {
    themeColor: string
    t: (str: string) => string
    defaultData: DefaultDataType // 这里可以用$Api具体的类型代替any
    $debounce: Function
    $throttle: Function
    $permission: Function
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
    name: useUserStore().userInfo.username,
    time: parseTime(new Date()),
  }
  useSettingStore().errorLog.push(data)
}

// 全局挂载
app.config.globalProperties.defaultData = defaultData
app.config.globalProperties.$debounce = debounce
app.config.globalProperties.$throttle = throttle
app.config.globalProperties.$permission = permissionFun
