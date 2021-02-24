const roles = {
    'admin':[{
        hidden: 0,
        icon: "viteyonghuguanli",
        id: 21,
        level: 0,
        name: "eps",
        parentId: 0,
        sort: 997,
        title: "eps",
    },{
        hidden: 0,
        icon: "viteyonghuguanli",
        id: 22,
        level: 1,
        name: "enterprise",
        parentId: 21,
        sort: 997,
        title: "enterprise",
    },{
        hidden: 0,
        icon: "viteyonghuguanli",
        id: 27,
        level: 1,
        name: "enterpriseAll",
        parentId: 3,
        sort: 997,
        title: "enterpriseAll",
    },{
        hidden: 0,
        icon: "viteyonghuguanli",
        id: 1,
        level: 0,
        name: "users",
        parentId: 0,
        sort: 997,
        title: "用户管理",
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 2,
        level: 1,
        name: "user",
        parentId: 1,
        sort: 9,
        title: "用户列表"
    }
    ,{
        hidden: 0,
        icon: "viteliebiao",
        id: 999,
        level: 1,
        name: "userThree",
        parentId: 1,
        sort: 9,
        title: "用户三级"
    }
    // ,{
    //     hidden: 1,
    //     icon: "viteliebiao",
    //     id: 998,
    //     level: 2,
    //     name: "userThreeTow",
    //     parentId: 2,
    //     sort: 9,
    //     title: "用户三级(2)"
    // }
    ,{
        hidden: 1,
        icon: "viteliebiao",
        id: 3,
        level: 0,
        name: "education",
        parentId: 0,
        sort: 9,
        title: "education"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 12,
        level: 1,
        name: "educationList",
        parentId: 3,
        sort: 9,
        title: "educationList"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 4,
        level: 0,
        name: "gist",
        parentId: 0,
        sort: 9,
        title: "gist"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 10,
        level: 1,
        name: "gistList",
        parentId: 4,
        sort: 9,
        title: "gistList"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 11,
        level: 1,
        name: "gistOrderList",
        parentId: 4,
        sort: 9,
        title: "gistOrderList"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 5,
        level: 0,
        name: "ums",
        parentId: 0,
        sort: 9,
        title: "权限"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 6,
        level: 1,
        name: "admin",
        parentId: 5,
        sort: 10,
        title: "用户列表"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 7,
        level: 1,
        name: "menu",
        parentId: 5,
        sort: 9,
        title: "菜单列表"
    },{
        hidden: 1,
        icon: "viteliebiao",
        id: 8,
        level: 1,
        name: "role",
        parentId: 5,
        sort: 2,
        title: "角色列表"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 9,
        level: 1,
        name: "resource",
        parentId: 5,
        sort: 999,
        title: "资源列表"
    }
    ],
    'ordinary':[{
        hidden: 0,
        icon: "vitedingdan",
        id: 1,
        level: 0,
        name: "oms",
        parentId: 0,
        sort: 0,
        title: "订单"
    }]
}

export default roles