import{_ as U,d as $,ak as c,a9 as q,a8 as w,r as t,o as C,l as S,w as r,a as e,I as m}from"./vendor.8c3eb18c.js";const j=$({components:{[c.name]:c},data(){return{locale:this.defaultData.locale=="en-US"?q:w,ruleForm:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},rules:{name:[{required:!0,message:"\u8BF7\u8F93\u5165\u6D3B\u52A8\u540D\u79F0",trigger:"blur"},{min:3,max:5,message:"\u957F\u5EA6\u5728 3 \u5230 5 \u4E2A\u5B57\u7B26",trigger:"blur"}],region:[{required:!0,message:"\u8BF7\u9009\u62E9\u6D3B\u52A8\u533A\u57DF",trigger:"change"}],date1:[{type:"date",required:!0,message:"\u8BF7\u9009\u62E9\u65E5\u671F",trigger:"change"}],date2:[{type:"date",required:!0,message:"\u8BF7\u9009\u62E9\u65F6\u95F4",trigger:"change"}],type:[{type:"array",required:!0,message:"\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u6D3B\u52A8\u6027\u8D28",trigger:"change"}],resource:[{required:!0,message:"\u8BF7\u9009\u62E9\u6D3B\u52A8\u8D44\u6E90",trigger:"change"}],desc:[{required:!0,message:"\u8BF7\u586B\u5199\u6D3B\u52A8\u5F62\u5F0F",trigger:"blur"}]}}},methods:{onSubmit(l){this.$refs[l].validate(o=>{if(o)alert("submit!");else return console.log("error submit!!"),!1})}}}),B=m("-"),I=m("\u7ACB\u5373\u521B\u5EFA"),N=m("\u53D6\u6D88");function D(l,o,T,z,A,E){const s=t("el-input"),n=t("el-form-item"),p=t("el-option"),g=t("el-select"),f=t("el-date-picker"),u=t("el-col"),b=t("el-time-picker"),V=t("el-config-provider"),y=t("el-switch"),d=t("el-checkbox"),F=t("el-checkbox-group"),i=t("el-radio"),v=t("el-radio-group"),_=t("el-button"),k=t("el-form"),h=t("el-card");return C(),S(h,{class:"box-card"},{default:r(()=>[e(k,{rules:l.rules,ref:"Form",model:l.ruleForm,"label-width":"80px"},{default:r(()=>[e(n,{prop:"name",label:"\u6D3B\u52A8\u540D\u79F0"},{default:r(()=>[e(s,{modelValue:l.ruleForm.name,"onUpdate:modelValue":o[0]||(o[0]=a=>l.ruleForm.name=a)},null,8,["modelValue"])]),_:1}),e(n,{prop:"region",label:"\u6D3B\u52A8\u533A\u57DF"},{default:r(()=>[e(g,{modelValue:l.ruleForm.region,"onUpdate:modelValue":o[1]||(o[1]=a=>l.ruleForm.region=a),placeholder:"\u8BF7\u9009\u62E9\u6D3B\u52A8\u533A\u57DF"},{default:r(()=>[e(p,{label:"\u533A\u57DF\u4E00",value:"shanghai"}),e(p,{label:"\u533A\u57DF\u4E8C",value:"beijing"})]),_:1},8,["modelValue"])]),_:1}),e(n,{prop:"date2",label:"\u6D3B\u52A8\u65F6\u95F4"},{default:r(()=>[e(V,{locale:l.locale},{default:r(()=>[e(u,{span:11},{default:r(()=>[e(f,{type:"date",placeholder:"\u9009\u62E9\u65E5\u671F",modelValue:l.ruleForm.date1,"onUpdate:modelValue":o[2]||(o[2]=a=>l.ruleForm.date1=a),style:{width:"100%"}},null,8,["modelValue"])]),_:1}),e(u,{class:"line",span:2},{default:r(()=>[B]),_:1}),e(u,{span:11},{default:r(()=>[e(b,{placeholder:"\u9009\u62E9\u65F6\u95F4",modelValue:l.ruleForm.date2,"onUpdate:modelValue":o[3]||(o[3]=a=>l.ruleForm.date2=a),style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1},8,["locale"])]),_:1}),e(n,{prop:"delivery",label:"\u5373\u65F6\u914D\u9001"},{default:r(()=>[e(y,{modelValue:l.ruleForm.delivery,"onUpdate:modelValue":o[4]||(o[4]=a=>l.ruleForm.delivery=a)},null,8,["modelValue"])]),_:1}),e(n,{prop:"type",label:"\u6D3B\u52A8\u6027\u8D28"},{default:r(()=>[e(F,{modelValue:l.ruleForm.type,"onUpdate:modelValue":o[5]||(o[5]=a=>l.ruleForm.type=a)},{default:r(()=>[e(d,{label:"\u7F8E\u98DF/\u9910\u5385\u7EBF\u4E0A\u6D3B\u52A8",name:"type"}),e(d,{label:"\u5730\u63A8\u6D3B\u52A8",name:"type"}),e(d,{label:"\u7EBF\u4E0B\u4E3B\u9898\u6D3B\u52A8",name:"type"}),e(d,{label:"\u5355\u7EAF\u54C1\u724C\u66DD\u5149",name:"type"})]),_:1},8,["modelValue"])]),_:1}),e(n,{prop:"resource",label:"\u7279\u6B8A\u8D44\u6E90"},{default:r(()=>[e(v,{modelValue:l.ruleForm.resource,"onUpdate:modelValue":o[6]||(o[6]=a=>l.ruleForm.resource=a)},{default:r(()=>[e(i,{label:"\u7EBF\u4E0A\u54C1\u724C\u5546\u8D5E\u52A9"}),e(i,{label:"\u7EBF\u4E0B\u573A\u5730\u514D\u8D39"})]),_:1},8,["modelValue"])]),_:1}),e(n,{prop:"desc",label:"\u6D3B\u52A8\u5F62\u5F0F"},{default:r(()=>[e(s,{type:"textarea",modelValue:l.ruleForm.desc,"onUpdate:modelValue":o[7]||(o[7]=a=>l.ruleForm.desc=a)},null,8,["modelValue"])]),_:1}),e(n,null,{default:r(()=>[e(_,{type:"primary",onClick:o[8]||(o[8]=a=>l.onSubmit("Form"))},{default:r(()=>[I]),_:1}),e(_,null,{default:r(()=>[N]),_:1})]),_:1})]),_:1},8,["rules","model"])]),_:1})}var H=U(j,[["render",D],["__scopeId","data-v-1a7a3378"]]);export{H as default};
