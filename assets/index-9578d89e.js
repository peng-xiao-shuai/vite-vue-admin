import{d as r,_ as m,f as p,o as c,a as u,i as d,w as h,b as o,j as f,E as g}from"./index-b02eb4b8.js";const _=`
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
`,b=r({name:"MdMarkdown",setup(){return{text:_,leftToolbar:"undo redo clear | emoji todo-list | h bold italic strikethrough quote | ul ol table hr | link image code | save",handleUploadImage:(a,t,n)=>{console.log(n),t({url:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg",desc:"七龙珠"})}}}}),v={class:"app-container"},k={class:"operate-container"},w=o("span",null,"md编辑器",-1);function $(e,a,t,n,x,B){const l=p("v-md-editor"),s=g;return c(),u("div",v,[d(s,{shadow:e.defaultData.cardShadow},{default:h(()=>[o("div",k,[o("div",null,[o("i",{class:f([e.defaultData.iconfont,"vitemarkdown"]),style:{"margin-right":"5px"}},null,2),w])]),d(l,{modelValue:e.text,"onUpdate:modelValue":a[0]||(a[0]=i=>e.text=i),"left-toolbar":e.leftToolbar,height:"700px","disabled-menus":[],onUploadImage:e.handleUploadImage},null,8,["modelValue","left-toolbar","onUploadImage"])]),_:1},8,["shadow"])])}const E=m(b,[["render",$]]);export{E as default};
