import request from "@/utils/request";

export function fetchList(parentId: number | string, params?: object) {
  return request({
    url: "menu/list?parentId=" + parentId,
    params: params,
  });
}

export function deleteMenu(ids: (number | string)[]) {
  return request({
    url: "menu/remove",
    method: "delete",
    data: {
      ids
    }
  });
}

export function updateMenu(data: object) {
  return request({
    url: "menu/update",
    method: "post",
    data: data,
  });
}