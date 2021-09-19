import request from "@/utils/request";

// 折线图
export function lineFun() {
  return request({
    url: "echart/line",
  });
}
// 柱状图
export function pillarFun() {
  return request({
    url: "echart/pillar",
  });
}
// 饼状图
export function cakeFun() {
  return request({
    url: "echart/cake",
  });
}