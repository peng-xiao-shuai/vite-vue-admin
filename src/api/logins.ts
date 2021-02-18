import request from '../utils/request';

export function login(data: Object){
    return request({
        url:'admin/login',
        method: 'post',
        data
    })
}

export function getUser(params:Object){
    return request({
        url:'admin/info',
        // params
    })
}