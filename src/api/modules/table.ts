import request from "@/utils/request";

// 添加排查依据信息
export function tableFun(params: object): any {
  return request({
    url: "modules/table",
    params,
  });
}
