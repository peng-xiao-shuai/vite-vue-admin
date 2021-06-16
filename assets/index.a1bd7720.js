import{q as e,v as s,o as t,c as i,a,m as r,t as o,A as n,f as l,e as h,g as d,R as c,D as g,r as p,S as u,l as f,G as m}from"./vendor.d2840fd2.js";import{u as y}from"./index.200d9d30.js";const v={name:"dragVerifyImgChip",props:{isPassing:{type:Boolean,default:!1},width:{type:Number,default:250},height:{type:Number,default:40},text:{type:String,default:"swiping to the right side"},successText:{type:String,default:"success"},background:{type:String,default:"#eee"},progressBarBg:{type:String,default:"#76c61d"},completedBg:{type:String,default:"#76c61d"},circle:{type:Boolean,default:!1},radius:{type:String,default:"4px"},handlerIcon:{type:String},successIcon:{type:String},handlerBg:{type:String,default:"#fff"},textSize:{type:String,default:"14px"},textColor:{type:String,default:"#333"},imgsrc:{type:String},barWidth:{type:Number,default:40},barRadius:{type:Number,default:8},showRefresh:{type:Boolean,default:!1},refreshIcon:{type:String},showTips:{type:Boolean,default:!0},successTip:{type:String,default:"验证通过，超过80%用户"},failTip:{type:String,default:"验证未通过，拖动滑块将悬浮图像正确合并"},diffWidth:{type:Number,default:20}},emits:["handlerMove","passfail","passcallback","update:isPassing","refresh"],mounted:function(){const e=this.$refs.dragVerify;e.style.setProperty("--textColor",this.textColor),e.style.setProperty("--width",Math.floor(this.width/2)+"px"),e.style.setProperty("--pwidth",-Math.floor(this.width/2)+"px")},computed:{handlerStyle:function(){return{width:this.height+"px",height:this.height+"px",background:this.handlerBg}},message:function(){return this.isPassing?"":this.text},successMessage:function(){return this.isPassing?this.successText:""},dragVerifyStyle:function(){return{width:this.width+"px",height:this.height+"px",lineHeight:this.height+"px",background:this.background,borderRadius:this.circle?this.height/2+"px":this.radius}},dragVerifyImgStyle:function(){return{width:this.width+"px",position:"relative",overflow:"hidden"}},progressBarStyle:function(){return{background:this.progressBarBg,height:this.height+"px",borderRadius:this.circle?this.height/2+"px 0 0 "+this.height/2+"px":this.radius}},textStyle:function(){return{height:this.height+"px",width:this.width+"px",fontSize:this.textSize}}},data:()=>({isMoving:!1,x:0,isOk:!1,isKeep:!1,clipBarx:0,showErrorTip:!1}),methods:{draw:function(e,s,t,i){var a=this.barWidth,r=this.barRadius;const o=Math.PI;e.beginPath(),e.moveTo(s,t),e.arc(s+a/2,t-r+2,r,.72*o,2.26*o),e.lineTo(s+a,t),e.arc(s+a+r-2,t+a/2,r,1.21*o,2.78*o),e.lineTo(s+a,t+a),e.lineTo(s,t+a),e.arc(s+r-2,t+a/2,r+.4,2.76*o,1.24*o,!0),e.lineTo(s,t),e.lineWidth=2,e.fillStyle="rgba(255, 255, 255, 0.8)",e.strokeStyle="rgba(255, 255, 255, 0.8)",e.stroke(),e[i](),e.globalCompositeOperation="destination-over"},checkimgLoaded:function(){var e=this.barWidth,s=this.$refs.checkImg.height,t=this.$refs.checkImg.width,i=Math.floor(this.width/2),a=i+Math.ceil(Math.random()*(i-e-this.barRadius-5)),r=25+Math.floor(Math.random()*(s-e-25-20));this.$refs.maincanvas.setAttribute("width",t),this.$refs.maincanvas.setAttribute("height",s),this.$refs.maincanvas.style.display="block";var o=this.$refs.maincanvas.getContext("2d");this.draw(o,a,r,"fill"),this.clipBarx=a;var n=this.$refs.movecanvas;n.setAttribute("width",t),n.setAttribute("height",s),this.$refs.movecanvas.style.display="block";const l=e+2*this.barRadius+3;var h=this.$refs.movecanvas.getContext("2d");h.clearRect(0,0,t,s),this.draw(h,a,r,"clip"),h.drawImage(this.$refs.checkImg,0,0,t,s);r=r-2*this.barRadius-1;const d=h.getImageData(a,r,l,l);n.setAttribute("width",l),n.setAttribute("height",s),h.putImageData(d,0,r)},dragStart:function(e){this.isPassing||(this.isMoving=!0,this.x=e.pageX||e.touches[0].pageX),this.showBar=!0,this.showErrorTip=!1,this.$emit("handlerMove")},dragMoving:function(e){if(this.isMoving&&!this.isPassing){var s=(e.pageX||e.touches[0].pageX)-this.x;this.$refs.handler.style.left=s+"px",this.$refs.progressBar.style.width=s+this.height/2+"px",this.$refs.movecanvas.style.left=s+"px"}},dragFinish:function(e){if(this.isMoving&&!this.isPassing){var s=(e.pageX||e.changedTouches[0].pageX)-this.x;if(Math.abs(s-this.clipBarx)>this.diffWidth){this.isOk=!0;var t=this;setTimeout((function(){t.$refs.handler.style.left="0",t.$refs.progressBar.style.width="0",t.$refs.movecanvas.style.left="0",t.isOk=!1}),500),this.$emit("passfail"),this.showErrorTip=!0}else this.passVerify();this.isMoving=!1}},passVerify:function(){this.$emit("update:isPassing",!0),this.isMoving=!1,this.$refs.handler.children[0].className=this.successIcon,this.$refs.progressBar.style.background=this.completedBg,this.$refs.message.style["-webkit-text-fill-color"]="unset",this.$refs.message.style.animation="slidetounlock2 3s infinite",this.$refs.progressBar.style.color="#fff",this.$refs.progressBar.style.fontSize=this.textSize,this.isKeep=!0,setTimeout((()=>{this.$refs.movecanvas.style.left=this.clipBarx+"px",setTimeout((()=>{this.isKeep=!1,this.$refs.maincanvas.style.display="none",this.$refs.movecanvas.style.display="none"}),200)}),100),this.$emit("passcallback")},reset:function(){this.reImg(),this.checkimgLoaded()},reImg:function(){this.$emit("update:isPassing",!1);const e=this.$options.data();for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(this[i]=e[i]);var s=this.$refs.handler,t=this.$refs.message;s.style.left="0",this.$refs.progressBar.style.width="0",s.children[0].className=this.handlerIcon,t.style["-webkit-text-fill-color"]="transparent",t.style.animation="slidetounlock 3s infinite",t.style.color=this.background,this.$refs.movecanvas.style.left="0px"},refreshimg:function(){this.$emit("refresh")}},watch:{imgsrc:{immediate:!1,handler:function(){this.reImg()}}}},b=n();e("data-v-44f50498");const w={class:"drag-verify-container"},x={ref:"maincanvas",class:"main-canvas"},k={key:0,class:"refresh"},S={key:1,class:"tips success"},$={key:2,class:"tips danger"};s();const I=b(((e,s,n,l,h,d)=>(t(),i("div",w,[a("div",{style:d.dragVerifyImgStyle},[a("img",{ref:"checkImg",crossOrigin:"anonymous",src:n.imgsrc,onLoad:s[1]||(s[1]=(...e)=>d.checkimgLoaded&&d.checkimgLoaded(...e)),style:{width:"100%","border-radius":"6px 6px 0 0"}},null,40,["src"]),a("canvas",x,null,512),a("canvas",{ref:"movecanvas",class:[{goFirst:h.isOk,goKeep:h.isKeep},"move-canvas"]},null,2),n.showRefresh&&!n.isPassing?(t(),i("div",k,[a("i",{class:n.refreshIcon,onClick:s[2]||(s[2]=(...e)=>d.refreshimg&&d.refreshimg(...e))},null,2)])):r("",!0),n.showTips&&n.isPassing?(t(),i("div",S,o(n.successTip),1)):r("",!0),n.showTips&&!n.isPassing&&h.showErrorTip?(t(),i("div",$,o(n.failTip),1)):r("",!0)],4),a("div",{ref:"dragVerify",class:"drag_verify",style:d.dragVerifyStyle,onMousemove:s[5]||(s[5]=(...e)=>d.dragMoving&&d.dragMoving(...e)),onMouseup:s[6]||(s[6]=(...e)=>d.dragFinish&&d.dragFinish(...e)),onMouseleave:s[7]||(s[7]=(...e)=>d.dragFinish&&d.dragFinish(...e)),onTouchmove:s[8]||(s[8]=(...e)=>d.dragMoving&&d.dragMoving(...e)),onTouchend:s[9]||(s[9]=(...e)=>d.dragFinish&&d.dragFinish(...e))},[a("div",{class:["dv_progress_bar",{goFirst2:h.isOk}],ref:"progressBar",style:d.progressBarStyle},o(d.successMessage),7),a("div",{class:"dv_text",style:d.textStyle,ref:"message"},o(d.message),5),a("div",{class:["dv_handler dv_handler_bg",{goFirst:h.isOk}],onMousedown:s[3]||(s[3]=(...e)=>d.dragStart&&d.dragStart(...e)),onTouchstart:s[4]||(s[4]=(...e)=>d.dragStart&&d.dragStart(...e)),ref:"handler",style:d.handlerStyle},[a("i",{class:n.handlerIcon},null,2)],38)],36)]))));v.render=I,v.__scopeId="data-v-44f50498";const T=l({components:{dragVerifyImgChip:v},setup(){let e=y(),s=h({username:"admin",password:123456});const t=h({isPassing:!1,isDialog:!1});let i=d("password"),a=d(!1),r=d(null);c((()=>{e.dispatch("outLoing")}));return{bgImage:"/vite-vue-admin/assets/bgImg.56f7377d.png",login_form:r,loginForm:s,handleLogin:function(){r.value.validate((e=>e?""==s.username?(g.warning("请输入用户名"),!1):""==s.password?(g.warning("请输入密码"),!1):void(t.isDialog=!0):(console.log("error submit!!"),!1)))},loginRules:{username:[{required:!0,trigger:"blur",message:"请输入用户名"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}]},pwdType:i,loading:a,imgObj:t,t2:"/vite-vue-admin/assets/t2.e601650a.png",passcallback:()=>{a.value=!0,e.dispatch("loginAction",s).then((e=>{e||(a.value=!1)}))}}}}),M=n();e("data-v-2d36fb70");const B={class:"content"},P={class:"login-form-layout"},C={class:"login-title color-main"},_={class:"btn"},V=a("div",{style:{color:"#ccc"}},"账号：admin 密码：123456",-1),F=a("div",{style:{color:"#ccc"}},"账号：ordinary 密码：123456",-1);s();const O=M(((e,s,r,n,l,h)=>{const d=p("el-input"),c=p("el-form-item"),g=p("el-form"),y=p("el-button"),v=p("el-image"),b=p("drag-verify-img-chip"),w=p("el-dialog");return t(),i("div",B,[a("div",P,[a("span",C,o(e.defalutData.name),1),a(g,{autoComplete:"on",model:e.loginForm,ref:"login_form","label-position":"left"},{default:M((()=>[a(c,{prop:"username"},{default:M((()=>[a(d,{name:"username",type:"text",modelValue:e.loginForm.username,"onUpdate:modelValue":s[2]||(s[2]=s=>e.loginForm.username=s),autoComplete:"on",class:"login-input borderBottom",placeholder:e.t("please.enter.a.account.number")},{prefix:M((()=>[a("i",{class:"el-icon-user icon",onClick:s[1]||(s[1]=(...s)=>e.handleIconClick&&e.handleIconClick(...s))})])),_:1},8,["modelValue","placeholder"])])),_:1}),a(c,{prop:"password"},{default:M((()=>[a(d,{name:"password",type:e.pwdType,class:"login-input",onKeyup:u(e.handleLogin,["enter"]),modelValue:e.loginForm.password,"onUpdate:modelValue":s[5]||(s[5]=s=>e.loginForm.password=s),autoComplete:"on",placeholder:e.t("please.enter.a.PIN")},{prefix:M((()=>[a("i",{class:"el-icon-lock icon",onClick:s[3]||(s[3]=(...s)=>e.handleIconClick&&e.handleIconClick(...s))})])),suffix:M((()=>[a("i",{class:["password"==e.pwdType?"vitebiyan":"viteyanjing","viteIcon"],onClick:s[4]||(s[4]=s=>e.pwdType="password"==e.pwdType?"text":"password")},null,2)])),_:1},8,["type","onKeyup","modelValue","placeholder"])])),_:1})])),_:1},8,["model"]),a("div",_,[a(y,{style:{width:"100%",backgroundColor:e.themeColor},loading:e.loading,onClick:s[6]||(s[6]=f((s=>e.handleLogin("login_form")),["prevent"]))},{default:M((()=>[m(o(e.t("login")),1)])),_:1},8,["style","loading"])]),V,F]),a(v,{src:e.bgImage,fit:"cover",class:"bgImage",style:{background:"#fff"}},null,8,["src"]),a(w,{title:"验证",modelValue:e.imgObj.isDialog,"onUpdate:modelValue":s[8]||(s[8]=s=>e.imgObj.isDialog=s),"custom-class":"widthAuto"},{default:M((()=>[a(b,{imgsrc:e.t2,isPassing:e.imgObj.isPassing,"onUpdate:isPassing":s[7]||(s[7]=s=>e.imgObj.isPassing=s),showRefresh:!0,barWidth:40,text:"请按住滑块拖动",successText:"验证通过",handlerIcon:"el-icon-d-arrow-right",successIcon:"el-icon-circle-check",onPasscallback:e.passcallback},null,8,["imgsrc","isPassing","onPasscallback"])])),_:1},8,["modelValue"])])}));T.render=O,T.__scopeId="data-v-2d36fb70";export default T;
