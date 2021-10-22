declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const defineComponent: DefineComponent<{}, {}, any>;
  export default defineComponent
}

declare module 'js-cookie'
declare module 'nprogress'
declare module 'mockjs'
declare module 'el-plus-powerful-table'
declare module 'vue3-number-roll-plus'

// marldown 依赖
declare module "prismjs"
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
