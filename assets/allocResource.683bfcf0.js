import{f as e,l as t}from"./resource.0a0f3f67.js";import{g as l,h as a}from"./role.cbf82d4c.js";import{q as s,v as r,r as c,o,c as d,F as h,k as n,a as u,G as i,t as f,A as g}from"./vendor.d2840fd2.js";import"./index.200d9d30.js";const C={name:"allocResource",data:()=>({roleId:null,allResource:null,allResourceCate:null}),created(){this.roleId=this.$route.query.roleId,this.getAllResourceCateList()},methods:{getAllResourceList(){e().then((e=>{this.allResource=e.data;for(let t=0;t<this.allResource.length;t++)this.allResource[t].checked=!1;this.getResourceByRole(this.roleId)}))},getAllResourceCateList(){t().then((e=>{this.allResourceCate=e.data;for(let t=0;t<this.allResourceCate.length;t++)this.allResourceCate[t].checked=!1;this.getAllResourceList()}))},getResourceByCate(e){let t=[];if(null==this.allResource)return null;for(let l=0;l<this.allResource.length;l++){let a=this.allResource[l];a.categoryId===e&&t.push(a)}return t},getResourceByRole(e){l(e).then((e=>{let t=e.data;this.allResource.forEach((e=>{e.checked=this.getResourceChecked(e.id,t)})),this.allResourceCate.forEach((e=>{e.checked=this.isAllChecked(e.id)})),this.$forceUpdate()}))},getResourceChecked(e,t){if(null==t||0===t.length)return!1;for(let l=0;l<t.length;l++)if(t[l].id===e)return!0;return!1},isIndeterminate(e){let t=this.getResourceByCate(e);if(null==t)return!1;let l=0;for(let a=0;a<t.length;a++)!0===t[a].checked&&l++;return!(0===l||l===t.length)},isAllChecked(e){let t=this.getResourceByCate(e);if(null==t)return!1;let l=0;for(let a=0;a<t.length;a++)!0===t[a].checked&&l++;return 0!==l&&l===t.length},handleSave(){this.$confirm("是否分配资源？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{let e=new Set;null!=this.allResource&&this.allResource.length>0&&this.allResource.forEach((t=>{t.checked&&e.add(t.id)}));let t=new FormData;t.append("roleId",this.roleId),t.append("resourceIds",Array.from(e)),a(t).then((e=>{this.$message({message:"分配成功",type:"success",duration:1e3}),this.$router.back()}))}))},handleClear(){this.allResourceCate.forEach((e=>{e.checked=!1})),this.allResource.forEach((e=>{e.checked=!1})),this.$forceUpdate()},handleCheckAllChange(e){let t=this.getResourceByCate(e.id);for(let l=0;l<t.length;l++)t[l].checked=e.checked;this.$forceUpdate()},handleCheckChange(e){this.allResourceCate.forEach((t=>{t.id===e.categoryId&&(t.checked=this.isAllChecked(e.categoryId))})),this.$forceUpdate()}}},R=g();s("data-v-3bffa390");const k={style:{"margin-top":"20px"},align:"center"},m=i("保存"),p=i("清空");r();const y=R(((e,t,l,a,s,r)=>{const g=c("el-checkbox"),C=c("el-row"),y=c("el-col"),I=c("el-button"),A=c("el-card");return o(),d(A,{class:"form-container",shadow:e.defalutData.cardShadow},{default:R((()=>[(o(!0),d(h,null,n(s.allResourceCate,((e,t)=>(o(),d("div",{class:0===t?"top-line":null,key:"cate"+e.id},[u(C,{class:"table-layout",style:{background:"#f2f6fc"}},{default:R((()=>[u(g,{modelValue:e.checked,"onUpdate:modelValue":t=>e.checked=t,indeterminate:r.isIndeterminate(e.id),onChange:t=>r.handleCheckAllChange(e)},{default:R((()=>[i(f(e.name),1)])),_:2},1032,["modelValue","onUpdate:modelValue","indeterminate","onChange"])])),_:2},1024),u(C,{class:"table-layout"},{default:R((()=>[(o(!0),d(h,null,n(r.getResourceByCate(e.id),(e=>(o(),d(y,{span:8,key:e.id,style:{padding:"4px 0"}},{default:R((()=>[u(g,{modelValue:e.checked,"onUpdate:modelValue":t=>e.checked=t,onChange:t=>r.handleCheckChange(e)},{default:R((()=>[i(f(e.name),1)])),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])])),_:2},1024)))),128))])),_:2},1024)],2)))),128)),u("div",k,[u(I,{type:"primary",onClick:t[1]||(t[1]=e=>r.handleSave())},{default:R((()=>[m])),_:1}),u(I,{onClick:t[2]||(t[2]=e=>r.handleClear())},{default:R((()=>[p])),_:1})])])),_:1},8,["shadow"])}));C.render=y,C.__scopeId="data-v-3bffa390";export default C;
