interface config {
  body: any;
  method: string;
  query: any;
}

import * as Mock from "mockjs";

var Random = Mock.Random;
const position = JSON.stringify({ x: 0, y: 0 })
// 一级
let province: any[] = Mock.mock({
  'data': [
    {
      name: '湖南省',
      id: 1,
      parentId: 0,
      // 扩展字段
      jsonStr: position
    }
  ],
}).data

// 二级
let city: any[] = ['长沙市', '株洲市', '湘潭市'].map((item, index) => {
  return {
    name: item,
    id: index + 2,
    parentId: 1,
    // 扩展字段
    jsonStr: position
  }
})

let statics: string[][] = [['长沙县', '芙蓉区', '天心区', '岳麓区'], ['荷塘区', '芦淞区'], ['湘潭县', '岳塘区']]
// 三级
let county: any[] = []
let id = city.length + 1
city.forEach((item, index) => {
  let arr = statics[index].map((each, idx) => {
    id++
    return {
      name: each,
      id: id,
      parentId: item.id,
      // 扩展字段
      jsonStr: position
    }
  })

  county.push(...arr)
})

let data: any[] = [].concat(...province).concat(...city).concat(...county)

export default [
  {
    url: "antvx6/list",
    type: "get",
    response: (config: config) => {
      return {
        code: 200,
        data: data.filter(_ => config.query.parentId == _.parentId)
      };
    },
  },
];
