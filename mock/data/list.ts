/* 数据源
 * @Author: 彭小黑 
 * @Date: 2021-09-23 13:24:52 
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-09-23 15:02:35
 */

import * as Mock from "mockjs";
var Random = Mock.Random;

type ListsType = {
  [s: string]: any[]
}

// 表格数据源
export type listType = {
  id: number,
  name: string,
  types: number,
  image: string,
  recommend: number,
  iconfont: string,
  rate: number,
  href: string,
  text: string,
  price: string,
  oldPrice: string,
  date: string,
}

function createTableFun():listType[] {
  return Mock.mock({
    'list|25':[{
      'id|+1': 1,
      name: '@ctitle()',
      "types|1": [0, 1, 2],
      image: Random.dataImage('100x100', Random.ctitle()),
      "recommend|1": [0, 1],
      iconfont: "vitehome-liulanliang",
      rate: "@integer(0,5)",
      href: "https://gitee.com/abc1612565136/vite-admin",
      text: "@cparagraph()",
      price: "100",
      oldPrice: "@natural(30,100)",
      date: "@date()",
    }]
  }).list
}

/** 总数据源 */
export const lists: ListsType = {
  // 书表格数据源
  bookLists: createTableFun(),
}

/**
 * 删除数据源
 * @param {string} key 修改的属性
 * @param {any[]} ids 属性值
 */
 export const deleteLists = (key: string, ids: any[]) => {
   console.log(lists[key], ids);
   
  lists[key] = lists[key].filter((item: any) => ids.indexOf(item.id) == -1)
}