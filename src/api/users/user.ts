import request from '/@/utils/request';

// 分页获取所有用户信息
export function userlist(params:any) {
    return request({
      url:'/member/list',
      params: params
    })
  }
  
  // 修改会员信息
  export function updateUser(data:any) {
    return request({
      url:'/member/integration/history',
      method:'post',
      data
    })
  }