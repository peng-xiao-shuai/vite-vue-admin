import{p as b,g as B}from"./index.56d3d286.js";import{_ as F,d as v,f as C,D as y,J as h,r,b as w,v as V,j as u,e as o,k as m,x as L}from"./vendor.0885f2d9.js";const D=[{label:"\u8D26\u53F7\u540D",props:[{prop:"name"}]},{label:"\u95EE\u9898\u4FE1\u606F",props:[{prop:"info"}]},{label:"\u95EE\u9898\u5730\u5740",props:[{type:"href",prop:"url",data:{prop:"url",style:{fontWeight:"bold"}}}]},{label:"\u95EE\u9898\u8BE6\u60C5",props:[{prop:"error"}]},{label:"\u95EE\u9898\u65F6\u95F4",props:[{prop:"time"}]},{label:"\u95EE\u9898\u7C7B\u578B",props:[{prop:"type"}]}],Q=v({name:"error-log",setup(e,t){const d=C(),c=y(0),f=y([]),E=d.getters.getBugs,p=h({pageNum:1,pageSize:10}),n=h({value:0,operates:[{label:"\u4E0A\u4F20",value:0}]}),l=h({url:"",info:"",error:"",type:"Info",name:d.state.user.userInfo.username,time:b(new Date)}),i=s=>{Object.assign(p,s||{}),B(p).then(a=>{f.value=a.data.list,c.value=a.data.total})};return i(),{list:f,sList:E,operateData:n,addQuery:l,total:c,handleBatchChange:s=>{console.log("\u4E0A\u4F20")},addLog:()=>{d.commit("setErrorLog",JSON.parse(JSON.stringify(l)))},getList:i,config:D}}}),S={style:{margin:"15px 0"}},N={class:"screenForm"},k=L("\u63D0\u4EA4"),O=m("div",{style:{margin:"15px 0"}},"\u65B0\u95EE\u9898",-1),j=m("div",{style:{margin:"15px 0"}},"\u5386\u53F2\u95EE\u9898",-1);function $(e,t,d,c,f,E){const p=r("view-name"),n=r("el-input"),l=r("el-form-item"),i=r("el-button"),_=r("el-form"),g=r("powerful-table"),s=r("el-card");return w(),V(s,{shadow:e.defaultData.cardShadow},{default:u(()=>[o(p),m("div",S,[o(_,{inline:!0,model:e.addQuery},{default:u(()=>[m("div",N,[o(l,null,{default:u(()=>[o(n,{modelValue:e.addQuery.info,"onUpdate:modelValue":t[0]||(t[0]=a=>e.addQuery.info=a),placeholder:"\u8BF7\u8F93\u5165\u95EE\u9898\u4FE1\u606F",style:{width:"80%"},clearable:""},null,8,["modelValue"])]),_:1}),o(l,{prop:"url"},{default:u(()=>[o(n,{modelValue:e.addQuery.url,"onUpdate:modelValue":t[1]||(t[1]=a=>e.addQuery.url=a),placeholder:"\u8BF7\u8F93\u5165\u95EE\u9898\u5730\u5740",style:{width:"80%"},clearable:""},null,8,["modelValue"])]),_:1}),o(l,{prop:"error"},{default:u(()=>[o(n,{modelValue:e.addQuery.error,"onUpdate:modelValue":t[2]||(t[2]=a=>e.addQuery.error=a),placeholder:"\u8BF7\u8F93\u5165\u95EE\u9898\u8BE6\u60C5",style:{width:"80%"},clearable:""},null,8,["modelValue"])]),_:1}),o(l,null,{default:u(()=>[o(i,{type:"primary",onClick:e.addLog},{default:u(()=>[k]),_:1},8,["onClick"])]),_:1})])]),_:1},8,["model"])]),O,o(g,{list:e.sList,header:e.config,isPagination:!1,isSelect:"",operateData:e.operateData,onBatchOperate:e.handleBatchChange},null,8,["list","header","operateData","onBatchOperate"]),j,o(g,{ref:"Table",list:e.list,header:e.config,total:e.total,onSizeChange:e.getList},null,8,["list","header","total","onSizeChange"])]),_:1},8,["shadow"])}var J=F(Q,[["render",$]]);export{J as default};