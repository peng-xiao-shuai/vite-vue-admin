import request from '/@/utils/request';

// 添加企业信息
export function addEnterprise(data:object){
    return request({
        url:'enterprise/addEnterprise',
        method: 'post',
        data
    })
}

// 获取指定企业信息
export function getEnterprise(params:object){
    return request({
        url:'enterprise/getEnterprise',
        params
    })
}

// 获取所有企业信息
export function listEnterprise(params:object){
    return request({
        url:'enterprise/listEnterprise',
        params
    })
}

// 修改企业信息
export function modifyEnterprise(data:object){
    return request({
        url:'enterprise/modifyEnterprise',
        method: 'post',
        data
    })
}

// 删除企业信息
export function removeEnterprise(data:object){
    return request({
        url:'enterprise/removeEnterprise',
        method: 'post',
        data
    })
}