import{s as e}from"./index.538feb41.js";import{d as t,aa as a,D as l,ae as n,y as i,B as o,o as r,c as s,i as d,a8 as u,h as c,e as m,b as p,p as g,l as y,r as f,a as h,w as b,J as v}from"./vendor.958d76c5.js";const w=t({emits:["update:modelValue"],props:{modelValue:{type:String,default:""},slotStyle:{type:Object,default:()=>{}},height:{type:[String,Number],default:500},width:{type:[String,Number],default:500},plugins:{type:[String,Array],default:"lists fullscreen emoticons autosave image table wordcount emoticons"},toolbar:{type:[String,Array],default:"bold italic underline strikethrough restoredraft image fullscreen emoticons | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | removeformat"},url:{required:!0,type:String,default:""},data:{type:Array,default:()=>[{key:"type",value:0}]}},setup(e,t){a((()=>{e.height,window.tinymce.init({selector:`#${u}`,branding:!1,language_url:"/static/zh_CN.js",language:"zh_CN",height:e.height,width:e.width,plugins:r,toolbar:s,content_style:"div,p{margin:5px 0;}img{max-width:100%;}*::-webkit-scrollbar{width:6px;height:6px;background:transparent;}*::-webkit-scrollbar-thumb{border-radius: 3px;background: #bac3d9;}",images_upload_handler:(t,a,l)=>{let n=new FormData;n.append("file",t.blob(),t.filename()),e.data.forEach((e=>{n.append(e.key,e.value)})),o.post(e.url,n).then((e=>{200===e.data.code?a(e.data.data.url):l("上传失败")}))},init_instance_callback:function(e){d.value=!0}})}));let r=e.plugins,s=e.toolbar,d=l(!1),u="vue-tinymce-"+ +new Date;return n((()=>{d.value&&""!=e.modelValue&&i((()=>{window.tinymce.get(u).setContent(e.modelValue)}))})),{tinymceId:u,hasInit:d,getContentFun:function(){t.emit("update:modelValue",window.tinymce.get(u).getContent())}}}}),x={class:"tinymce-editor"},_=["id"];w.render=function(e,t,a,l,n,i){return r(),s("div",x,[d("textarea",{class:"tinymce-textarea",id:e.tinymceId},null,8,_),d("div",{onClick:t[0]||(t[0]=(...t)=>e.getContentFun&&e.getContentFun(...t)),style:c(e.slotStyle)},[u(e.$slots,"default")],4)])};var k=t({name:"modulesRichText",components:{tinyMce:w},setup(){m(),p();let t=l(""),a=l(null);return e({url:"modules/richText"}).then((e=>{t.value=e.data})),{myValue:t,getTinyMceFun:function(e){console.log("获取富文本数据",t.value)},scroll:a}}});g("data-v-51578ce2");const V={class:"app-container"},C=d("div",{class:"operate-container"},[d("div",null,[d("i",{class:"viteIcon viteZJ-fuwenben",style:{"margin-right":"5px"}}),d("span",null,"富文本编辑器")])],-1),S={class:"lineTinyBox"},T=v(" 确认 "),j={class:"phoneBox"},F=["innerHTML"];y(),k.render=function(e,t,a,l,n,i){const o=f("el-button"),u=f("tiny-mce"),c=f("el-scrollbar"),m=f("el-card");return r(),s("div",V,[h(m,{shadow:e.defaultData.cardShadow},{default:b((()=>[C,d("div",S,[h(u,{width:"100%",modelValue:e.myValue,"onUpdate:modelValue":t[1]||(t[1]=t=>e.myValue=t),height:667,url:"图片路径",ref:"tinymce",slotStyle:{display:"flex",justifyContent:"center",padding:"10px 0 0"}},{default:b((()=>[h(o,{type:"primary",onClick:t[0]||(t[0]=t=>e.getTinyMceFun())},{default:b((()=>[T])),_:1})])),_:1},8,["modelValue"]),d("div",j,[h(c,{style:{height:"667px"},class:"vHtml",ref:"scroll"},{default:b((()=>[d("div",{innerHTML:e.myValue},null,8,F)])),_:1},512)])])])),_:1},8,["shadow"])])},k.__scopeId="data-v-51578ce2";export default k;
