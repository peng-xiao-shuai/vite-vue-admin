interface config {
  body: any;
  method: string;
  query: any;
}

import * as Mock from "mockjs";

var Random = Mock.Random;
function dataArr(type: string = "mock") {
  let item: any = [];
  // X轴数据
  let x: any = [];
  for (let i = 0; i < 31; i++) {
    x.push(i + 1);
    item.push(Mock.mock("@integer(10,50)"));
  }
  if (type == "x") {
    return x;
  } else {
    return item;
  }
}

// 浏览量饼图
function pageviewFun() {
  let item: any = [];
  let names: string[] = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  for (let i = 0; i < names.length; i++) {
    item.push({
      value: Mock.mock("@integer(300,600)"),
      name: names[i],
    });
  }
  return item;
}

let typeSwitch = ["昨日增长", "今日增长"]
let homeEcharts = echartsFun();
function echartsFun() {
  let echarts: any = [];
  typeSwitch.forEach((item: any, index: Number) => {
    echarts.push({
      areaStyle: {},
      data: dataArr(),
      name: item,
      smooth: true,
      // lineStyle: {
      //   width: 0
      // },
      // stack: "总量",
      emphasis: {
        focus: "series",
      },
      type: "line",
    });
  });

  return echarts;
}

export default [
  {
    url: "echart/cake",
    type: "get",
    response: (config: config) => {
      return {
        code: 200,
        data: {
          horizontalList: pageviewFun(),
        },
      };
    },
  },
  {
    url: "echart/line",
    response: (config: config) => {
      return {
        code: 200,
        data: Mock.mock({
          homeDateInfoResult: homeEcharts,
            horizontalList: [
              "周一",
              "周二",
              "周三",
              "周四",
              "周五",
              "周六",
            ],
          }),
      };
    },
  },
  {
    url: "echart/pillar",
    response: (config: config) => {
      return {
        code: 200,
        data: Mock.mock({
            homeDateInfoResult: [{
              'data|3': ['@integer(1,10)', '@integer(1,10)'],
              type: 'bar'
          },{
              'data|3': ['@integer(1,10)', '@integer(1,10)'],
              type: 'bar'
          }],
            horizontalList: [
              "周一",
              "周二",
              "周三",
              "周四",
              "周五",
              "周六",
            ],
          }),
      };
    },
  },
];
