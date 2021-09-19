import request from "@/utils/request";

// 查询富文本
export function richTextFun() {
  return request({
    url: "modules/richText",
  });
}
