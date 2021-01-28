import { createRouter, createWebHashHistory } from 'vue-router'

// console.log(router)
import layOut from '/@/views/layout/index.vue'
const routes = [
  {
    path: '/',
    component: layOut,
    redirect: '/home',
    children: [{
			path: 'home',
			name: 'home',
			component: () => import('/@/views/home/index.vue'),
			meta: {
				title: '首页',
				icon: 'home'
			}
		}]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      icon: 'about'
    },
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('/@/views/login/index.vue')
  },
  {
    path: '/about',
	  name: 'about',
    redirect: '/about/abouts',
    component: layOut,
    // meta: {
		// 	title: '关于我们',
		// 	icon: 'ums-admin'
		// },
    children: [{
			path: 'abouts',
			name: 'abouts',
			component: () => import('/@/views/about/abouts/index.vue'),
			meta: {
				title: '关于我们',
				icon: 'about'
			}
		}]
  },
]

export const addRouter = [{
    path: '/c-user',
    component: layOut,
    redirect: '/c-user/user',
    name: 'c-user',
    meta: {
      title: '用户信息',
      icon: 'user'
    },
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('/@/views/c-user/user/index.vue'),
      meta: {
        title: '用户列表',
        icon: 'product-list'
      }
    },{
      path: 'updateUser',
      name: 'updateUser',
      component: () => import('/@/views/c-user/updateUser/index.vue'),
      meta: {
        title: '修改用户',
        icon: 'product-list'
      },
      hidden: true
    },{
      path: 'userRecord',
      name: 'userRecord',
      component: () => import('/@/views/c-user/userRecord/index.vue'),
      meta: {
        title: '查看记录',
        icon: 'product-list'
      },
      hidden: true
    }, {
      path: 'notification',
      name: 'notification',
      component: () => import('/@/views/c-user/notification/index.vue'),
      meta: {
        title: '消息通知',
        icon: 'product-list'
      }
    },{
      path: 'notificationType',
      name: 'notificationType',
      component: () => import('/@/views/c-user/notificationType/index.vue'),
      meta: {
        title: '消息通知类型',
        icon: 'product-list'
      }
    }]
  }, 
 {
    path: '/oms',
    component: layOut,
    redirect: '/oms/user',
    name: 'oms',
    meta: {
      title: '订单管理',
      icon: 'user'
    },
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('/@/views/oms/order/index.vue'),
      meta: {
        title: '订单列表',
        icon: 'product-list'
      }
    }]
  }, 
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../views/404.vue'),
    hidden: true
  }
]

const _router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default _router
