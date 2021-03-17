import request from "/@/utils/request";

// 添加排查依据信息
function tableFun(params: object): any {
  return request({
    url: "modules/table",
    params,
  });
}

export { tableFun };
