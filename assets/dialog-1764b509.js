import{d as R,c3 as H,c4 as Q,b4 as W,bp as B,c5 as X,b7 as y,c6 as Z,o as u,a as D,b as h,G as n,j as l,m as e,t as _,i as k,w as t,h as S,bP as x,x as ee,a1 as F,n as M,bh as N,c7 as oe,c8 as se,c9 as ae,ca as le,cb as te,cc as L,b5 as ne,l as I,cd as re,bA as ie,bc as de,ce,cf as ue,bC as fe,cg as pe,ch as me,ci as ge,cj as be,ck as ve,bk as Ce}from"./index-b02eb4b8.js";const j=Symbol("dialogInjectionKey"),ye=["aria-label"],he=["id"],ke=R({name:"ElDialogContent"}),Re=R({...ke,props:H,emits:Q,setup(E){const $=E,{t:r}=W(),{Close:w}=oe,{dialogRef:i,headerRef:f,bodyId:A,ns:s,style:p}=B(j),{focusTrapRef:b}=B(X),v=se(b,i),C=y(()=>$.draggable);return Z(i,f,C),(a,m)=>(u(),D("div",{ref:e(v),class:l([e(s).b(),e(s).is("fullscreen",a.fullscreen),e(s).is("draggable",e(C)),e(s).is("align-center",a.alignCenter),{[e(s).m("center")]:a.center},a.customClass]),style:M(e(p)),tabindex:"-1"},[h("header",{ref_key:"headerRef",ref:f,class:l(e(s).e("header"))},[n(a.$slots,"header",{},()=>[h("span",{role:"heading",class:l(e(s).e("title"))},_(a.title),3)]),a.showClose?(u(),D("button",{key:0,"aria-label":e(r)("el.dialog.close"),class:l(e(s).e("headerbtn")),type:"button",onClick:m[0]||(m[0]=T=>a.$emit("close"))},[k(e(ee),{class:l(e(s).e("close"))},{default:t(()=>[(u(),S(x(a.closeIcon||e(w))))]),_:1},8,["class"])],10,ye)):F("v-if",!0)],2),h("div",{id:e(A),class:l(e(s).e("body"))},[n(a.$slots,"default")],10,he),a.$slots.footer?(u(),D("footer",{key:0,class:l(e(s).e("footer"))},[n(a.$slots,"footer")],2)):F("v-if",!0)],6))}});var Ee=N(Re,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);const $e=["aria-label","aria-labelledby","aria-describedby"],we=R({name:"ElDialog",inheritAttrs:!1}),Ae=R({...we,props:ae,emits:le,setup(E,{expose:$}){const r=E,w=te();L({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},y(()=>!!w.title)),L({scope:"el-dialog",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/dialog.html#attributes",type:"Attribute"},y(()=>!!r.customClass));const i=ne("dialog"),f=I(),A=I(),s=I(),{visible:p,titleId:b,bodyId:v,style:C,overlayDialogStyle:a,rendered:m,zIndex:T,afterEnter:z,afterLeave:O,beforeLeave:q,handleClose:P,onModalClick:K,onOpenAutoFocus:U,onCloseAutoFocus:V,onCloseRequested:G,onFocusoutPrevented:J}=re(r,f);ie(j,{dialogRef:f,headerRef:A,bodyId:v,ns:i,rendered:m,style:C});const d=ve(K),Y=y(()=>r.draggable&&!r.fullscreen);return $({visible:p,dialogContentRef:s}),(o,c)=>(u(),S(be,{to:"body",disabled:!o.appendToBody},[k(ge,{name:"dialog-fade",onAfterEnter:e(z),onAfterLeave:e(O),onBeforeLeave:e(q),persisted:""},{default:t(()=>[de(k(e(ce),{"custom-mask-event":"",mask:o.modal,"overlay-class":o.modalClass,"z-index":e(T)},{default:t(()=>[h("div",{role:"dialog","aria-modal":"true","aria-label":o.title||void 0,"aria-labelledby":o.title?void 0:e(b),"aria-describedby":e(v),class:l(`${e(i).namespace.value}-overlay-dialog`),style:M(e(a)),onClick:c[0]||(c[0]=(...g)=>e(d).onClick&&e(d).onClick(...g)),onMousedown:c[1]||(c[1]=(...g)=>e(d).onMousedown&&e(d).onMousedown(...g)),onMouseup:c[2]||(c[2]=(...g)=>e(d).onMouseup&&e(d).onMouseup(...g))},[k(e(ue),{loop:"",trapped:e(p),"focus-start-el":"container",onFocusAfterTrapped:e(U),onFocusAfterReleased:e(V),onFocusoutPrevented:e(J),onReleaseRequested:e(G)},{default:t(()=>[e(m)?(u(),S(Ee,fe({key:0,ref_key:"dialogContentRef",ref:s},o.$attrs,{"custom-class":o.customClass,center:o.center,"align-center":o.alignCenter,"close-icon":o.closeIcon,draggable:e(Y),fullscreen:o.fullscreen,"show-close":o.showClose,title:o.title,onClose:e(P)}),pe({header:t(()=>[o.$slots.title?n(o.$slots,"title",{key:1}):n(o.$slots,"header",{key:0,close:e(P),titleId:e(b),titleClass:e(i).e("title")})]),default:t(()=>[n(o.$slots,"default")]),_:2},[o.$slots.footer?{name:"footer",fn:t(()=>[n(o.$slots,"footer")])}:void 0]),1040,["custom-class","center","align-center","close-icon","draggable","fullscreen","show-close","title","onClose"])):F("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,$e)]),_:3},8,["mask","overlay-class","z-index"]),[[me,e(p)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"]))}});var De=N(Ae,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);const Se=Ce(De);export{Se as E};
