// markdown 编辑器
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// 预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview'

// github主题
// import _githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
// import '@kangc/v-md-editor/lib/theme/style/github.css'

// vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import('prismjs').then((Prism) => {
  VMdEditor.use(vuepressTheme, {
    Prism,
  })
  VMdPreview.use(vuepressTheme, {
    Prism,
  })
})

// 语言
// import enUS from '@kangc/v-md-editor/lib/lang/en-US'
// VMdEditor.lang.use('en-US', enUS);

// katex
import('@kangc/v-md-editor/lib/plugins/katex/cdn').then((module) => {
  VMdEditor.use(module.default())
  VMdPreview.use(module.default())
})

// 表情
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
import('@kangc/v-md-editor/lib/plugins/emoji/index').then((module) => {
  VMdEditor.use(module.default())
  VMdPreview.use(module.default())
})

// 流程图
// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
// import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
// VMdEditor.use(createMermaidPlugin());
// VMdPreview.use(createMermaidPlugin());

// 任务列表
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
import('@kangc/v-md-editor/lib/plugins/todo-list/index').then((module) => {
  VMdEditor.use(module.default())
  VMdPreview.use(module.default())
})

// 快速复制
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import('@kangc/v-md-editor/lib/plugins/copy-code/index').then((module) => {
  VMdEditor.use(module.default())
  VMdPreview.use(module.default())
})

export { VMdEditor, VMdPreview }
