import{aZ as E,a_ as w,b3 as k,bi as V,a$ as h,bK as N,b0 as W,l as S,bp as q,b7 as v,b9 as Z,ba as J,d as y,b5 as B,o as G,a as I,b as g,bc as z,bL as C,m as e,bM as P,j as c,G as _,p as F,t as A,H as D,bh as $,aW as K,n as Q,bN as X,b6 as Y,bO as x,O as ee,bA as ae,k as oe,aa as le,$ as se,bj as ne,bk as te,bP as M}from"./index-22d7fef2.js";const T=E({size:w,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),re=E({...T,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),L={[k]:s=>V(s)||h(s)||N(s),[W]:s=>V(s)||h(s)||N(s)},j=Symbol("radioGroupKey"),O=(s,p)=>{const n=S(),o=q(j,void 0),d=v(()=>!!o),m=v({get(){return d.value?o.modelValue:s.modelValue},set(i){d.value?o.changeEvent(i):p&&p(k,i),n.value.checked=s.modelValue===s.label}}),r=Z(v(()=>o==null?void 0:o.size)),u=J(v(()=>o==null?void 0:o.disabled)),l=S(!1),b=v(()=>u.value||d.value&&m.value!==s.label?-1:0);return{radioRef:n,isGroup:d,radioGroup:o,focus:l,size:r,disabled:u,tabIndex:b,modelValue:m}},ie=["value","name","disabled"],de=y({name:"ElRadio"}),ue=y({...de,props:re,emits:L,setup(s,{emit:p}){const n=s,o=B("radio"),{radioRef:d,radioGroup:m,focus:r,size:u,disabled:l,modelValue:b}=O(n,p);function i(){K(()=>p("change",b.value))}return(a,t)=>{var f;return G(),I("label",{class:c([e(o).b(),e(o).is("disabled",e(l)),e(o).is("focus",e(r)),e(o).is("bordered",a.border),e(o).is("checked",e(b)===a.label),e(o).m(e(u))])},[g("span",{class:c([e(o).e("input"),e(o).is("disabled",e(l)),e(o).is("checked",e(b)===a.label)])},[z(g("input",{ref_key:"radioRef",ref:d,"onUpdate:modelValue":t[0]||(t[0]=R=>P(b)?b.value=R:null),class:c(e(o).e("original")),value:a.label,name:a.name||((f=e(m))==null?void 0:f.name),disabled:e(l),type:"radio",onFocus:t[1]||(t[1]=R=>r.value=!0),onBlur:t[2]||(t[2]=R=>r.value=!1),onChange:i},null,42,ie),[[C,e(b)]]),g("span",{class:c(e(o).e("inner"))},null,2)],2),g("span",{class:c(e(o).e("label")),onKeydown:t[3]||(t[3]=D(()=>{},["stop"]))},[_(a.$slots,"default",{},()=>[F(A(a.label),1)])],34)],2)}}});var be=$(ue,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const pe=E({...T,name:{type:String,default:""}}),me=["value","name","disabled"],ce=y({name:"ElRadioButton"}),fe=y({...ce,props:pe,setup(s){const p=s,n=B("radio"),{radioRef:o,focus:d,size:m,disabled:r,modelValue:u,radioGroup:l}=O(p),b=v(()=>({backgroundColor:(l==null?void 0:l.fill)||"",borderColor:(l==null?void 0:l.fill)||"",boxShadow:l!=null&&l.fill?`-1px 0 0 0 ${l.fill}`:"",color:(l==null?void 0:l.textColor)||""}));return(i,a)=>{var t;return G(),I("label",{class:c([e(n).b("button"),e(n).is("active",e(u)===i.label),e(n).is("disabled",e(r)),e(n).is("focus",e(d)),e(n).bm("button",e(m))])},[z(g("input",{ref_key:"radioRef",ref:o,"onUpdate:modelValue":a[0]||(a[0]=f=>P(u)?u.value=f:null),class:c(e(n).be("button","original-radio")),value:i.label,type:"radio",name:i.name||((t=e(l))==null?void 0:t.name),disabled:e(r),onFocus:a[1]||(a[1]=f=>d.value=!0),onBlur:a[2]||(a[2]=f=>d.value=!1)},null,42,me),[[C,e(u)]]),g("span",{class:c(e(n).be("button","inner")),style:Q(e(u)===i.label?e(b):{}),onKeydown:a[3]||(a[3]=D(()=>{},["stop"]))},[_(i.$slots,"default",{},()=>[F(A(i.label),1)])],38)],2)}}});var U=$(fe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const ve=E({id:{type:String,default:void 0},size:w,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),ge=L,ye=["id","aria-label","aria-labelledby"],Ee=y({name:"ElRadioGroup"}),Re=y({...Ee,props:ve,emits:ge,setup(s,{emit:p}){const n=s,o=B("radio"),d=X(),m=S(),{formItem:r}=Y(),{inputId:u,isLabeledByFormItem:l}=x(n,{formItemContext:r}),b=a=>{p(k,a),K(()=>p("change",a))};ee(()=>{const a=m.value.querySelectorAll("[type=radio]"),t=a[0];!Array.from(a).some(f=>f.checked)&&t&&(t.tabIndex=0)});const i=v(()=>n.name||d.value);return ae(j,oe({...le(n),changeEvent:b,name:i})),se(()=>n.modelValue,()=>{n.validateEvent&&(r==null||r.validate("change").catch(a=>ne()))}),(a,t)=>(G(),I("div",{id:e(u),ref_key:"radioGroupRef",ref:m,class:c(e(o).b("group")),role:"radiogroup","aria-label":e(l)?void 0:a.label||"radio-group","aria-labelledby":e(l)?e(r).labelId:void 0},[_(a.$slots,"default")],10,ye))}});var H=$(Re,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const ke=te(be,{RadioButton:U,RadioGroup:H}),Be=M(H),Ge=M(U);export{Ge as E,Be as a,ke as b};
