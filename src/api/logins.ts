import request from '../utils/request';

export function login(data: Object){
    return request({
        url:'login',
        method: 'post',
        data
    })
}

export function getUser(){
    return request({
        url:'info'
    })
}