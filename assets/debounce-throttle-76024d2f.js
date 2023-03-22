import{d as x,f as w,c4 as g,o as d,h as c,w as i,i as a,b as o,bc as v,p as e,I as b,E as $,R as B,S as k,c5 as z,_ as C}from"./index-22d7fef2.js";const s=p=>(B("data-v-024006bc"),p=p(),k(),p),I=s(()=>o("h4",{style:{"margin-bottom":"0"}},"防抖",-1)),S={class:"grid grid-c-3"},D=s(()=>o("div",{class:"tipBox"},[e(" 基础防抖（指令） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' v-debounce="[msg]" ')],-1)),E=s(()=>o("div",{class:"tipBox"},[e(" 立即执行（指令） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' v-debounce="[msg, 1000, [], true]" ')],-1)),N=s(()=>o("div",{class:"tipBox"},[e(" 带参（指令） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},` v-debounce="[msg, 300, ['风和自由']]" `)],-1)),T={class:"grid grid-c-3"},V=s(()=>o("div",{class:"tipBox"},[e(" 基础防抖（函数） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' @click="$debounce(msg)" ')],-1)),R=s(()=>o("div",{class:"tipBox"},[e(" 立即执行（函数） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' @click="$debounce(msg, 1000), [], true)" ')],-1)),j=s(()=>o("div",{class:"tipBox"},[e(" 带参（函数） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},` @click="$debounce(msg, 300), ['风和自由'])" `)],-1)),q=s(()=>o("h4",{style:{"margin-bottom":"0"}},"节流",-1)),A={class:"grid grid-c-3"},F=s(()=>o("div",{class:"tipBox warning"},[e(" 基础节流（指令） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' v-throttle="[msg]" ')],-1)),G=s(()=>o("div",{class:"tipBox warning"},[e(" 立即执行（指令） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' v-throttle="[msg, 2000, [], true]" ')],-1)),H=s(()=>o("div",{class:"tipBox warning"},[e(" 带参（指令） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},` v-throttle="[msg, 2000, ['风和自由']]" `)],-1)),J={class:"grid grid-c-3"},K=s(()=>o("div",{class:"tipBox warning"},[e(" 基础节流（函数） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' @click="$throttle(msg)" ')],-1)),L=s(()=>o("div",{class:"tipBox warning"},[e(" 立即执行（函数） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},' @click="$throttle(msg, 2000), [], true)" ')],-1)),M=s(()=>o("div",{class:"tipBox warning"},[e(" 带参（函数） "),o("div",{style:{"font-size":"13px",color:"var(--el-color-info)"}},` @click="$throttle(msg, 2000), ['诗和远方', 'warning'])" `)],-1)),O=x({__name:"debounce-throttle",setup(p){const{proxy:m}=z(),n=(r="触发",t="success")=>{m.$message[t](r)};return(r,t)=>{const y=w("view-name"),l=b,h=$,u=g("debounce"),f=g("throttle");return d(),c(h,{shadow:r.defaultData.cardShadow},{default:i(()=>[a(y),I,o("div",S,[o("div",null,[D,v((d(),c(l,{type:"primary"},{default:i(()=>[e("点击触发")]),_:1})),[[u,[n]]])]),o("div",null,[E,v((d(),c(l,{type:"primary"},{default:i(()=>[e("点击触发")]),_:1})),[[u,[n,1e3,[],!0]]])]),o("div",null,[N,v((d(),c(l,{type:"primary"},{default:i(()=>[e("点击触发")]),_:1})),[[u,[n,300,["风和自由"]]]])])]),o("div",T,[o("div",null,[V,a(l,{type:"primary",onClick:t[0]||(t[0]=_=>r.$debounce(n))},{default:i(()=>[e("点击触发")]),_:1})]),o("div",null,[R,a(l,{type:"primary",onClick:t[1]||(t[1]=_=>r.$debounce(n,1e3,[],!0))},{default:i(()=>[e("点击触发")]),_:1})]),o("div",null,[j,a(l,{type:"primary",onClick:t[2]||(t[2]=_=>r.$debounce(n,300,["风和自由"]))},{default:i(()=>[e("点击触发")]),_:1})])]),q,o("div",A,[o("div",null,[F,v((d(),c(l,{type:"warning"},{default:i(()=>[e("点击触发")]),_:1})),[[f,[n]]])]),o("div",null,[G,v((d(),c(l,{type:"warning"},{default:i(()=>[e("点击触发")]),_:1})),[[f,[n,2e3,[],!0]]])]),o("div",null,[H,v((d(),c(l,{type:"warning"},{default:i(()=>[e("点击触发")]),_:1})),[[f,[n,2e3,["风和自由"]]]])])]),o("div",J,[o("div",null,[K,a(l,{type:"warning",onClick:t[3]||(t[3]=_=>r.$throttle(n))},{default:i(()=>[e("点击触发")]),_:1})]),o("div",null,[L,a(l,{type:"warning",onClick:t[4]||(t[4]=_=>r.$throttle(n,2e3,[],!0))},{default:i(()=>[e("点击触发")]),_:1})]),o("div",null,[M,a(l,{type:"warning",onClick:t[5]||(t[5]=_=>r.$throttle(n,2e3,["诗和远方","warning"]))},{default:i(()=>[e("点击触发")]),_:1})])])]),_:1},8,["shadow"])}}});const Q=C(O,[["__scopeId","data-v-024006bc"]]);export{Q as default};
