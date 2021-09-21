import * as Mock from "mockjs";
import { config } from '../apis';
import type { echartsType } from './echart';

var Random = Mock.Random;
// 所有数据
let _x: number[] = dataArr("x");

function dataArr(type: string = "mock") {
  let item: number[] = [];
  // X轴数据
  let x: number[] = [];
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

let typeSwitch:string[][] = [
  ["新增用户", "重复用户"],
  ["新增文章"],
  ["vue文档", "vite文档"],
  ["提交成功", "提交失败"],
];
let homeEcharts:echartsType[][] = echartsFun();

function echartsFun():echartsType[][] {
  let echarts: echartsType[][] = [];

  typeSwitch.forEach((item: string[]) => {
    let each: echartsType[] = [];
    for (let j in item) {
      each.push({
        areaStyle: {},
        data: dataArr(),
        name: item[j],
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
    }

    echarts.push(each);
  });

  return echarts;
}

// 浏览量饼图
function pageviewFun() {
  type itemType = {
    value: number,
    name: string
  }
  let item: itemType[] = [];
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
    url: "home/count",
    type: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          users: "@integer(200,1000)",
          shoppings: "@integer(200,1000)",
          pageview: "@integer(200,1000)",
          done: "@integer(200,1000)",
        }),
      };
    },
  },
  {
    url: "home/chart",
    response: (config: config) => {
      let i = config.query.status;
      let num: number =
        config.query.period == "Seven"
          ? 24
          : config.query.period == "Fifteen"
          ? 15
          : 0;
      let timeBeingX = JSON.parse(JSON.stringify(_x));
      let timeBeingList = JSON.parse(JSON.stringify(homeEcharts[i]));

      // 截取部分数据
      function timeBeingListFun():echartsType[] {
        return timeBeingList.map((item: echartsType) => {
          let each: number[] = [];
          let j: string;
          for (j in item.data) {
            // 默认就是31天数据 等于0时不需要截取
            if (num == 0) return item;

            if (Number(j) >= num && num != 0) {
              each.push(item.data[j]);
            }
          }

          item.data = each;

          return item;
        });
      }

      return {
        code: 200,
        data: {
          homeDateInfoResult: timeBeingListFun(),
          horizontalList: timeBeingX.splice(num, timeBeingX.length - 1),
        },
      };
    },
  },
  {
    url: "home/pageviewChart",
    type: "get",
    response: () => {
      return {
        code: 200,
        data: {
          horizontalList: pageviewFun(),
        },
      };
    },
  },
  {
    url: "home/earnings",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          money: {
            "dayMoney|1-1000.1-2": 100,
            "dayPercentage|1-100.1-2": 100,
            "totalMoney|1-1000.1-2": 100,
            "totalPercentage|1-100.1-2": 100,
          },
          chart: {
            homeDateInfoResult: [
              {
                areaStyle: {},
                data: dataArr(),
                // lineStyle: {
                //   width: 0
                // },
                stack: "总量",
                emphasis: {
                  focus: "series",
                },
                type: "line",
              },
            ],
            horizontalList: [
              "周一",
              "周二",
              "周三",
              "周四",
              "周五",
              "周六",
              "周日",
            ],
          },
        }),
      };
    },
  },
  {
    url: "home/table",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          // list: list.filter((item, index) => {
          //   return index >= (num - 1) * size && index < num * size;
          // }),
          "list|3": [
            {
              name: "@name()",
              head: Random.image("100x100", Random.color(), Random.first()),
              "gender|1": ["男", "女"],
              content: "@ctitle()",
              date: "@date()",
              email: "1612565136@qq.com",
              "status|1": ['提交成功','提交失败'],
            },
          ],
        }),
      };
    },
  },
];
