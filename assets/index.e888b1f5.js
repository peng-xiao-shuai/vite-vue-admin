import{_ as e,E as t,r as a,o,c as r,a as n,w as s,i as c}from"./vendor.85146a32.js";const i={name:"iframe-",setup(){let e=t("https://gitee.com/abc1612565136/vite-admin"),a=!1;return function(e){let t=new Image;t.onload=function(){"function"==typeof e.success&&e.success(e.url)},t.onerror=function(){"function"==typeof e.error&&e.error(e.url)},t.src=e.url+"&"+Math.random()}({url:"https://avatars.githubusercontent.com/u/53845479?v=4",success:function(e){console.log("加载成功"),a=!0},error:function(e){console.log("加载失败"),a=!1}}),setTimeout((()=>{e.value=a?"https://github.com/Peng-Xiao-Shuai-0902/vite-vue-admin":"https://gitee.com/abc1612565136/vite-admin"}),1e3),{href:e}}},u={class:"app-container"},d=c("iframe",{src:"https://gitee.com/abc1612565136/vite-admin",frameborder:"0",width:"100%",height:"600px"},null,-1);var l=e(i,[["render",function(e,t,c,i,l,m){const f=a("view-name"),h=a("el-card");return o(),r("div",u,[n(h,{shadow:e.defaultData.cardShadow},{default:s((()=>[n(f),d])),_:1},8,["shadow"])])}]]);export default l;
