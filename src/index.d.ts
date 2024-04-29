/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const defineComponent: DefineComponent<object, object, any>
  export default defineComponent
}

declare module '@/*'
declare module '*.js'

declare module 'js-cookie'
declare module 'nprogress'
declare module 'mockjs'
declare module 'vue3-number-roll-plus'

// // marldown 依赖
declare module 'prismjs'
declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@kangc/v-md-editor/lib/theme/github.js'
declare module '@kangc/v-md-editor/lib/preview'
declare module '@kangc/v-md-editor/lib/lang/en-US'
declare module '@kangc/v-md-editor/lib/plugins/katex/cdn'
declare module '@kangc/v-md-editor/lib/plugins/emoji/index'
declare module '@kangc/v-md-editor/lib/plugins/todo-list/index'
declare module '@kangc/v-md-editor/lib/plugins/copy-code/index'
declare module 'file-saver'
declare module 'exceljs/dist/exceljs'

declare type Indexes = { [s: string | number]: any }
declare type RequestRes<T> = { data: T; code: number }
