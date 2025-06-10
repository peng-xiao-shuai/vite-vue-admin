import{d as i,_ as m,e as p,o as u,f as c,g as d,w as g,k as a,v as h,E as f}from"./index-eb619e6a.js";const _=`
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
`,v=i({name:"MdMarkdown",setup(){return{text:_,leftToolbar:"undo redo clear | emoji todo-list | h bold italic strikethrough quote | ul ol table hr | link image code | save",handleUploadImage:(o,t,n)=>{console.log(n),t({url:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg",desc:"七龙珠"})}}}}),k={class:"app-container"},b={class:"operate-container"};function w(e,o,t,n,$,x){const l=p("v-md-editor"),s=f;return u(),c("div",k,[d(s,{shadow:e.defaultData.cardShadow},{default:g(()=>[a("div",b,[a("div",null,[a("i",{class:h([e.defaultData.iconfont,"vitemarkdown"]),style:{"margin-right":"5px"}},null,2),o[1]||(o[1]=a("span",null,"md编辑器",-1))])]),d(l,{modelValue:e.text,"onUpdate:modelValue":o[0]||(o[0]=r=>e.text=r),"left-toolbar":e.leftToolbar,height:"700px","disabled-menus":[],onUploadImage:e.handleUploadImage},null,8,["modelValue","left-toolbar","onUploadImage"])]),_:1},8,["shadow"])])}const C=m(v,[["render",w]]);export{C as default};
