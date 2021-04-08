import request from "/@/utils/request";

// 折线图
export function lineFun(params?: object): any {
  return request({
    url: "echart/line",
    params,
  });
}
// 柱状图
export function pillarFun(params?: object): any {
  return request({
    url: "echart/pillar",
    params,
  });
}
// 饼状图
export function cakeFun(params?: object): any {
  return request({
    url: "echart/cake",
    params,
  });
}