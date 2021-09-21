const header = [
  {
    label: "编号", //显示的标题
    minWidth: "50", //对应列的最小宽度
    sortable: true, //排序
    poprs: [
      {
        popr: "id",
      },
    ],
  },
  {
    label: "提交人", //显示的名称
    poprs: [
      {
        popr: "name",
      },
    ],
  },
  {
    label: "头像", //显示的名称
    poprs: [
      {
        type: "image",
        popr: "head",
        data: {
          preview: true,
          style: { width: "40px", height: "40px", borderRadius: "50%" },
        },
      },
    ],
  },
  {
    label: "性别", //显示的名称
    poprs: [
      {
        popr: "gender",
        filter: [
          { key: 0, value: "男" },
          { key: 1, value: "女" },
        ],
      },
    ],
  },
  {
    label: "提交内容", //显示的名称
    overflowTooltip: true,
    poprs: [
      {
        popr: "content",
      },
    ],
  },
  {
    label: "提交时间", //显示的名称
    overflowTooltip: true,
    poprs: [
      {
        popr: "date",
      },
    ],
  },
  {
    label: "邮箱", //显示的名称
    poprs: [
      {
        popr: "email",
      },
    ],
  },
  {
    label: "提交状态", //显示的名称
    poprs: [
      {
        popr: "status",
        filter: [
          { key: false, value: "失败" },
          { key: true, value: "成功" },
        ],
      },
    ],
  },
  {
    label: "操作", //显示的标题
    minWidth: "120px",
    poprs: [
      {
        type: "btn",
        data: [
          {
            tip: "编辑",
            type: "info",
            icon: "el-icon-edit-outline",
            emit: "update",
          },
          {
            tip: "删除",
            type: "danger",
            icon: "el-icon-delete",
            emit: "remove",
          },
        ],
      },
    ],
  },
];

export { header };
