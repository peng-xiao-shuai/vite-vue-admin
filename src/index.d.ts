declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const defineComponent: DefineComponent<{}, {}, any>;
  export default defineComponent
}

declare module 'js-cookie'
declare module 'nprogress'
declare module 'el-plus-powerful-table'
declare module "prismjs"
declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@kangc/v-md-editor/lib/theme/github.js'
declare module '@kangc/v-md-editor/lib/preview'

