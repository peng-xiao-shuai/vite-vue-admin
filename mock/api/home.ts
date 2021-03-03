interface config {
  body: any;
  method: string;
  query: any;
}

import * as Mock from 'mockjs'

function dataArr(){
  let item:any = []
  for(let i = 0;i<12;i++){
    item.push(Mock.mock('@integer(30,70)'))
  }
  return item
}
function homeDateInfoResult(){
  let each:any = []
  for(let j = 0;j<2;j++){
    each.push({
      areaStyle: {},
      data: dataArr(),
      name: j == 0 ? '新增用户' : '重复用户',
      smooth: true,
      // lineStyle: {
      //   width: 0
      // },
      stack: "总量",
      emphasis: {
        focus: 'series'
      },
      type: "line",
    })
  }

  return each
}

export default [
  {
    url: "home/count",
    type: "get",
    response: (config: config) => {
      return {
        code: 200,
        data: Mock.mock({
          users: '@integer(200,1000)',
          shoppings: '@integer(200,1000)',
          pageview: '@integer(200,1000)',
          done: '@integer(200,1000)'
        }),
      };
    },
  },
  {
    url: "home/chart",
    response: (config: config) => {
      return {
        code: 200,
        data: {
          homeDateInfoResult: homeDateInfoResult(),
          horizontalList: [
            "2020-03-01",
            "2020-04-01",
            "2020-05-01",
            "2020-06-01",
            "2020-07-01",
            "2020-08-01",
            "2020-09-01",
            "2020-10-01",
            "2020-11-01",
            "2020-12-01",
            "2021-01-01",
            "2021-02-01",
          ],
        }
      };
    },
  },
  {
    url: "home/member/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
  {
    url: "home/hidden/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
  {
    url: "home/rectification/count",
    response: (config: config) => {
      return {
        code: 200,
        data: {},
      };
    },
  },
];
