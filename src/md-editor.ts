// markdown 编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

// github主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// vuepress主题
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

import Prism from 'prismjs'
VMdEditor.use(vuepressTheme, {
  Prism
});

// 语言
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
// VMdEditor.lang.use('en-US', enUS);

// katex
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
VMdEditor.use(createKatexPlugin());

// 表情
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
VMdEditor.use(createEmojiPlugin());

// 流程图
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
VMdEditor.use(createMermaidPlugin());

// 任务列表
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
VMdEditor.use(createTodoListPlugin());

// 快速复制
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VMdEditor.use(createCopyCodePlugin());

export default VMdEditor