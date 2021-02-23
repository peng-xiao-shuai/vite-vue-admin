import { createRouter, createWebHashHistory } from 'vue-router'

// console.log(router)
import layOut from '../views/layout/index.vue'
const routes = [
  {
    path: '/',
    component: layOut,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'viteshouye',
      // breadcrumb: true
    },
    children: [{
			path: 'home',
			name: 'home',
			component: () => import('/@/views/home/index.vue'),
			meta: {
				title: '首页',
        icon: 'viteshouye',
			}
		}]
  },
  {
    path: '/redirect',
    name: 'redirect',
    hidden: true,
    component: () => import('/@/views/redirect.vue')
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
    meta: {
			title: '关于我们',
			icon: 'viteguanyuwomen'
		},
    children: [{
			path: 'abouts',
			name: 'abouts',
			component: () => import('/@/views/about/abouts/index.vue'),
			meta: {
				title: '关于我们',
				icon: 'viteguanyuwomen'
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
      title: '用户管理',
      icon: 'viteyonghuguanli'
    },
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('/@/views/c-user/user/index.vue'),
      meta: {
        title: '用户列表',
        icon: 'viteliebiao'
      },
      children: [
      //   {
      //   path: 'userThree',
      //   name: 'userThree',
      //   component: () => import('/@/views/c-user/user/index.vue'),
      //   meta: {
      //     title: '用户三级',
      //     icon: 'viteliebiao'
      //   }
      // },
      {
        path: 'userThreeTow',
        name: 'userThreeTow',
        component: () => import('/@/views/c-user/user/index.vue'),
        meta: {
          title: '用户三级（2）',
          icon: 'viteliebiao'
        }
      }]
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
    redirect: '/oms/order',
    name: 'oms',
    meta: {
      title: '订单管理',
      icon: 'vitedingdan'
    },
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('/@/views/oms/order/index.vue'),
      meta: {
        title: '订单列表',
        icon: 'viteliebiao'
      }
    }]
  }, 
  {
    path: '/ums',
    component: layOut,
    redirect: '/ums/menu',
    name: 'ums',
    meta: {
      title: '权限',
      icon: 'ums'
    },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('/@/views/ums/admin/index.vue'),
        meta: {
          title: '用户列表',
          icon: 'ums-admin'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('/@/views/ums/role/index.vue'),
        meta: {
          title: '角色列表',
          icon: 'ums-role'
        }
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('/@/views/ums/role/allocMenu.vue'),
        meta: {
          title: '分配菜单'
        },
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('/@/views/ums/role/allocResource.vue'),
        meta: {
          title: '分配资源'
        },
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('/@/views/ums/menu/index.vue'),
        meta: {
          title: '菜单列表',
          icon: 'ums-menu'
        }
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('/@/views/ums/resource/index.vue'),
        meta: {
          title: '资源列表',
          icon: 'ums-resource'
        }
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('/@/views/ums/resource/categoryList.vue'),
        meta: {
          title: '资源分类'
        },
        hidden: true
      }
    ]
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
