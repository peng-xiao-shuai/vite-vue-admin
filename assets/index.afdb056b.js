import{i as e,_ as a,L as t}from"./index.7aa513c0.js";import{d as o,p as l,l as i,r as n,o as s,c as r,i as d,F as c,g as m,m as h,w as p,t as u,h as v,n as y,u as f,J as g,D as w,a as b,K as x}from"./vendor.2b6d80ee.js";import{s as S}from"./index.715306b4.js";var D=o({props:{count:{type:Object,default:{}},height:{type:[Number,String],default:50}},components:{}});l("data-v-349dc6b8");const C={style:{"margin-bottom":"20px"}},k={class:"warp"},_={class:"text"},I={class:"num"};i(),D.render=function(e,a,t,o,l,i){const f=n("el-card");return s(),r("div",C,[d("div",{class:"grid",style:y({height:e.height+"px"})},[(s(!0),r(c,null,m(e.count,((a,t)=>(s(),h(f,{key:a.value,class:v(["card-panel","item"+t]),shadow:e.defaultData.cardShadow,"body-style":{background:a.color,padding:"10px",height:e.height+"px",boxSizing:"border-box"}},{default:p((()=>[d("div",k,[d("div",_,u(e.t(a.locale)),1),d("div",I,u(a.value||0),1)]),d("div",{class:v(["icon-people",e.defaultData.iconfont,a.icon])},null,2)])),_:2},1032,["class","shadow","body-style"])))),128))],4)])},D.__scopeId="data-v-349dc6b8";const E={props:{echartsId:String,dataECharts:Object,title:String},data:()=>({}),mounted(){},watch:{dataECharts:{deep:!0,immediate:!0,handler(e){console.log(e),this.drawChart(this.dataECharts)}}},mounted(){},methods:{drawChart(a){var t=this.$refs.chart;if(t){let o=e(t),l={tooltip:{trigger:"axis"},legend:{data:a.series.map((e=>e.name))},grid:{left:"5%",right:"3%"},toolbox:{show:!0,feature:{dataZoom:{yAxisIndex:"none"},dataView:{readOnly:!1},magicType:{type:["line","bar"]},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:a.xAxisData},yAxis:{type:"value",axisLabel:{formatter:"{value} 元"}},series:[{name:a.series[0].name,type:"line",data:a.series[0].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#5bd1db"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:a.series[1].name,type:"line",data:a.series[1].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#00ef09"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:a.series[2].name,type:"line",data:a.series[2].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#EB5252"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:a.series[3].name,type:"line",data:a.series[3].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#C8B2F4"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}},{name:a.series[4].name,type:"line",data:a.series[4].data,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},itemStyle:{color:"#FFCB8C"},lineStyle:{width:3},markLine:{label:{show:!0,position:"middle",formatter:"{b}: {c} 元"},symbol:"none",data:[{type:"average",name:"平均值"}]}}]};o.setOption(l)}}}},F={class:""},L=["id"];E.render=function(e,a,t,o,l,i){return s(),r("div",F,[d("div",{id:t.echartsId,ref:"chart",style:{width:"100%",height:"250px"}},null,8,L)])};let P=[{label:"姓名",props:[{prop:"name"}]},{label:"头像",width:"80px",props:[{type:"image",prop:"head",data:{preview:!0,style:{width:"40px",height:"40px",borderRadius:"50%"}}}]},{label:"性别",width:"60px",props:[{prop:"gender"}]},{label:"内容",props:[{prop:"content"}]},{label:"时间",props:[{prop:"date"}]},{label:"状态",props:[{prop:"status",type:"tag",data:{effect:"dark",color:e=>"提交失败"==e?"#F56C6C":"#67C23A"}}]}];var A=o({name:"home",components:{HomeEcharts:a,PanelGroup:D,lineBarEcharts:E},setup(){const e=[{opacity:.4,color:new t(0,0,0,1,[{offset:0,color:f().state.settings.themeColor.primary},{offset:1,color:"rgba(255, 255, 255,0)"}])},{opacity:.4,color:new t(0,0,0,1,[{offset:0,color:"#55bcff"},{offset:1,color:"rgba(255, 255, 255,0)"}])}],a=[f().state.settings.themeColor.primary,"#55bcff","#F6A829","#646cff"];let o=g([{icon:"vitehome-user",title:"用户",value:"",locale:"user",key:"users",color:f().state.settings.themeColor.primary},{icon:"vitehome-wengzhang",title:"文章",value:"",locale:"article",key:"shoppings",color:"#55bcff"},{icon:"vitehome-liulanliang",title:"浏览量",value:"",locale:"page.view",key:"pageview",color:"#646cff "},{icon:"vitehome-done",title:"已提交",value:"",key:"done",locale:"commit",color:"#F6A829 "}]),l=g({value:{}}),i=g({value:{}}),n=g({value:[]}),s=w(0),r=g({value:{},chart:{}}),d=g({pageSize:3,pageNum:1}),c=g({value:[]}),m=g(P),h=w("Seven");function p(t,o="Seven"){var i;h.value=o,n.value=[],(i={status:t,period:o},S({url:"home/chart",params:i})).then((t=>{t.data.homeDateInfoResult.forEach(((t,o)=>{t.areaStyle=e[o],n.value.push({name:t.name,color:a[o]})})),l.value=t.data}))}function u(e){var a;Object.assign(d,e||{}),(a=d,S({url:"home/table",params:a})).then((e=>{c.value=e.data.list}))}return u(),S({url:"home/count"}).then((e=>{o.forEach((a=>{a.value=e.data[a.key]}))})),p(0),S({url:"home/pageviewChart"}).then((e=>{i.value=e.data})),S({url:"home/earnings"}).then((a=>{r.value=a.data.money,a.data.chart.homeDateInfoResult.forEach(((a,t)=>{a.areaStyle=e[t]})),r.chart=a.data.chart})),{count:o,chart:l,pageviewData:i,earnings:r,colors:a,list:c,tbConfig:m,current:s,userLineColor:n,findTime:h,handleGetTable:u,typeSwitch:function(e){s.value=e,p(e)},command:function(e){p(s.value,e)}}}});l("data-v-20e98f77");const j={class:"grid"},B={class:"eachDiv eachDiv1"},z={class:"typeSwitch"},O=["onClick"],G={class:"lineColor"},M={class:"timeDropdown"},T={class:"el-dropdown-link"},R=d("i",{class:"el-icon-arrow-down el-icon--right"},null,-1),H=x("Month"),N=x("Fifteen"),J=x("Seven"),K={class:"eachDiv eachDiv2"},V={class:"moneyGrid"},Z={class:"viteIconBg"},$={class:"text"},q={class:"money"},Q={class:"title"},U={class:"increase"},W={class:"viteIconBg yellow"},X={class:"text"},Y={class:"money"},ee={class:"title"},ae={class:"increase"},te={class:"eachDiv eachDiv3"},oe={class:"echartsBox"},le={class:"un-handle-layout"},ie={class:"eachDiv eachDiv4"},ne={style:{margin:"0 0 10px 0",display:"flex","justify-content":"space-between"}};i(),A.render=function(e,a,t,o,l,i){const h=n("panel-group"),f=n("el-dropdown-item"),g=n("el-dropdown-menu"),w=n("el-dropdown"),S=n("HomeEcharts"),D=n("el-card"),C=n("powerful-table"),k=n("el-scrollbar");return s(),r("div",null,[d("div",j,[d("div",B,[b(h,{count:e.count,height:90},null,8,["count"]),b(D,{shadow:e.defaultData.cardShadow},{default:p((()=>[b(S,{isSlot:!0,echartsId:"chart",height:400,colors:e.colors,information:e.chart.value,title:e.t("user.login.line"),types:"line"},{default:p((()=>[d("div",z,[(s(!0),r(c,null,m(e.count,((a,t)=>(s(),r("div",{key:"switch"+t,style:y({background:e.current==t?e.themeColor:"",transition:"all .2s"}),class:v({"s-active":e.current==t}),onClick:a=>e.typeSwitch(t)},u(e.t(a.locale)),15,O)))),128))])])),lineColor:p((()=>[d("div",G,[(s(!0),r(c,null,m(e.userLineColor.value,(e=>(s(),r("div",{key:e.color},[d("i",{style:y({background:e.color})},null,4),d("span",null,u(e.name),1)])))),128))])])),timeSwiper:p((()=>[d("div",M,[b(w,{onCommand:e.command},{dropdown:p((()=>[b(g,null,{default:p((()=>[b(f,{command:"Month"},{default:p((()=>[H])),_:1}),b(f,{command:"Fifteen"},{default:p((()=>[N])),_:1}),b(f,{command:"Seven"},{default:p((()=>[J])),_:1})])),_:1})])),default:p((()=>[d("span",T,[x(u(e.findTime),1),R])])),_:1},8,["onCommand"])])])),_:1},8,["colors","information","title"])])),_:1},8,["shadow"])]),d("div",K,[d("div",V,[b(D,{shadow:e.defaultData.cardShadow,class:"eachDiv"},{default:p((()=>[d("div",Z,[d("i",{class:v([e.defaultData.iconfont,"vitehome-daymoney"])},null,2)]),d("div",$,[d("div",q,"￥"+u(e.earnings.value.dayMoney),1),d("span",Q,u(e.t("day.income")),1)]),d("div",U,[d("i",{class:"el-icon-top",style:y({color:e.themeColor})},u(e.earnings.value.dayPercentage)+"%",5)])])),_:1},8,["shadow"]),b(D,{shadow:e.defaultData.cardShadow,class:"eachDiv"},{default:p((()=>[d("div",W,[d("i",{class:v([e.defaultData.iconfont,"vitehome-zongshouyi"])},null,2)]),d("div",X,[d("div",Y,"￥"+u(e.earnings.value.totalMoney),1),d("span",ee,u(e.t("total.income")),1)]),d("div",ae,[d("i",{class:"el-icon-top",style:y({color:e.themeColor})},u(e.earnings.value.totalPercentage)+"%",5)])])),_:1},8,["shadow"]),b(D,{shadow:e.defaultData.cardShadow,"body-style":{padding:"20px"},class:"eachDiv eachDiv-3"},{default:p((()=>[b(S,{echartsId:"earnings",height:320,colors:e.colors,information:e.earnings.chart,types:"line",title:e.t("income.line")},null,8,["colors","information","title"])])),_:1},8,["shadow"])])]),d("div",te,[b(D,{shadow:e.defaultData.cardShadow},{default:p((()=>[d("div",oe,[d("div",le,[b(S,{echartsId:"pageviewData",height:270,colors:e.colors,information:e.pageviewData.value,types:"homeCake",title:e.t("page.view.pillar")},null,8,["colors","information","title"])])])])),_:1},8,["shadow"])]),d("div",ie,[b(D,{shadow:e.defaultData.cardShadow},{default:p((()=>[d("h3",ne,[d("span",null,u(e.t("commit.list")),1)]),b(k,{style:{height:"calc(100% - 40px)",width:"100%","box-sizing":"border-box"}},{default:p((()=>[b(C,{isSelect:!1,isPagination:!1,list:e.list.value,header:e.tbConfig},null,8,["list","header"])])),_:1})])),_:1},8,["shadow"])])])])},A.__scopeId="data-v-20e98f77";export default A;