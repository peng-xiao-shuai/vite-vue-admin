import{d as u,k as i,_ as p,f as d,o as m,h as _,w as F,i as v,E as C}from"./index-22d7fef2.js";import{e as w,L as f}from"./index-6af67200.js";import{l as y}from"./index-90c873f2.js";const B=u({name:"EChartsLine",components:{easyEchart:w},setup(){let o=i({value:{}});const t=[{opacity:.4,color:new f(0,0,0,1,[{offset:0,color:"#5BB1FF"},{offset:1,color:"rgba(255,255,255,0)"}])},{opacity:.4,color:new f(0,0,0,1,[{offset:0,color:"#AD49FF"},{offset:1,color:"rgba(255,255,255,0)"}])}],a=["#5BB1FF","#AD49FF","#F6A829","rgb(85, 188, 255)"];let r=i({value:[]});n();function n(h,s="Seven"){y().then(e=>{e.data.homeDateInfoResult.forEach((c,l)=>{c.areaStyle=t[l],r.value.push({name:c.name,color:a[l]})}),o.value=e.data})}return{chart:o,colors:a}}});function E(o,t,a,r,n,h){const s=d("easy-echart"),e=C;return m(),_(e,{shadow:o.defaultData.cardShadow},{default:F(()=>[v(s,{isSlot:!1,echartsId:"line-echart",height:600,colors:o.colors,information:o.chart.value,title:"折线图",types:"line"},null,8,["colors","information"])]),_:1},8,["shadow"])}const S=p(B,[["render",E]]);export{S as default};
