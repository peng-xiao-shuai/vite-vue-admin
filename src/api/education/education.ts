import request from '../../utils/request';

// 添加教育资料信息
export function addMaterial(data:object){
    return request({
        url:'material/addMaterial',
        method: 'post',
        data
    })
}

// 获取指定教育资料信息
export function getMaterial(params:object){
    return request({
        url:'material/getMaterial',
        params
    })
}

// 获取教育资料信息
export function listMaterial(params:object){
    return request({
        url:'material/listMaterial',
        params
    })
}

// 修改教育资料信息
export function modifyMaterial(data:object){
    return request({
        url:'material/modifyMaterial',
        method: 'post',
        data
    })
}

// 删除教育资料信息
export function removeMaterial(data:object){
    return request({
        url:'material/removeMaterial',
        method: 'post',
        data
    })
}