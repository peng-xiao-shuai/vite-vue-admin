import{s as B,aa as N,ab as I,ba as G,ac as K,ad as H,q as A,r as y,d as L,ak as X,U as Y,A as w,_ as M,o as g,x as k,w as n,g as o,f as $,J as Z,K as ee,j as v,C as R,p as te,ah as ae,ai as oe,l as O,bb as le,a as ne,b as re,e as se,k as m,aE as ue,z as ie,aD as de,n as _,bc as T,E as pe,Q as me,R as ce}from"./index-234e01e2.js";/* empty css             */import{E as fe,a as ve}from"./radio-group-95c80198.js";/* empty css              */import{_ as q}from"./index-10e07846.js";import{E as _e,a as ge}from"./form-item-f484cdec.js";const be=(e,t)=>B({url:"menu/list?parentId="+e,params:t}),ye=e=>B({url:"menu/remove",method:"delete",data:{ids:e}}),Fe=e=>B({url:"menu/update",method:"post",data:e}),j={hidden:1,icon:"",id:0,level:0,name:"",parentId:0,sort:0,title:""},he=()=>{const e=[{label:"编号",minWidth:"80",sortable:!0,props:[{prop:"id"}]},{label:"菜单名称",overflowTooltip:!0,props:[{prop:"title"}]},{label:"菜单级数",props:[{prop:"level",filters:[{key:0,value:"一级"},{key:1,value:"二级"},{key:2,value:"三级"}]}]},{label:"前端名称",props:[{prop:"name"}]},{label:"前端图标",props:[{type:"iconfont",prop:"icon",data:{style:{fontSize:"24px"},class:["viteIcon"]}}]},{label:"是否显示",props:[{prop:"hidden",type:"switch",data:N({property:{activeValue:1,inactiveValue:0,inactiveText:"隐",activeText:"显"}})}]},{label:"排序",sortable:!0,props:[{prop:"sort"}]},{label:"操作",minWidth:"180px",props:[{type:"btn",prop:"",data:N([{text:"查看下级",params:"query",property:{type:"primary",icon:I(G)}},{text:"编辑",params:"update",property:{type:"info",icon:I(K)}},{text:"删除",params:"remove",property:{type:"danger",icon:I(H)}}])}]}],t=A({listQuery:{pageNum:1,pageSize:10},total:0,list:[]}),u=A({...j}),i=y(0),f=y([]),d=y([]),p=y(!1);return{header:e,powerfulTableData:t,currentForm:u,parentId:i,upParent:f,allList:d,isDialog:p}},De=L({components:{iconSelect:q},props:{dialog:{type:Boolean,default:!1},currentForm:{type:Object,default:()=>{}},selectMenuList:{type:Array,default:()=>[]}},emits:["update:currentForm","update:dialog","refresh"],setup(e,t){const u=A({...j}),i=y(null);return X(e.currentForm,r=>{Object.assign(u,r)},{immediate:!0}),{uploadForm:i,formData:u,close:()=>{t.emit("update:dialog",!1),t.emit("update:currentForm",{})},resetForm:()=>{i.value.resetFields(),t.emit("update:currentForm",{})},onSubmit:()=>{i.value.validate(r=>{if(r)Y.confirm("是否提交数据","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{Fe(u).then(()=>{w.success("修改成功")})});else return w({message:"验证失败",type:"error",duration:1e3}),!1})},rules:{title:[{required:!0,message:"请输入菜单名称",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}],name:[{required:!0,message:"请输入前端名称",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}],icon:[{required:!0,message:"请输入前端图标",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}]}}}});function Ee(e,t,u,i,f,d){const p=te,r=_e,F=ae,h=oe,c=q,D=fe,C=ve,E=O,S=ge,V=le;return g(),k(V,{title:e.currentForm.id?"修改":"添加","model-value":e.dialog,direction:"rtl",ref:"drawer",onClose:e.close},{default:n(()=>[o(S,{model:e.formData,rules:e.rules,ref:"uploadForm","label-position":"top",style:{padding:"0 20px"},class:"Dform"},{default:n(()=>[o(r,{label:"菜单名称：",prop:"title"},{default:n(()=>[o(p,{modelValue:e.formData.title,"onUpdate:modelValue":t[0]||(t[0]=l=>e.formData.title=l)},null,8,["modelValue"])]),_:1}),o(r,{label:"上级菜单："},{default:n(()=>[o(h,{modelValue:e.formData.parentId,"onUpdate:modelValue":t[1]||(t[1]=l=>e.formData.parentId=l),style:{width:"100%"},placeholder:"请选择菜单"},{default:n(()=>[(g(!0),$(Z,null,ee(e.selectMenuList,l=>(g(),k(F,{key:l.id,label:l.title,value:l.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(r,{label:"前端名称：",prop:"name"},{default:n(()=>[o(p,{modelValue:e.formData.name,"onUpdate:modelValue":t[2]||(t[2]=l=>e.formData.name=l)},null,8,["modelValue"])]),_:1}),o(r,{label:"前端图标：",prop:"icon"},{default:n(()=>[o(c,{style:{width:"100%"},icon:e.formData.icon,"onUpdate:icon":t[3]||(t[3]=l=>e.formData.icon=l),type:"element"},null,8,["icon"])]),_:1}),o(r,{label:"是否显示："},{default:n(()=>[e.dialog?(g(),k(C,{key:0,modelValue:e.formData.hidden,"onUpdate:modelValue":t[4]||(t[4]=l=>e.formData.hidden=l)},{default:n(()=>[o(D,{label:0},{default:n(()=>[v("是")]),_:1}),o(D,{label:1},{default:n(()=>[v("否")]),_:1})]),_:1},8,["modelValue"])):R("",!0)]),_:1}),o(r,{label:"排序："},{default:n(()=>[o(p,{modelValue:e.formData.sort,"onUpdate:modelValue":t[5]||(t[5]=l=>e.formData.sort=l)},null,8,["modelValue"])]),_:1}),o(r,null,{default:n(()=>[o(E,{type:"primary",onClick:t[6]||(t[6]=l=>e.onSubmit())},{default:n(()=>[v("提交")]),_:1}),e.formData.id?R("",!0):(g(),k(E,{key:0,onClick:t[7]||(t[7]=l=>e.resetForm())},{default:n(()=>[v("重置")]),_:1}))]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","model-value","onClose"])}const ke=M(De,[["render",Ee]]),Q=e=>(me("data-v-5791f3d5"),e=e(),ce(),e),we={class:"app-container"},Ce={class:"operate-container"},Se=Q(()=>m("div",null,[m("i",{class:"el-icon-tickets"}),m("span",null,"数据列表")],-1)),Ve=Q(()=>m("i",{class:"el-icon-back"},null,-1)),Ie=L({__name:"index",setup(e){const{header:t,powerfulTableData:u,currentForm:i,parentId:f,upParent:d,allList:p,isDialog:r}=he(),F=ne(),h=re(),c=()=>{be(f.value,u.listQuery).then(a=>{u.list=a.data.data.list,u.total=a.data.data.total})};c();const D=a=>{u.listQuery[a.prop]=a.order,c()},C=a=>{switch(a.componentName){case"switch":const s=a.row;F.userInfo.id==s.id&&s.status===0&&w.error("你的账号已被停用！");break}},E=({params:a,row:s})=>{switch(console.log(a,s),a){case"query":S(s);break;case"update":V(s);break;case"remove":l(s);break}},S=a=>{d.value.push(a),p.value=[d.value[d.value.length-1]],f.value=a.id,c()},V=a=>{r.value=!0,Object.assign(i,JSON.parse(JSON.stringify(a)))},l=a=>{ye([a.id]).then(()=>{w.success("删除成功！"),c()})},z=()=>{h.getRoutes().forEach(a=>{a.meta&&a.meta.id&&h.removeRoute(a.name)}),F.userInfoRequest()},x=()=>{u.listQuery.pageNum=1,f.value=d.value[d.value.length-1].parentId,p.value=[d.value[d.value.length-1]],d.value.splice(d.value.length-1,1),c()},J=()=>{r.value=!0,p.value=p.value.length?p.value:[{id:i.parentId||0,title:i.title||"无上级菜单"}],Object.assign(i,{parentId:f.value,hidden:0,sort:0})};return(a,s)=>{const U=O,P=se("powerful-table"),W=pe;return g(),$("div",we,[o(W,{shadow:a.defaultData.cardShadow},{default:n(()=>[m("div",{class:"tipBox warning",style:{"margin-top":"0"}},[m("p",null,[v(" 修改、删除 菜单并不会直接改变侧边栏。需要重新调用接口。"),m("span",{class:"active",onClick:z},"点击"),v(" 刷新侧边栏 ")])]),m("div",Ce,[Se,m("div",null,[o(ue,{name:"fadeOpticy"},{default:n(()=>[ie(o(U,{type:"primary",class:"btn-add",onClick:s[0]||(s[0]=b=>x())},{default:n(()=>[Ve,v("返回上级 ")]),_:1},512),[[de,_(d).length>0]])]),_:1}),o(U,{type:"primary",class:"btn-add",onClick:s[1]||(s[1]=b=>J())},{default:n(()=>[v(" 添加 ")]),_:1})])]),m("div",null,[o(P,{ref:"menuTable",list:_(u).list,header:_(t),isSelect:!1,"pagination-property":{total:_(u).total},tableName:"menuTable",onSizeChange:c,onSortCustom:D,onComponentEvent:C,onBtnClick:E},null,8,["list","header","pagination-property"])])]),_:1},8,["shadow"]),o(ke,{dialog:_(r),"onUpdate:dialog":s[2]||(s[2]=b=>T(r)?r.value=b:null),currentForm:_(i),"onUpdate:currentForm":s[3]||(s[3]=b=>T(i)?i.value=b:null),selectMenuList:_(p),onRefresh:c},null,8,["dialog","currentForm","selectMenuList"])])}}});const Le=M(Ie,[["__scopeId","data-v-5791f3d5"]]);export{Le as default};