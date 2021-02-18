import axios from 'axios';

import store from '../store/index';

import { ElMessage } from 'element-plus';

const ENV = import.meta.env

console.log(ENV);

const service = axios.create({
    baseURL: ENV.VITE_BASE_URL,
    timeout: ENV.VITE_TIMEOUT
})

service.defaults.headers['content-type'] = 'application/json'

service.interceptors.request.use(config=> {

    // 在发送请求之前做些什么
    if(store.getters.getToken){
        config.headers['Authorization'] = store.getters.getToken
    }
    
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(response =>{
    // 对响应数据做点什么
    let code
    if(ENV.VITE_MOCK){ 
        console.log(response);
        
        code = JSON.parse(response.request.response).code
    }else{
        code = response.data.code
    }
    
    switch(code){
        case 502:
            ElMessage({message:response.data.message,type:'warning'})
            break;
        case 401:
            ElMessage({message:response.data.message,type:'error'})

            store.dispatch('outLoing')
            // .then((res) => {
            //     router.push('/login')
            // }).catch((err) => {
                
            // });
            break;
        case 500:
            ElMessage({message:'服务器打瞌睡了！',type:'error'})
            break;
        case 400:
            ElMessage({message:'参数错误！',type:'error'})
            break;
        case 405:
            ElMessage({message:'请检查你的请求类型！',type:'error'})
            break;
        case 200:
        
            if(ENV.VITE_MOCK){ 
                return response.data
            }

            if(response.headers['content-type'] && response.headers['content-type'].indexOf('application/json') != -1){
                return response.data
            }else{
                return response
            }

            break;
        default:
            ElMessage({message:response.data.message,type:'error'})
            console.error(response.data.code,)
            break;
    }
}, 
error=> {
// 对响应错误做点什么
    
    return Promise.reject(error);
});

export default service