import{_ as a,L as o}from"./index.7aa513c0.js";import{l as e}from"./index.e780276e.js";import{d as r,J as t,r as s,o as l,m as n,w as c,a as i}from"./vendor.2b6d80ee.js";import"./index.715306b4.js";var f=r({name:"eChartsLine",components:{easyEchart:a},setup(a,r){let s=t({value:{}});const l=[{opacity:.4,color:new o(0,0,0,1,[{offset:0,color:"#5BB1FF"},{offset:1,color:"rgba(255,255,255,0)"}])},{opacity:.4,color:new o(0,0,0,1,[{offset:0,color:"#AD49FF"},{offset:1,color:"rgba(255,255,255,0)"}])}],n=["#5BB1FF","#AD49FF","#F6A829","rgb(85, 188, 255)"];let c=t({value:[]});return e().then((a=>{a.data.homeDateInfoResult.forEach(((a,o)=>{a.areaStyle=l[o],c.value.push({name:a.name,color:n[o]})})),s.value=a.data})),{chart:s,colors:n}}});f.render=function(a,o,e,r,t,f){const d=s("easy-echart"),h=s("el-card");return l(),n(h,{shadow:a.defaultData.cardShadow},{default:c((()=>[i(d,{isSlot:!1,echartsId:"line-echart",height:600,colors:a.colors,information:a.chart.value,title:"折线图",types:"line"},null,8,["colors","information"])])),_:1},8,["shadow"])};export default f;