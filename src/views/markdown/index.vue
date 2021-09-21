<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <div class="operate-container">
        <div>
          <i :class="[defaultData.iconfont,'vitemarkdown']" style="margin-right: 5px"></i>
          <span>md编辑器</span>
        </div>
      </div>

      <v-md-editor
        v-model="text"
        :left-toolbar="leftToolbar"
        height="700px"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
      ></v-md-editor>
    </el-card>
  </div>
</template>

<script lang='ts'>
const text = `
<h2 align="center">Markdown Editor built on Vue</h2>

::: tip 我可以支持公式
  $$\\sum_{i=1}^n a_i=0$$
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

::: tip 流程图 (请将index.html文件中的引入的外部流程图js取消注释，并且将md-editor.ts流程图注释部分取消)
\`\`\`mermaid
graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);
\`\`\`
:::

## 引用

- [v-md-editor](https://ckang1229.gitee.io/vue-markdown-editor/zh)
`;

import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "md-markdown",
  setup() {
    const handleUploadImage = (event: Event, insertImage: Function, files: File[]) => {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files);

      // 此处只做示例
      insertImage({
        url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg",
        desc: "七龙珠",
        // width: 'auto',
        // height: 'auto',
      });
    };

    return {
      text,
      leftToolbar:
        "undo redo clear | emoji todo-list | h bold italic strikethrough quote | ul ol table hr | link image code | save",
      handleUploadImage,
    };
  },
});
</script>

<style scoped lang="scss">
</style>