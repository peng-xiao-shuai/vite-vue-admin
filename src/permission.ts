import router from './router/index'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

const notRedirect = ['/login'] // 不重定向白名单

router.beforeEach((to:any, from:any, next:any) => {
  NProgress.start()
  // 1 判断是否有token
    // 1.1 判断是否有menus(动态路由。页面刷新后vuex会重置)
      // 1.1.1 重新获取动态路由表
      // 1.1.2 直接跳转 next()

    // 1.2 判断是否在重定向的白名单
      // 1.2.1 重定向到登录页
      // 1.2.2 留在当前页

  if(store.getters.getToken){
    if(store.getters.getMenus.length == 0){
      
      store.dispatch('userInfo')
      .then((res:any) => {
        next({ ...to, replace: true })
        NProgress.done()
      })
    }else{
      next()
      NProgress.done()
    }
  }else{
    if(notRedirect.indexOf(to.path) != -1){
      next()
      NProgress.done()

    }else{
      next('/login')
      NProgress.done()
    }
    
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
