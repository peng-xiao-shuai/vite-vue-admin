import{f as e,l as t}from"./resource.5f95b3b2.js";import{g as l,h as a}from"./role.50ba39d0.js";import{p as s,l as r,r as o,o as c,m as d,w as h,c as n,g as u,h as i,a as f,K as g,t as C,F as R,i as m}from"./vendor.45a16529.js";import"./index.00fbdd02.js";const k={name:"allocResource",data:()=>({roleId:null,allResource:null,allResourceCate:null}),created(){this.roleId=this.$route.query.roleId,this.getAllResourceCateList()},methods:{getAllResourceList(){e().then((e=>{this.allResource=e.data;for(let t=0;t<this.allResource.length;t++)this.allResource[t].checked=!1;this.getResourceByRole(this.roleId)}))},getAllResourceCateList(){t().then((e=>{this.allResourceCate=e.data;for(let t=0;t<this.allResourceCate.length;t++)this.allResourceCate[t].checked=!1;this.getAllResourceList()}))},getResourceByCate(e){let t=[];if(null==this.allResource)return null;for(let l=0;l<this.allResource.length;l++){let a=this.allResource[l];a.categoryId===e&&t.push(a)}return t},getResourceByRole(e){l(e).then((e=>{let t=e.data;this.allResource.forEach((e=>{e.checked=this.getResourceChecked(e.id,t)})),this.allResourceCate.forEach((e=>{e.checked=this.isAllChecked(e.id)})),this.$forceUpdate()}))},getResourceChecked(e,t){if(null==t||0===t.length)return!1;for(let l=0;l<t.length;l++)if(t[l].id===e)return!0;return!1},isIndeterminate(e){let t=this.getResourceByCate(e);if(null==t)return!1;let l=0;for(let a=0;a<t.length;a++)!0===t[a].checked&&l++;return!(0===l||l===t.length)},isAllChecked(e){let t=this.getResourceByCate(e);if(null==t)return!1;let l=0;for(let a=0;a<t.length;a++)!0===t[a].checked&&l++;return 0!==l&&l===t.length},handleSave(){this.$confirm("是否分配资源？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{let e=new Set;null!=this.allResource&&this.allResource.length>0&&this.allResource.forEach((t=>{t.checked&&e.add(t.id)}));let t=new FormData;t.append("roleId",this.roleId),t.append("resourceIds",Array.from(e)),a(t).then((e=>{this.$message({message:"分配成功",type:"success",duration:1e3}),this.$router.back()}))}))},handleClear(){this.allResourceCate.forEach((e=>{e.checked=!1})),this.allResource.forEach((e=>{e.checked=!1})),this.$forceUpdate()},handleCheckAllChange(e){let t=this.getResourceByCate(e.id);for(let l=0;l<t.length;l++)t[l].checked=e.checked;this.$forceUpdate()},handleCheckChange(e){this.allResourceCate.forEach((t=>{t.id===e.categoryId&&(t.checked=this.isAllChecked(e.categoryId))})),this.$forceUpdate()}}};s("data-v-5f391574");const p={style:{"margin-top":"20px"},align:"center"},y=g("保存"),I=g("清空");r(),k.render=function(e,t,l,a,s,r){const k=o("el-checkbox"),b=o("el-row"),A=o("el-col"),_=o("el-button"),B=o("el-card");return c(),d(B,{class:"form-container",shadow:e.defaultData.cardShadow},{default:h((()=>[(c(!0),n(R,null,u(s.allResourceCate,((e,t)=>(c(),n("div",{class:i(0===t?"top-line":null),key:"cate"+e.id},[f(b,{class:"table-layout",style:{background:"#f2f6fc"}},{default:h((()=>[f(k,{modelValue:e.checked,"onUpdate:modelValue":t=>e.checked=t,indeterminate:r.isIndeterminate(e.id),onChange:t=>r.handleCheckAllChange(e)},{default:h((()=>[g(C(e.name),1)])),_:2},1032,["modelValue","onUpdate:modelValue","indeterminate","onChange"])])),_:2},1024),f(b,{class:"table-layout"},{default:h((()=>[(c(!0),n(R,null,u(r.getResourceByCate(e.id),(e=>(c(),d(A,{span:8,key:e.id,style:{padding:"4px 0"}},{default:h((()=>[f(k,{modelValue:e.checked,"onUpdate:modelValue":t=>e.checked=t,onChange:t=>r.handleCheckChange(e)},{default:h((()=>[g(C(e.name),1)])),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])])),_:2},1024)))),128))])),_:2},1024)],2)))),128)),m("div",p,[f(_,{type:"primary",onClick:t[0]||(t[0]=e=>r.handleSave())},{default:h((()=>[y])),_:1}),f(_,{onClick:t[1]||(t[1]=e=>r.handleClear())},{default:h((()=>[I])),_:1})])])),_:1},8,["shadow"])},k.__scopeId="data-v-5f391574";export default k;
