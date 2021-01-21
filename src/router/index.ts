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
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../views/404.vue'),
    hidden: true
  }
]

export const addRouter = [
  {
    path: '/admin',
    name: 'admin',
    meta: {
			title: '用户',
			icon: 'ums-admin'
		},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '/@/views/user/user.vue')
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
