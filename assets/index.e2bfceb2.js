import{i as v,a as _}from"./index.91992112.js";import{_ as h,d as w,y as g,r as c,o as i,c as r,a as d,w as x,i as a,F as y,g as V,h as C,t as $}from"./vendor.8c3eb18c.js";const k=w({name:"icons",components:{iconSelect:v},setup(){const e=[..._.matchAll(/\.(\w|\-)*\:/g)].map((n,t)=>n[0].substr(1,n[0].length).slice(0,-1)),o=[..._.matchAll(/\/\*(\s)(\w*|[^\x00-\xff]*)(\s)\*\//g)].map((n,t)=>({name:n[2],icon:e[t]})),l=g("");return{icons:o,iconVal:l}}}),B={class:"app-container"},D={class:"operate-container"},N={class:"icons"},S={class:"iconName"};function b(e,o,l,n,t,j){const p=c("view-name"),m=c("icon-select"),u=c("el-card");return i(),r("div",B,[d(u,{shadow:e.defaultData.cardShadow},{default:x(()=>[d(p),a("div",D,[d(m,{icon:e.iconVal,"onUpdate:icon":o[0]||(o[0]=s=>e.iconVal=s)},null,8,["icon"])]),a("div",N,[(i(!0),r(y,null,V(e.icons,(s,f)=>(i(),r("div",{class:"i-icon",key:f},[a("i",{class:C([e.defaultData.iconfont,s.icon])},null,2),a("div",S,$(s.name),1)]))),128))])]),_:1},8,["shadow"])])}var z=h(k,[["render",b],["__scopeId","data-v-3029ed2d"]]);export{z as default};
