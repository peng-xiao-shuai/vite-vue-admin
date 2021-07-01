<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <div class="operate-container">
        <div>
          <i class="viteIcon vitei" style="margin-right: 5px"></i>
          <span>md编辑器</span>
        </div>
      </div>

      <v-md-editor
        v-model="text"
        :left-toolbar="leftToolbar"
        height="700px"
      ></v-md-editor>
    </el-card>
  </div>
</template>

<script>
const text = `
<h2 align="center">Markdown Editor built on Vue</h2>

::: tip 我可以支持公式
  $$\sum_{i=1}^n a_i=0$$
:::

::: warning 我还支持表情
  :grinning:
:::

::: danger 还有任务列表
  - [ ] Task
:::

::: details
  这是一个详情块，在 IE / Edge 中不生效
:::

::: tip 流程图也不能忘
\`\`\`mermaid
graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);
\`\`\`
:::

## 引用

- [v-md-editor](https://ckang1229.gitee.io/vue-markdown-editor/zh)
`

import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {

    return {
      text,
      leftToolbar: 'undo redo clear | emoji todo-list | h bold italic strikethrough quote | ul ol table hr | link image code | save'
    }
  }
})
</script>

<style scoped lang="scss">
</style>