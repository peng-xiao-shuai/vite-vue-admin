/* 数据源
 * @Author: 彭小黑 
 * @Date: 2021-09-23 13:24:52 
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-09-30 16:01:04
 */

import * as Mock from "mockjs";
import roles, { rolesValueItemType } from "../api/menus";
var Random = Mock.Random;

type ListsType = {
  [s: string]: any[]
}

// 表格数据源类型
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

// 用户列表
export type tokenValue = {
  token: string,
  icon: string,
  id: number,
  menus: rolesValueItemType[],
  roles: string[],
  username: string,
  status: number,
  createTime?: string
}
/**
 * @param roles 角色
 * @param username 账号
 * @param alias 别名
 * @param status 是否停用
 */
const tokens: tokenValue[] = [{
    token: "admin-token",
    icon: "https://avatars.githubusercontent.com/u/53845479?v=4",
    id: 1,
    menus: roles["admin"].filter(Item => Item.hidden == 1),
    roles: ["admin"],
    username: "admin",
    status: 1,
  },
  {
    token: "ordinary-token",
    icon: "https://avatars.githubusercontent.com/u/53579755?v=4",
    id: 2,
    menus: roles["ordinary"].filter(Item => Item.hidden == 1),
    roles: ["ordinary"],
    username: "ordinary",
    status: 1,
  },
  {
    token: "test-token",
    icon: "https://avatars.githubusercontent.com/u/53579755?v=4",
    id: 2,
    menus: roles["admin"].filter(Item => Item.hidden == 1),
    roles: ["admin","ordinary"],
    username: "test",
    status: 1,
  },
];

// 角色列表
const roleLists: {label: string, value: string}[] = [{
  label: '超级管理员',
  value: 'admin'
},{
  label: '普通用户',
  value: 'ordinary'
}]


/** 总数据源 */
export const lists: ListsType = {
  // 书表格数据源
  bookLists: createTableFun(),
  // 用户列表
  tokens,
  // 角色列表
  roleLists,
  rolesAdmin: roles.admin
}

/**
 * 添加数据源
 * @param {string} key 修改的属性
 * @param {object} val 属性值
 * @param {boolean} replace 是否替换属性值 不传则拼接
 */
 export const addLists = (key: string, val: any, replace: boolean = false) => {
  // 生成id
  val.id = lists[key].length + 1
  val.key = lists[key].length + 1
  const date = new Date()
  val.createTime = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

  lists[key] = replace ? [val] : lists[key].concat([val])
}

/**
 * 删除数据源
 * @param {string} key 修改的属性
 * @param {any[]} ids 属性值
 */
export const deleteLists = (key: string, ids: any[]) => {
  const copy = JSON.parse(JSON.stringify(lists[key]))

  copy.forEach((item: any, index: number) => ids.indexOf(item.id) !== -1 ? lists[key].splice(index, 1) : '')
}

/**
 * 修改数据源
 * @param {string} key 修改的属性
 * @param {object} val 属性值
 * @param {boolean} replace 是否替换属性值 不传则拼接
 */
export const updateLists = (key: string, val: any) => {
  //  获取下标
  const index = lists[key].map(item => item.id).indexOf(val.id)

  lists[key][index] = { ...lists[key][index], ...val }
}