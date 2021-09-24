import{u as e,c as t,a,b as l,d as r}from"./menu.c7107ae4.js";import{_ as o,r as n,o as i,l as u,w as s,a as d,c as m,g as c,F as p,i as h,h as g,k as f,L as v,d as b,I as y,e as F,b as w,J as V,E as _,p as x,m as S,v as U,q as $,s as k}from"./vendor.85146a32.js";import"./index.2a4ddc7d.js";const C=[{label:"编号",minWidth:"80",sortable:!0,props:[{prop:"id"}]},{label:"菜单名称",overflowTooltip:!0,props:[{prop:"title"}]},{label:"菜单级数",props:[{prop:"level",filter:[{key:0,value:"一级"},{key:1,value:"二级"}]}]},{label:"前端名称",props:[{prop:"name"}]},{label:"前端图标",props:[{type:"iconfont",prop:"icon",data:{style:{fontSize:"24px"},class:["viteIcon"]}}]},{label:"是否显示",props:[{prop:"hidden",type:"switch",data:{activeValue:0,inactiveValue:1,activeColor:"store.getter.themeColo",inactiveText:"隐",activeText:"显"}}]},{label:"排序",sortable:!0,props:[{prop:"sort"}]},{label:"操作",minWidth:"180px",props:[{type:"btn",data:[{tip:"查看下级",type:"primary",icon:"el-icon-view",emit:"query"},{tip:"编辑",type:"info",icon:"el-icon-edit-outline",emit:"update"},{tip:"删除",type:"danger",icon:"el-icon-delete",emit:"remove"}]}]}],L={name:"MenuDetail",props:{dialog:{type:Boolean,default:!1},currentFrom:{type:Object,default:()=>{}},selectMenuList:{type:Array,default:()=>[]}},data:()=>({rules:{title:[{required:!0,message:"请输入菜单名称",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}],name:[{required:!0,message:"请输入前端名称",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}],icon:[{required:!0,message:"请输入前端图标",trigger:"blur"},{min:2,max:140,message:"长度在 2 到 140 个字符",trigger:"blur"}]}}),emits:["update:currentFrom","update:dialog","refresh"],methods:{close(){this.$emit("update:dialog",!1),this.$emit("update:currentFrom",{parentId:0,hidden:0,sort:0})},onSubmit(a){this.$refs[a].validate((l=>{if(!l)return this.$message({message:"验证失败",type:"error",duration:1e3}),!1;this.$confirm("是否提交数据","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{this.currentFrom.id?e(this.currentFrom.id,this.currentFrom).then((e=>{this.$message({message:"修改成功",type:"success",duration:1e3}),this.$emit("update:dialog",!1)})):t(this.currentFrom).then((e=>{this.$refs[a].resetFields(),this.resetForm(a),this.$message({message:"提交成功",type:"success",duration:1e3}),this.$emit("update:dialog",!1)})),setTimeout((()=>{this.$emit("refresh")}),300)}))}))},resetForm(e){this.$refs[e].resetFields(),this.$emit("update:currentFrom",{parentId:0,hidden:0,sort:0})}}},I=v("是"),D=v("否"),T=v("提交"),z=v("重置");const M=[{id:0,title:"无上级菜单"}],N=b({components:{update:o(L,[["render",function(e,t,a,l,r,o){const v=n("el-input"),b=n("el-form-item"),y=n("el-option"),F=n("el-select"),w=n("el-radio"),V=n("el-radio-group"),_=n("el-button"),x=n("el-form"),S=n("el-drawer");return i(),u(S,{title:a.currentFrom.id?"修改":"添加",modelValue:a.dialog,"onUpdate:modelValue":t[8]||(t[8]=e=>a.dialog=e),direction:"rtl",ref:"drawer",onClose:o.close},{default:s((()=>[d(x,{model:a.currentFrom,rules:r.rules,ref:"menuFrom","label-width":"100px",style:{padding:"0 20px"}},{default:s((()=>[d(b,{label:"菜单名称：",prop:"title"},{default:s((()=>[d(v,{modelValue:a.currentFrom.title,"onUpdate:modelValue":t[0]||(t[0]=e=>a.currentFrom.title=e)},null,8,["modelValue"])])),_:1}),d(b,{label:"上级菜单："},{default:s((()=>[d(F,{modelValue:a.currentFrom.parentId,"onUpdate:modelValue":t[1]||(t[1]=e=>a.currentFrom.parentId=e),style:{width:"100%"},placeholder:"请选择菜单"},{default:s((()=>[(i(!0),m(p,null,c(a.selectMenuList,(e=>(i(),u(y,{key:e.id,label:e.title,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),d(b,{label:"前端名称：",prop:"name"},{default:s((()=>[d(v,{modelValue:a.currentFrom.name,"onUpdate:modelValue":t[2]||(t[2]=e=>a.currentFrom.name=e)},null,8,["modelValue"])])),_:1}),d(b,{label:"前端图标：",prop:"icon"},{default:s((()=>[d(v,{modelValue:a.currentFrom.icon,"onUpdate:modelValue":t[3]||(t[3]=e=>a.currentFrom.icon=e),style:{width:"80%"}},null,8,["modelValue"]),h("i",{class:g([a.currentFrom.icon,e.defaultData.iconfont]),style:{"margin-left":"10px","font-size":"24px"}},null,2)])),_:1}),d(b,{label:"是否显示："},{default:s((()=>[a.dialog?(i(),u(V,{key:0,modelValue:a.currentFrom.hidden,"onUpdate:modelValue":t[4]||(t[4]=e=>a.currentFrom.hidden=e)},{default:s((()=>[d(w,{label:0},{default:s((()=>[I])),_:1}),d(w,{label:1},{default:s((()=>[D])),_:1})])),_:1},8,["modelValue"])):f("",!0)])),_:1}),d(b,{label:"排序："},{default:s((()=>[d(v,{modelValue:a.currentFrom.sort,"onUpdate:modelValue":t[5]||(t[5]=e=>a.currentFrom.sort=e)},null,8,["modelValue"])])),_:1}),d(b,null,{default:s((()=>[d(_,{type:"primary",onClick:t[6]||(t[6]=e=>o.onSubmit("menuFrom"))},{default:s((()=>[T])),_:1}),a.currentFrom.id?f("",!0):(i(),u(_,{key:0,onClick:t[7]||(t[7]=e=>o.resetForm("menuFrom"))},{default:s((()=>[z])),_:1}))])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}]])},setup(){const e=y().ctx;F(),w();let t=V({value:[]}),o=V({value:[]});console.log(o.value);let n=_(0),i=V(C),u=V({pageNum:1,pageSize:10}),s=_(0),d=V({value:[]}),m=_(!1),c=V({value:{}});function p(e){0==s.value&&(d.value=[M],o.value=M,console.log(123,d)),Object.assign(u,e||u),a(s.value,u).then((e=>{t.value=V(e.data.list),n.value=e.data.total}))}return p(),{list:t,total:n,config:i,listQuery:u,parentId:s,upParent:d,isDialog:m,currentFrom:c,allList:o,handleAddMenu:function(){m.value=!0,c.value={parentId:s.value,hidden:0,sort:0},console.log("添加",c)},getList:p,backUp:function(){u.pageNum=1,s.value=d.value[d.value.length-1][0].parentId,o.value=d.value[d.value.length-1],d.value.splice(d.value.length-1,1),p()},handleHiddenChange:function(t,a){l(t.id,{hidden:t.hidden}).then((t=>{e.$message({message:"修改成功",type:"success",duration:1e3})}))},handleShowNextLevel:function({row:e,index:t}){console.log(d.value),d.value.push([e]),o.value=d.value[d.value.length-1],s.value=e.id,p()},handleUpdate:function({row:e,index:t}){m.value=!0,c.value=V(JSON.parse(JSON.stringify(e)))},handleDelete:function({row:t,index:a}){r(t.id).then((t=>{e.$message({message:"删除成功",type:"success",duration:1e3}),p()}))}}}}),j=e=>($("data-v-c0332272"),e=e(),k(),e),q={class:"app-container"},O={class:"operate-container"},B=j((()=>h("div",null,[h("i",{class:"el-icon-tickets"}),h("span",null,"数据列表")],-1))),R=j((()=>h("i",{class:"el-icon-back"},null,-1))),A=v("返回上级 "),J=v(" 添加 ");var Q=o(N,[["render",function(e,t,a,l,r,o){const u=n("el-button"),c=n("el-card"),p=n("powerful-table"),g=n("update");return i(),m("div",q,[d(c,{style:{marginBottom:"20px"},shadow:e.defaultData.cardShadow},{default:s((()=>[h("div",O,[B,h("div",null,[d(x,{name:"fadeOpticy"},{default:s((()=>[S(d(u,{type:"primary",class:"btn-add",onClick:t[0]||(t[0]=t=>e.backUp()),size:"mini"},{default:s((()=>[R,A])),_:1},512),[[U,e.upParent.value.length>1]])])),_:1}),d(u,{type:"primary",class:"btn-add",onClick:t[1]||(t[1]=t=>e.handleAddMenu()),size:"mini"},{default:s((()=>[J])),_:1})])])])),_:1},8,["shadow"]),d(c,{shadow:e.defaultData.cardShadow},{default:s((()=>[h("div",null,[d(p,{ref:"menuTable",list:e.list.value,header:e.config,isSelect:!1,total:e.total,tableName:"menuTable",onSizeChange:e.getList,onSwitchChange:e.handleHiddenChange,onQuery:e.handleShowNextLevel,onUpdate:e.handleUpdate,onRemove:e.handleDelete},null,8,["list","header","total","onSizeChange","onSwitchChange","onQuery","onUpdate","onRemove"])])])),_:1},8,["shadow"]),d(g,{dialog:e.isDialog,"onUpdate:dialog":t[2]||(t[2]=t=>e.isDialog=t),currentFrom:e.currentFrom.value,"onUpdate:currentFrom":t[3]||(t[3]=t=>e.currentFrom.value=t),selectMenuList:e.allList.value,onRefresh:e.getList},null,8,["dialog","currentFrom","selectMenuList","onRefresh"])])}],["__scopeId","data-v-c0332272"]]);export default Q;
