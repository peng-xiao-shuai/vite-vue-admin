import request from "@/utils/request";

// 查询列表
type paramsType = {
  pageSize: number,
  pageNum: number,
  date?: string
  types?: string
  name?: string
}
export function tableFun(params: paramsType) {
  return request({
    url: "modules/table",
    params,
  });
}
