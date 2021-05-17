export let header: any = [
  {
    label: "姓名", //显示的名称
    props: [
      {
        prop: "name",
      },
    ],
  },
  {
    label: "头像", //显示的名称
    props: [
      {
        type: "image",
        prop: "head",
        data: {
          preview: true,
          style: { width: "40px", height: "40px", borderRadius: "50%" },
        },
      },
    ],
  },
  {
    label: "性别", //显示的名称
    props: [
      {
        prop: "gender",
      },
    ],
  },
  {
    label: "内容", //显示的名称
    props: [
      {
        prop: "content",
      },
    ],
  },
  {
    label: "时间", //显示的名称
    props: [
      {
        prop: "date",
      },
    ],
  },
  {
    label: "邮箱", //显示的名称
    props: [
      {
        prop: "email",
      },
    ],
  },
  {
    label: "状态", //显示的名称
    props: [
      {
        prop: "status",
        filter: [
          { key: true, value: "提交成功" },
          { key: false, value: "提交失败" },
        ],
      },
    ],
  },
];
