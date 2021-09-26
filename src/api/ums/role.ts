import request from "@/utils/request";

/**
 * 获取角色列表
 * @param params 
 * @returns 
 */
export function getRoleList(params:object) {
  return request({
    url: 'admin/roleList',
    params: params
  })
}

export function createRole(data?: object) {
  return request({
    url: "/role/create",
    method: "post",
    data: data,
  });
}

export function updateRole(id: number | string, data?: object) {
  return request({
    url: "/role/update/" + id,
    method: "post",
    data: data,
  });
}

export function deleteRole(data?: object) {
  return request({
    url: "/role/delete",
    method: "post",
    data: data,
  });
}
