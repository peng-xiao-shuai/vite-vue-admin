import{D as e,r as t,o as a,c as o,a as r,w as n,i as s}from"./vendor.45a16529.js";const c={name:"iframe-",setup(){let t=e("https://gitee.com/abc1612565136/vite-admin"),a=!1;return function(e){let t=new Image;t.onload=function(){"function"==typeof e.success&&e.success(e.url)},t.onerror=function(){"function"==typeof e.error&&e.error(e.url)},t.src=e.url+"&"+Math.random()}({url:"https://avatars.githubusercontent.com/u/53845479?v=4",success:function(e){console.log("加载成功"),a=!0},error:function(e){console.log("加载失败"),a=!1}}),setTimeout((()=>{t.value=a?"https://github.com/Peng-Xiao-Shuai-0902/vite-vue-admin":"https://gitee.com/abc1612565136/vite-admin"}),1e3),{href:t}}},i={class:"app-container"},u=s("iframe",{src:"https://gitee.com/abc1612565136/vite-admin",frameborder:"0",width:"100%",height:"600px"},null,-1);c.render=function(e,s,c,d,l,m){const f=t("view-name"),h=t("el-card");return a(),o("div",i,[r(h,{shadow:e.defaultData.cardShadow},{default:n((()=>[r(f),u])),_:1},8,["shadow"])])};export default c;