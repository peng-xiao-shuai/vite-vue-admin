import request from '/@/utils/request';

// 添加排查依据信息
export function addInvestigationBasis(data:object){
    return request({
        url:'investigation/basis/addInvestigationBasis',
        method: 'post',
        data
    })
}

// 获取指定排查依据信息
export function getInvestigationBasis(params:object){
    return request({
        url:'investigation/basis/getInvestigationBasis',
        params
    })
}

// 获取所有排查依据信息
export function listInvestigationBasis(params:object){
    return request({
        url:'investigation/basis/listInvestigationBasis',
        params
    })
}

// 修改排查依据信息
export function modifyInvestigationBasis(data:object){
    return request({
        url:'investigation/basis/modifyInvestigationBasis',
        method: 'post',
        data
    })
}

// 删除排查依据信息
export function removeInvestigationBasis(data:object){
    return request({
        url:'investigation/basis/removeInvestigationBasis',
        method: 'post',
        data
    })
}

// 排查订单
export function listInvestigationOrder(params:object){
    return request({
        url:'investigation/order/listInvestigationOrder',
        params
    })
}