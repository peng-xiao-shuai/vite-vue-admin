// markdown 编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from "prismjs";

// 语言
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
VMdEditor.lang.use('en-US', enUS);

VMdEditor.use(vuepressTheme, {
  Prism
});

export default VMdEditor