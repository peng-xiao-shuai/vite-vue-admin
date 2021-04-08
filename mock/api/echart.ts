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
  let names: string[] = ["总浏览", "本月浏览", "昨日浏览", "今日浏览"];
  for (let i = 0; i < 4; i++) {
    item.push({
      value: i == 0 ? 1234 : Mock.mock("@integer(300,600)"),
      name: names[i],
    });
  }
  return item;
}

export default [
  {
    url: "home/pageviewChart",
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
