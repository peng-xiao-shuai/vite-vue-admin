import Mock from 'mockjs'

import apis from './apis';

const ENV =  import.meta.env
import { param2Obj } from './utils';

interface options {
    body:string,type:string,url:string
}

export function mockXHR(){
    
    function XHRreq(response:any){
        return function(options:options) {
            // console.log(options);
            
            let result = null       
            if(response instanceof Function){
                let {body,type,url} = options
                result = response({
                    body: JSON.parse(body),
                    method: type,
                    query: param2Obj(url)
                })
            }else{
                result = response
            }
            return result
          }
    }

    let i:any
    for(i of apis){
        Mock.mock(new RegExp(ENV.VITE_BASE_URL + i.url), i.type || 'get', XHRreq(i.response))
    }

}