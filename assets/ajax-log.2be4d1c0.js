import{l as o}from"./index.d80dab01.js";import{r as e,o as n,c as r,a,j as d,G as l}from"./vendor.d2840fd2.js";const t={methods:{handleNewError(){o().then((o=>{console.log(o)}))}}},s=l("触发一个错误"),c=a("p",null,'此错误已经被记录在日志页面，并在页面右上"日志按钮"区域显示提示信息',-1);t.render=function(o,l,t,i,u,f){const m=e("el-button");return n(),r("div",null,[a(m,{type:"danger",onClick:f.handleNewError},{default:d((()=>[s])),_:1},8,["onClick"]),c])};export default t;
