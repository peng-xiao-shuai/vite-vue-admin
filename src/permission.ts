import router from './router/index'
import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {

  console.log(store.getters.getToken);

  if(store.getters.getToken){
    next()
  }else{
    if(to.path === '/login'){
      next()
    }else{
      next({ path: '/login'})
    }
  }
})

router.afterEach(() => {
  console.log();
  // NProgress.done() // 结束Progress
})
