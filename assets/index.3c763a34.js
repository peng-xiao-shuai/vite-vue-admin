import{s as C}from"./index.56d3d286.js";import{d as y,o as x,D as h,af as k,R as V,V as S,_ as v,b,c as w,k as n,P as $,m as F,r as c,e as m,j as f,n as B,B as T,C as D,x as j}from"./vendor.0885f2d9.js";function E(){return C({url:"modules/richText"})}const N=y({emits:["update:modelValue"],props:{modelValue:{type:String,default:""},slotStyle:{type:Object,default:()=>{}},height:{type:[String,Number],default:500},width:{type:[String,Number],default:500},plugins:{type:[String,Array],default:"lists fullscreen emoticons autosave image table wordcount emoticons"},toolbar:{type:[String,Array],default:"bold italic underline strikethrough restoredraft image fullscreen emoticons | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | removeformat"},url:{required:!0,type:String,default:""},data:{type:Array,default:()=>[{key:"type",value:0}]}},setup(e,t){x(()=>{p(e.height)});let o=e.plugins,i=e.toolbar,a=h(!1),l="vue-tinymce-"+ +new Date;k(()=>{a.value&&e.modelValue!=""&&V(()=>{window.tinymce.get(l).setContent(e.modelValue)})});function s(){t.emit("update:modelValue",window.tinymce.get(l).getContent())}function p(){window.tinymce.init({selector:`#${l}`,branding:!1,language_url:"/static/zh_CN.js",language:"zh_CN",height:e.height,width:e.width,plugins:o,toolbar:i,content_style:"div,p{margin:5px 0;}img{max-width:100%;}*::-webkit-scrollbar{width:6px;height:6px;background:transparent;}*::-webkit-scrollbar-thumb{border-radius: 3px;background: #bac3d9;}",images_upload_handler:(d,_,r)=>{let g=new FormData;g.append("file",d.blob(),d.filename()),e.data.forEach(u=>{g.append(u.key,u.value)}),S.post(e.url,g).then(u=>{u.data.code===200?_(u.data.data.url):r("\u4E0A\u4F20\u5931\u8D25")})},init_instance_callback:function(d){a.value=!0}})}return{tinymceId:l,hasInit:a,getContentFun:s}}}),I={class:"tinymce-editor"},M=["id"];function z(e,t,o,i,a,l){return b(),w("div",I,[n("textarea",{class:"tinymce-textarea",id:e.tinymceId},null,8,M),n("div",{onClick:t[0]||(t[0]=(...s)=>e.getContentFun&&e.getContentFun(...s)),style:F(e.slotStyle)},[$(e.$slots,"default")],4)])}var A=v(N,[["render",z]]);const H=y({name:"modulesRichText",components:{tinyMce:A},setup(){let e=h(""),t=h(null);o();function o(){E().then(a=>{e.value=a.data})}function i(){console.log("\u83B7\u53D6\u5BCC\u6587\u672C\u6570\u636E",e.value)}return{myValue:e,getTinyMceFun:i,scroll:t}}}),q=e=>(T("data-v-2d914d92"),e=e(),D(),e),L={class:"app-container"},R={class:"operate-container"},J=q(()=>n("span",null,"\u5BCC\u6587\u672C\u7F16\u8F91\u5668",-1)),O={class:"lineTinyBox"},P=j(" \u786E\u8BA4 "),U={class:"phoneBox"},Z=["innerHTML"];function G(e,t,o,i,a,l){const s=c("el-button"),p=c("tiny-mce"),d=c("el-scrollbar"),_=c("el-card");return b(),w("div",L,[m(_,{shadow:e.defaultData.cardShadow},{default:f(()=>[n("div",R,[n("div",null,[n("i",{class:B([e.defaultData.iconfont,"viteZJ-fuwenben"]),style:{"margin-right":"5px"}},null,2),J])]),n("div",O,[m(p,{width:"100%",modelValue:e.myValue,"onUpdate:modelValue":t[1]||(t[1]=r=>e.myValue=r),height:667,url:"\u56FE\u7247\u8DEF\u5F84",ref:"tinymce",slotStyle:{display:"flex",justifyContent:"center",padding:"10px 0 0"}},{default:f(()=>[m(s,{type:"primary",onClick:t[0]||(t[0]=r=>e.getTinyMceFun())},{default:f(()=>[P]),_:1})]),_:1},8,["modelValue"]),n("div",U,[m(d,{style:{height:"667px"},class:"vHtml",ref:"scroll"},{default:f(()=>[n("div",{innerHTML:e.myValue},null,8,Z)]),_:1},512)])])]),_:1},8,["shadow"])])}var W=v(H,[["render",G],["__scopeId","data-v-2d914d92"]]);export{W as default};