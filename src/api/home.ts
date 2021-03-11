import request from "../utils/request";

// 浏览量图表
export function pageviewChart() {
  return request({
    url: "home/pageviewChart",
  });
}

// 收益
export function earningsFun() {
  return request({
    url: "home/earnings",
  });
}

/**
 * 曲线图
 * @param status 0=> 粉丝 1=> 用户 2=> 浏览量 3=> 已提交
 * @param period month=> 月 fifteen=> 15天 seven=> 7天
 * @returns
 */
export function chartFun(params: object) {
  return request({
    url: "home/chart",
    params,
  });
}

// 统计
export function countFun() {
  return request({
    url: "home/count",
  });
}

// 表格
export function tableFun(params: object) {
  return request({
    url: "home/table",
    params,
  });
}
