import{_ as i,d as m,r as n,b as p,c,e as d,j as F,k as u,n as h}from"./vendor.4a074574.js";const E=`
<h2 align="center">Markdown Editor built on Vue</h2>

::: tip \u6211\u53EF\u4EE5\u652F\u6301\u516C\u5F0F
  $$\\sum_{i=1}^n a_i=0$$
:::

::: warning \u6211\u8FD8\u652F\u6301\u8868\u60C5
  :grinning:
:::

::: danger \u8FD8\u6709\u4EFB\u52A1\u5217\u8868
  - [ ] Task
:::

::: details
  \u8FD9\u662F\u4E00\u4E2A\u8BE6\u60C5\u5757\uFF0C\u5728 IE / Edge \u4E2D\u4E0D\u751F\u6548
:::

::: tip \u6D41\u7A0B\u56FE (\u8BF7\u5C06index.html\u6587\u4EF6\u4E2D\u7684\u5F15\u5165\u7684\u5916\u90E8\u6D41\u7A0B\u56FEjs\u53D6\u6D88\u6CE8\u91CA\uFF0C\u5E76\u4E14\u5C06md-editor.ts\u6D41\u7A0B\u56FE\u6CE8\u91CA\u90E8\u5206\u53D6\u6D88)
\`\`\`mermaid
graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);
\`\`\`
:::

## \u5F15\u7528

- [v-md-editor](https://ckang1229.gitee.io/vue-markdown-editor/zh)
`,g=m({name:"md-markdown",setup(){return{text:E,leftToolbar:"undo redo clear | emoji todo-list | h bold italic strikethrough quote | ul ol table hr | link image code | save",handleUploadImage:(a,o,t)=>{console.log(t),o({url:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg",desc:"\u4E03\u9F99\u73E0"})}}}}),f={class:"app-container"},_={class:"operate-container"},C=u("span",null,"md\u7F16\u8F91\u5668",-1);function D(e,a,o,t,v,b){const l=n("v-md-editor"),s=n("el-card");return p(),c("div",f,[d(s,{shadow:e.defaultData.cardShadow},{default:F(()=>[u("div",_,[u("div",null,[u("i",{class:h([e.defaultData.iconfont,"vitemarkdown"]),style:{"margin-right":"5px"}},null,2),C])]),d(l,{modelValue:e.text,"onUpdate:modelValue":a[0]||(a[0]=r=>e.text=r),"left-toolbar":e.leftToolbar,height:"700px","disabled-menus":[],onUploadImage:e.handleUploadImage},null,8,["modelValue","left-toolbar","onUploadImage"])]),_:1},8,["shadow"])])}var B=i(g,[["render",D]]);export{B as default};
