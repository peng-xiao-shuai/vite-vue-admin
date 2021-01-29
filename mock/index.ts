import Mock from 'mockjs'

import apis from './apis';

const ENV =  import.meta.env

export function mockXHR(){
    
    let i:any
    for(i of apis){
        Mock.mock(new RegExp(ENV.VITE_BASE_URL + i.url), i.type || 'get', i.response)
    }

}