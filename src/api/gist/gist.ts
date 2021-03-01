import request from '../../utils/request';

// 添加排查依据信息
function addInvestigationBasis(data:object): any{
    return request({
        url:'investigation/basis/addInvestigationBasis',
        method: 'post',
        data
    })
}

// 获取指定排查依据信息
function getInvestigationBasis(params:object): any{
    return request({
        url:'investigation/basis/getInvestigationBasis',
        params
    })
}

// 获取所有排查依据信息
function listInvestigationBasis(params:object): any{
    return request({
        url:'investigation/basis/listInvestigationBasis',
        params
    })
}

// 修改排查依据信息
function modifyInvestigationBasis(data:object): any{
    return request({
        url:'investigation/basis/modifyInvestigationBasis',
        method: 'post',
        data
    })
}

// 删除排查依据信息
function removeInvestigationBasis(data:object): any{
    return request({
        url:'investigation/basis/removeInvestigationBasis',
        method: 'post',
        data
    })
}

// 排查订单
function listInvestigationOrder(params:object): any{
    return request({
        url:'investigation/order/listInvestigationOrder',
        params
    })
}

export {
    addInvestigationBasis,
    getInvestigationBasis,
    listInvestigationBasis,
    modifyInvestigationBasis,
    removeInvestigationBasis,
    listInvestigationOrder
}