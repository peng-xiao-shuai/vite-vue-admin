import request from "../../utils/request";

export function fetchList(params?: object) {
  return request({
    url: "/role/list",
    method: "get",
    params: params,
  });
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

export function updateStatus(id: number | string, params?: object) {
  return request({
    url: "/role/updateStatus/" + id,
    method: "post",
    params: params,
  });
}

export function deleteRole(data?: object) {
  return request({
    url: "/role/delete",
    method: "post",
    data: data,
  });
}

export function fetchAllRoleList() {
  return request({
    url: "/role/listAll",
    method: "get",
  });
}

export function listMenuByRole(roleId: number | string) {
  return request({
    url: "/role/listMenu/" + roleId,
    method: "get",
  });
}

export function listResourceByRole(roleId: number | string) {
  return request({
    url: "/role/listResource/" + roleId,
    method: "get",
  });
}

export function allocMenu(data?: object) {
  return request({
    url: "/role/allocMenu",
    method: "post",
    data: data,
  });
}

export function allocResource(data?: object) {
  return request({
    url: "/role/allocResource",
    method: "post",
    data: data,
  });
}
