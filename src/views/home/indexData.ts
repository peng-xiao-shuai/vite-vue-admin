export let header: any = [
  {
    label: "姓名", //显示的名称
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
      },
    ],
  },
  {
    label: "内容", //显示的名称
    poprs: [
      {
        popr: "content",
      },
    ],
  },
  {
    label: "时间", //显示的名称
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
    label: "状态", //显示的名称
    poprs: [
      {
        popr: "status",
        filter: [
          { key: true, value: "提交成功" },
          { key: false, value: "提交失败" },
        ],
      },
    ],
  },
];
