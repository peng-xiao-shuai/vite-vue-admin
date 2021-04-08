import request from "/@/utils/request";

// 柱状图
export function pillarFun(params?: object): any {
  return request({
    url: "echart/pillar",
    params,
  });
}
