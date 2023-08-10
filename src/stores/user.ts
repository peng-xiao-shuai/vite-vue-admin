import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { getUser, login } from '@/api/logins'
import router, { addRouter, Routers } from '@/router/index'
import { reactive, ref } from 'vue'
import { RouteRecordName } from 'vue-router'
import { tokenValue } from 'mock/data/list'

// 后端接口返回的路由表数据
type rolesValueItemType = {
  hidden: number
  icon?: string
  id: number
  level: number
  name: string
  parentId: number
  sort?: number
  title?: string
}
// 后端接口返回的用户数据
export type UserInfo = {
  icon: string
  id: number
  roles: string[]
  username: string
}
export type Tags = {
  path: string
  name?: RouteRecordName | null
  meta?: {
    title: string
    icon?: string
    locale?: string
    breadcrumb?: boolean
    url?: string
    iframeUrl?: string
    iframeData?: any
  }
  remove?: boolean
  query?: {}
  params?: {}
}

const defaultUserInfo: UserInfo = {
  icon: '',
  id: 0,
  roles: [],
  username: '',
}

export const useUserStore = defineStore('user', () => {
  const vToken = ref(Cookies.get('vToken'))
  const userInfo = reactive({ ...defaultUserInfo })
  const menus = ref<Routers[]>([])
  const tags = ref<Tags[]>([
    {
      path: '/',
      name: 'home',
      meta: {
        locale: 'home',
        title: '首页',
      },
      remove: true,
    },
  ])

  type User = { username: string; password: string }
  /**
   * 登录
   * @param {User} user 用户信息
   */
  const loginRequest = (user: User) => {
    return new Promise<RequestRes<{ tokenHead: string; token: string }>>(
      (resolve, reject) => {
        login<RequestRes<{ tokenHead: string; token: string }>>(user)
          .then((res: any) => {
            vToken.value = res.data.data.tokenHead + res.data.data.token
            Cookies.set('vToken', res.data.data.tokenHead + res.data.data.token)
            router.push({ path: '/' })
            resolve(res.data)
          })
          .catch((err: { data: string }) => {
            reject(err.data)
          })
      }
    )
  }

  /**
   * 获取用户信息
   */
  const userInfoRequest = () => {
    return new Promise<typeof menus.value>((resolve, reject) => {
      getUser<RequestRes<tokenValue>>({ token: vToken.value })
        .then((res) => {
          // 清空菜单
          menus.value = []

          Object.assign(userInfo, res.data.data)
          menusFilter(res.data.data.menus)
          resolve(menus.value)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * 登出
   */
  const outLogin = () => {
    vToken.value = ''
    Object.assign(userInfo, defaultUserInfo)
    menus.value = []
    router.push('/login')
    Cookies.remove('vToken')
  }

  type Tag = {
    to?: Tags
    removeIndex?: number[]
    name?: string
  }
  /**
   * 标签数据操作
   * @param {Tag} tag
   */
  const tagsOperate = (tag: Tag) => {
    if (tag.removeIndex !== undefined || tag.name !== undefined) {
      if (tag.name) {
        const names = [tag.name, 'home']
        console.log(names)
        tags.value = tags.value.filter(
          (item) => names.indexOf(item.name as string) !== -1
        )
        return
      }

      tag.removeIndex &&
        tags.value.splice(tag.removeIndex[0], tag.removeIndex[1])
    } else {
      try {
        tags.value.push(tag.to!)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return {
    vToken,
    userInfo,
    menus,
    tags,
    loginRequest,
    userInfoRequest,
    outLogin,
    tagsOperate,
  }
})

/**
 * 筛选该账号可展示路由
 * @param {rolesValueItemType[]} menus 所有路由信息
 */
function menusFilter(menus: rolesValueItemType[]) {
  const userStore = useUserStore()
  // return new Promise((resovle,reject)=>{
  // 所有一级
  const levelOne: rolesValueItemType[] = []
  // 所有子集
  const childs: rolesValueItemType[] = []

  menus?.forEach((item: rolesValueItemType) => {
    if (item.level === 0) {
      levelOne.push(item)
    } else {
      childs.push(item)
    }
  })

  const asyncRoute = addRouter
    .filter((item) => addRouterFun(levelOne, item))
    .map((item) => {
      const each = addRouterFun(levelOne, item)
      // console.log('一级菜单',each.children)
      // 进行深拷贝 以免破坏源数据
      const { ...eachCopy } = each
      eachCopy.children = recursion(eachCopy, childs)

      // 删除子集
      eachCopy.children.length == 0 && delete eachCopy.children
      // console.log('%c 完整一级路由','color:blue;',each);
      // console.log('%c --------------------------------------','color:blue;font-seze:26px');
      return eachCopy
    })

  _sort(asyncRoute)

  asyncRoute.map((item) => router.addRoute(item))

  // console.log('排序好的一级',asyncRoute);
  ;(router.options.routes as Routers[])
    .concat(asyncRoute)
    .forEach((item) => userStore.menus.push(item))
}

/**
 * 排序
 * @param {Routers[]} arr 所有路由
 */
function _sort(arr: Routers[]) {
  arr.sort((a: Routers, b: Routers) => {
    return (b as { sort: number }).sort - (a as { sort: number }).sort
  })
}

/**
 * 格式数据
 * @param {rolesValueItemType[]} router 表配置的路由（router.ts 中配置的动态路由）
 * @param {Routers} item 当前路由
 */
function addRouterFun(
  router: rolesValueItemType[],
  item: Routers
): Routers | undefined {
  let each: rolesValueItemType

  for (each of router) {
    if (item.hidden) {
      item.sort = 0
      return item
    }

    if (item.name == each.name && each.hidden == 1) {
      item.meta.id = each.id
      if (each.title) {
        item.meta.title = each.title
      }
      if (each.icon) {
        item.meta.icon = each.icon
      }

      item.sort = each.sort
      return item
    }
  }
}

/**
 * 递归菜单 查询子集
 * @param {Routers} each 当前菜单
 * @param {rolesValueItemType[]} childs 当前菜单下子集
 */
function recursion(each: Routers, childs: rolesValueItemType[]) {
  // 所有子集
  let ids: rolesValueItemType[] = []
  if (!each.children) {
    return []
    // console.log('不进入递归',each);
  } else {
    // console.log('进入递归',each);
    if (each.meta && each.meta.id) {
      ids = childs.filter((c) => each.meta.id == c.parentId)
      // console.log('接口返回的一级菜单子集',ids);
    }

    if (ids.length > 0) {
      const children: Routers[] = []
      for (const childrenItem of each.children) {
        const arr = addRouterFun(ids, childrenItem as Routers)
        if (arr) {
          children.push(arr)
          recursion(arr, childs)
        }
      }
      _sort(children)
      // console.log('将添加到一级路由下的子集',children);
      return children
    } else {
      // 没有则删除
      return []
    }
  }
}
