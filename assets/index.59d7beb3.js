import{_ as e}from"./index.eca9aedb.js";import{f as a,q as t,v as o,r as l,o as s,c as n,a as i,F as r,k as d,t as c,A as m,e as h,g as p,al as u}from"./vendor.3f7f2d33.js";import{i as v,L as y}from"./index.bc823562.js";import{s as f,u as g,a as w}from"./index.61844860.js";var b=a({props:{count:{type:Object,default:{}},height:{type:[Number,String],default:50}},components:{}});const x=m("data-v-6700b6a9");t("data-v-6700b6a9");const S={style:{"margin-bottom":"20px"}},k={class:"warp"},C={class:"text"},D={class:"num"};o();const _=x(((e,a,t,o,m,h)=>{const p=l("el-card");return s(),n("div",S,[i("div",{class:"grid",style:{height:e.height+"px"}},[(s(!0),n(r,null,d(e.count,((a,t)=>(s(),n(p,{key:a.value,class:["card-panel","item"+t],shadow:e.defalutData.cardShadow,"body-style":{background:a.color,padding:"10px",height:e.height+"px",boxSizing:"border-box"}},{default:x((()=>[i("div",{class:["icon-people","viteIcon",a.icon]},null,2),i("div",k,[i("div",C,c(a.title),1),i("div",D,c(a.value||0),1)])])),_:2},1032,["class","shadow","body-style"])))),128))],4)])}));b.render=_,b.__scopeId="data-v-6700b6a9";const I={props:{echartsId:String,dataECharts:Object,title:String},data:()=>({}),mounted(){},watch:{dataECharts:{deep:!0,immediate:!0,handler(e){console.log(e),this.drawChart(this.dataECharts)}}},mounted(){},methods:{drawChart(e){var a=this.$refs.chart;if(a){let t=v(a),o={tooltip:{trigger:"axis"},legend:{data:e.series.map((e=>e.name))},grid:{left:"5%",right:"3%"},toolbox:{show:!0,feature:{dataZoom:{yAxisIndex:"none"},dataView:{readOnly:!1},magicType:{type:["line","bar"]},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:e.xAxisData},yAxis:{type:"value",axisLabel:{formatter:"{value} 元"}},series:[{name:e.series[0].name,type:"line",data:e.series[0].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#5bd1db"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:e.series[1].name,type:"line",data:e.series[1].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#00ef09"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:e.series[2].name,type:"line",data:e.series[2].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#EB5252"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:e.series[3].name,type:"line",data:e.series[3].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#C8B2F4"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:e.series[4].name,type:"line",data:e.series[4].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#FFCB8C"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}}]};t.setOption(o)}}}},E={class:""};I.render=function(e,a,t,o,l,r){return s(),n("div",E,[i("div",{id:t.echartsId,ref:"chart",style:{width:"100%",height:"250px"}},null,8,["id"])])};let L=[{label:"姓名",poprs:[{popr:"name"}]},{label:"头像",poprs:[{type:"image",popr:"head",data:{preview:!0,style:{width:"40px",height:"40px",borderRadius:"50%"}}}]},{label:"性别",poprs:[{popr:"gender"}]},{label:"内容",poprs:[{popr:"content"}]},{label:"时间",poprs:[{popr:"date"}]},{label:"邮箱",poprs:[{popr:"email"}]},{label:"状态",poprs:[{popr:"status",filter:[{key:!0,value:"提交成功"},{key:!1,value:"提交失败"}]}]}];var P=a({name:"home",components:{homeEcharts:e,PanelGroup:b,lineBarEcharts:I},setup(){const{t:e}=g(),a=[{opacity:.4,color:new y(0,0,0,1,[{offset:0,color:w().state.settings.themeColor},{offset:1,color:"rgba(255, 255, 255,0)"}])},{opacity:.4,color:new y(0,0,0,1,[{offset:0,color:"#55bcff"},{offset:1,color:"rgba(255, 255, 255,0)"}])}],t=[w().state.settings.themeColor,"#55bcff","#F6A829","#646cff"];let o=h([{icon:"vitehome-user",title:"粉丝",value:"",key:"users",color:w().state.settings.themeColor},{icon:"vitehome-wengzhang",title:"文章",value:"",key:"shoppings",color:"#55bcff"},{icon:"vitehome-liulanliang",title:"浏览量",value:"",key:"pageview",color:"#646cff "},{icon:"vitehome-done",title:"已提交",value:"",key:"done",color:"#F6A829 "}]),l=h({value:{}}),s=h({value:{}}),n=h(null),i=h({value:[]}),r=p(0),d=h(null),c=h(null),m=h({value:{},chart:{}}),u=h({pageSize:3,pageNum:1}),v=h({value:[]}),b=h(L),x=p("Seven");function S(e,o="Seven"){var s;x.value=o,i.value=[],(s={status:e,period:o},f({url:"home/chart",params:s})).then((e=>{e.data.homeDateInfoResult.forEach(((e,o)=>{e.areaStyle=a[o],i.value.push({name:e.name,color:t[o]})})),l.value=e.data}))}function k(e){var a;Object.assign(u,e||{}),(a=u,f({url:"home/table",params:a})).then((e=>{v.value=e.data.list}))}return k(),f({url:"home/count"}).then((e=>{o.forEach((a=>{a.value=e.data[a.key]}))})),S(0),f({url:"home/pageviewChart"}).then((e=>{s.value=e.data})),f({url:"home/earnings"}).then((e=>{m.value=e.data.money,e.data.chart.homeDateInfoResult.forEach(((e,t)=>{e.areaStyle=a[t]})),m.chart=e.data.chart})),{t:e,count:o,chart:l,pageviewData:s,earnings:m,colors:t,list:v,tbConfig:b,current:r,user:n,userLineColor:i,findTime:x,reform:d,handleGetTable:k,investigation:c,typeSwitch:function(e){r.value=e,S(e)},command:function(e){S(r.value,e)}}}});const j=m("data-v-03ad5856");t("data-v-03ad5856");const A={class:"grid"},F={class:"eachDiv eachDiv1"},B={class:"typeSwitch"},O={class:"lineColor"},z={class:"timeDropdown"},G={class:"el-dropdown-link"},M=i("i",{class:"el-icon-arrow-down el-icon--right"},null,-1),T=u("Month"),R=u("Fifteen"),N=u("Seven"),q={class:"eachDiv eachDiv2"},V={class:"moneyGrid"},Z=i("div",{class:"viteIconBg"},[i("i",{class:"viteIcon vitehome-daymoney"})],-1),$={class:"text"},H={class:"money"},J=i("span",{class:"title"},"今日收益",-1),K={class:"increase"},Q=i("div",{class:"viteIconBg yellow"},[i("i",{class:"viteIcon vitehome-zongshouyi"})],-1),U={class:"text"},W={class:"money"},X=i("span",{class:"title"},"总收益",-1),Y={class:"increase"},ee={class:"eachDiv eachDiv3"},ae={class:"echartsBox"},te={class:"un-handle-layout"},oe={class:"eachDiv eachDiv4"},le=i("h3",{style:{margin:"0 0 10px 0",display:"flex","justify-content":"space-between"}},[i("span",null,"提交列表")],-1),se={class:"un-handle-layout"};o();const ne=j(((e,a,t,o,m,h)=>{const p=l("panel-group"),v=l("el-dropdown-item"),y=l("el-dropdown-menu"),f=l("el-dropdown"),g=l("homeEcharts"),w=l("el-card"),b=l("powerful-table");return s(),n("div",null,[i("div",A,[i("div",F,[i(p,{count:e.count,height:90},null,8,["count"]),i(w,{shadow:e.defalutData.cardShadow},{default:j((()=>[i(g,{isSlot:!0,echartsId:"chart",height:400,colors:e.colors,information:e.chart.value,title:e.t("a"),types:"line"},{default:j((()=>[i("div",B,[(s(!0),n(r,null,d(e.count,((a,t)=>(s(),n("div",{key:"switch"+t,style:{background:e.current==t?e.themeColor:"",transition:"all .2s"},class:{"s-active":e.current==t},onClick:a=>e.typeSwitch(t)},c(a.title),15,["onClick"])))),128))])])),lineColor:j((()=>[i("div",O,[(s(!0),n(r,null,d(e.userLineColor.value,(e=>(s(),n("div",{key:e.color},[i("i",{style:{background:e.color}},null,4),i("span",null,c(e.name),1)])))),128))])])),timeSwiper:j((()=>[i("div",z,[i(f,{onCommand:e.command},{dropdown:j((()=>[i(y,null,{default:j((()=>[i(v,{command:"Month"},{default:j((()=>[T])),_:1}),i(v,{command:"Fifteen"},{default:j((()=>[R])),_:1}),i(v,{command:"Seven"},{default:j((()=>[N])),_:1})])),_:1})])),default:j((()=>[i("span",G,[u(c(e.findTime),1),M])])),_:1},8,["onCommand"])])])),_:1},8,["colors","information","title"])])),_:1},8,["shadow"])]),i("div",q,[i("div",V,[i(w,{shadow:e.defalutData.cardShadow,class:"eachDiv"},{default:j((()=>[Z,i("div",$,[i("div",H,"￥"+c(e.earnings.value.dayMoney),1),J]),i("div",K,[i("i",{class:"el-icon-top",style:{color:e.themeColor}},c(e.earnings.value.dayPercentage)+"%",5)])])),_:1},8,["shadow"]),i(w,{shadow:e.defalutData.cardShadow,class:"eachDiv"},{default:j((()=>[Q,i("div",U,[i("div",W,"￥"+c(e.earnings.value.totalMoney),1),X]),i("div",Y,[i("i",{class:"el-icon-top",style:{color:e.themeColor}},c(e.earnings.value.totalPercentage)+"%",5)])])),_:1},8,["shadow"]),i(w,{shadow:e.defalutData.cardShadow,"body-style":{padding:"20px"},class:"eachDiv eachDiv-3"},{default:j((()=>[i(g,{echartsId:"earnings",height:320,colors:e.colors,information:e.earnings.chart,types:"line",title:"收益折线图"},null,8,["colors","information"])])),_:1},8,["shadow"])])]),i("div",ee,[i(w,{shadow:e.defalutData.cardShadow},{default:j((()=>[i("div",ae,[i("div",te,[i(g,{echartsId:"pageviewData",height:270,colors:e.colors,information:e.pageviewData.value,types:"homeCake",title:"浏览量饼状图"},null,8,["colors","information"])])])])),_:1},8,["shadow"])]),i("div",oe,[i(w,{shadow:e.defalutData.cardShadow},{default:j((()=>[le,i("div",se,[i(b,{isSelect:!1,isPagination:!1,list:e.list.value,header:e.tbConfig},null,8,["list","header"])])])),_:1},8,["shadow"])])])])}));P.render=ne,P.__scopeId="data-v-03ad5856";export default P;
