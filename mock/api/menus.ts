const roles = {
    'admin':[{
        hidden: 0,
        icon: "vitedingdan",
        id: 1,
        level: 0,
        name: "oms",
        parentId: 0,
        sort: 0,
        title: "订单"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 8,
        level: 1,
        name: "order",
        parentId: 1,
        sort: 0,
        title: "订单列表"
    },{
        hidden: 0,
        icon: "viteyonghuguanli",
        id: 4,
        level: 0,
        name: "c-user",
        parentId: 0,
        sort: 997,
        title: "用户管理",
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 2,
        level: 1,
        name: "user",
        parentId: 4,
        sort: 9,
        title: "用户列表"
    },{
        hidden: 0,
        icon: "viteliebiao",
        id: 3,
        level: 1,
        name: "notificationType",
        parentId: 4,
        sort: 0,
        title: "消息通知类型"
    }],
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