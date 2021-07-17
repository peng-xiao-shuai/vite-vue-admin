import{D as e,p as l,j as i,r as t,o as r,c as s,a,t as o,F as n,g as u,i as d,k as p,v as m,m as c,E as f,d as h}from"./vendor.8773142a.js";import{m as g}from"./index.8e560e24.js";const y="https://peng-xiao-shuai-0902.github.io/vite-vue-admin/",b={name:"allUpload",props:{modelValue:String,limit:{default:1,type:Number},tipLabel:{default:"支持格式jpg、jpeg、png",type:String},fileType:{default:0,type:[Number,String]},type:{default:0,type:[Number,String]},fileSize:{type:Number,default:()=>50},disabled:{type:Boolean,default:!1},suffixStr:{type:[Array,String],default:()=>["jpg、jpeg、png","mp4、ogg、flv、avi、wmv、rmvb、mov","pdf、txt、doc、docx、excel、ppt"]}},data:()=>({icon:"",imgArr:[],nameArr:[],deleteUrl:y+"admin/file/delete",uploadPercent:0,percentFlag:!1,multiple:!1,uploadUrl:y+g}),emits:["update:modelValue"],methods:{onError(e,l){console.log(e,l),this.$message({message:"上传失败",type:"danger"}),this.percentFlag=!1,this.icon=""},onProgress(e,l){this.icon="el-icon-loading",this.uploadPercent=Number(l.percentage.toFixed(2)),this.percentFlag=!0},beforeUpload(e){if(this.imgArr.length>=this.limit)return this.$message.warning("超出最大上传数量"+this.limit+"！"),!1;let l=this.fileSize;if(console.log(e.size/1024/1024),""!=l&&e.size/1024/1024>=l)return this.$message({message:"文件大小不能超过"+this.fileSize+"MB",type:"warning"}),!1;let i=2!=this.fileType?e.type.lastIndexOf("/"):e.name.lastIndexOf("."),t=2!=this.fileType?e.type.substr(i+1,e.type.length):e.name.substr(i+1,e.name.length),r="object"==typeof this.suffixStr?this.suffixStr[this.fileType]:this.suffixStr;return console.log(r,r.match(t)),r.match(t)?void 0:(this.$message.warning("只能上传"+r+"的文件"),!1)},handleSuccess(e){200==e.code?(this.uploadPercent=100,setTimeout((()=>{this.percentFlag=!1,this.imgArr.push(e.data.url),this.nameArr.push(e.data.name),this.icon="",this.uploadPercent=0,console.log("上传成功",this.imgArr.join(",")),this.$emit("update:modelValue",this.imgArr.join(","))}),400)):this.$message.error("上传失败！")},onExceed(e){this.$message.warning("超出最大上传数量"+this.limit+"！")},onRemove(e,l,i){let t=this.imgArr.map((e=>e.substr(e.lastIndexOf("/")+1,e.length)));this.imgArr.splice(t.indexOf(e.name),1),this.$emit("update:value",this.imgArr.join(","))},Remove(e){this.imgArr.splice(e,1),this.nameArr.splice(e,1),this.$refs.upload.uploadFiles.splice(e,1),this.$emit("update:modelValue",this.imgArr.join(",")),this.$message.success("删除成功！")},flieEcho(l){if(2!=this.fileType)return;let i=l.substr(l.lastIndexOf("/")+1,l.length);this.$nextTick((()=>{this.$refs.upload.uploadFiles=e([{name:i,percentage:100,status:"success"}])}))},clearFiles(){}},watch:{modelValue:{handler(e,l){if("string"==typeof e&&e){if(this.flieEcho(e),""!=e){this.imgArr=e.split(",");for(let e of this.imgArr)this.flieEcho(e)}}else this.imgArr=[],0==this.imgArr.length&&this.$refs.upload&&(this.$refs.upload.uploadFiles=[])},immediate:!0}}},v=c();l("data-v-e177b068");const x={style:{display:"flex"}},F=f("上传"),S={class:"el-upload__tip"},A={class:"imgArr"};i();const w=v(((e,l,i,c,f,h)=>{const g=t("el-button"),y=t("el-upload"),b=t("el-image"),w=t("el-progress");return r(),s("div",null,[a("div",x,[a(y,{class:"upload-demo",ref:"upload","on-progress":h.onProgress,"show-file-list":2==i.fileType,"on-success":h.handleSuccess,"on-exceed":h.onExceed,"on-error":h.onError,"on-remove":h.onRemove,limit:i.limit,multiple:i.limit>1,action:f.uploadUrl,"before-upload":h.beforeUpload,disabled:""!=f.icon||i.disabled},{tip:v((()=>[a("div",S,o(i.tipLabel?i.tipLabel:"支持格式"+i.suffixStr[i.fileType]),1)])),default:v((()=>[a(g,{icon:f.icon,type:"primary",disabled:""!=f.icon},{default:v((()=>[F])),_:1},8,["icon","disabled"])])),_:1},8,["on-progress","show-file-list","on-success","on-exceed","on-error","on-remove","limit","multiple","action","before-upload","disabled"])]),a("div",A,[0!=f.imgArr.length&&0==i.fileType?(r(!0),s(n,{key:0},u(f.imgArr,((e,l)=>(r(),s("div",{class:"item",key:l},[a("i",{class:"el-icon-circle-close position",onClick:e=>h.Remove(l)},null,8,["onClick"]),a(b,{lazy:!0,fit:"fill",style:{width:"100px"},src:e,"preview-src-list":[e]},null,8,["src","preview-src-list"])])))),128)):d("",!0),0!=f.imgArr.length&&1==i.fileType?(r(!0),s(n,{key:1},u(f.imgArr,((e,l)=>(r(),s("div",{class:"item",key:l},[a("i",{class:"el-icon-circle-close position",onClick:e=>h.Remove(l)},null,8,["onClick"]),a("video",{src:e,style:{width:"100px",height:"100px"},class:"avatar video-avatar",controls:"controls"}," 您的浏览器不支持视频播放 ",8,["src"])])))),128)):d("",!0),0!=f.imgArr.length&&2==i.fileType?(r(),s(n,{key:2},[],64)):d("",!0),p(a(w,{type:"circle",width:100,percentage:f.uploadPercent,style:{"margin-top":"7px"}},null,8,["percentage"]),[[m,f.percentFlag]])])])}));b.render=w,b.__scopeId="data-v-e177b068";var T=h({components:{uploadFilesCopy:b},setup:()=>({currentFrom:e({image:"http://www.aiiup.cn/uploads/20190821/1-1Z115223503326.jpg",limit:1,fileType:0,fileSize:1,suffixStr:"jpg、jpeg、png",suffixArr:[{label:"图片",type:0},{label:"视频",type:1},{label:"文件",type:2}]})})});const V=c();l("data-v-6b151797");const j={class:"app-container"},z=a("div",{class:"operate-container"},[a("div",null,[a("i",{class:"viteIcon viteZJ-shangchuan",style:{"margin-right":"5px"}}),a("span",null,"上传文件（图片、视频）")])],-1),$={class:"screenForm"},_={style:{display:"flex","justify-content":"center","margin-top":"20px"}};i();const k=V(((e,l,i,o,d,p)=>{const m=t("el-input-number"),c=t("el-form-item"),f=t("el-option"),h=t("el-select"),g=t("el-input"),y=t("el-form"),b=t("upload-files-copy"),v=t("el-card");return r(),s("div",j,[a(v,{shadow:e.defaultData.cardShadow},{default:V((()=>[z,a("div",null,[a("div",null,[a(y,{inline:!0,model:e.currentFrom},{default:V((()=>[a("div",$,[a(c,{label:"最大上传数量："},{default:V((()=>[a(m,{modelValue:e.currentFrom.limit,"onUpdate:modelValue":l[1]||(l[1]=l=>e.currentFrom.limit=l),placeholder:"请输入最大上传数量",style:{width:"80%"},clearable:""},null,8,["modelValue"])])),_:1}),a(c,{label:"上传类型："},{default:V((()=>[a(h,{modelValue:e.currentFrom.fileType,"onUpdate:modelValue":l[2]||(l[2]=l=>e.currentFrom.fileType=l),placeholder:"请选择",style:{width:"80%"}},{default:V((()=>[(r(!0),s(n,null,u(e.currentFrom.suffixArr,(e=>(r(),s(f,{key:e.type,label:e.label,value:e.type},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),a(c,{label:"最大上传文件大小（MB）："},{default:V((()=>[a(g,{modelValue:e.currentFrom.fileSize,"onUpdate:modelValue":l[3]||(l[3]=l=>e.currentFrom.fileSize=l),placeholder:"请输入最大上传文件大小",style:{width:"80%"},clearable:""},null,8,["modelValue"])])),_:1}),a(c,{label:"上传"+e.currentFrom.suffixArr[e.currentFrom.fileType].label+"类型（、）隔开："},{default:V((()=>[a(g,{modelValue:e.currentFrom.suffixStr,"onUpdate:modelValue":l[4]||(l[4]=l=>e.currentFrom.suffixStr=l),placeholder:"请输入上传"+e.currentFrom.suffixArr[e.currentFrom.fileType].label+"格式",style:{width:"80%"},clearable:""},null,8,["modelValue","placeholder"])])),_:1},8,["label"])])])),_:1},8,["model"])]),a("div",_,[a(b,{modelValue:e.currentFrom.image,"onUpdate:modelValue":l[5]||(l[5]=l=>e.currentFrom.image=l),"fileSize:":e.currentFrom.fileSize,limit:e.currentFrom.limit,fileType:e.currentFrom.fileType,fileSize:e.currentFrom.fileSize,suffixStr:e.currentFrom.suffixStr,tipLabel:"最大上传数量为"+e.currentFrom.limit+"，只能上传"+e.currentFrom.suffixStr+"，且文件大小不超过"+e.currentFrom.fileSize},null,8,["modelValue","fileSize:","limit","fileType","fileSize","suffixStr","tipLabel"])])])])),_:1},8,["shadow"])])}));T.render=k,T.__scopeId="data-v-6b151797";export default T;
