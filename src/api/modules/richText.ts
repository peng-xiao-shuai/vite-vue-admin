import request from "@/utils/request";

// 添加排查依据信息
export function richTextFun(): any {
  return request({
    url: "modules/richText",
  });
}
