import axios from 'axios';

import store from '../store/index';

const ENV =  import.meta.env

console.log(ENV);

const service = axios.create({
    baseURL: ENV.VITE_BASE_URL,
    timeout: ENV.VITE_TIMEOUT
})

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
    let code = response.data.code
    
    switch(code){
        case 502:
            console.error(response.data.code,response.data.message)
            break;
        case 401:
            console.error(response.data.code,response.data.message)

            store.dispatch('outLoing')
            // .then((res) => {
            //     router.push('/login')
            // }).catch((err) => {
                
            // });
            break;
        case 500:
            console.error(response.data.code,'服务器打瞌睡了')
            break;
        case 400:
            console.error(response.data.code,response.data.message)
            break;
        case 405:
            console.error(response.data.code,'请检查你的请求类型')
            break;
        case 200:
            if(response.headers['content-type'].indexOf('application/json') != -1){
                return response.data
            }else{
                return response
            }

            break;
        default:
            console.error(response.data.code,response.data.message)
            break;
    }
}, 
error=> {
// 对响应错误做点什么
    return Promise.reject(error);
});

export default service