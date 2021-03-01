import request from '../../utils/request';

// 获取系统配置数据
export function getSettings(){
    return request({
        url:'system/config/list/settings',
    })
}

// 获取系统配置数据
export function setSetting(data:object){
    return request({
        url:'system/config/setting',
        method: 'post',
        data
    })
}
