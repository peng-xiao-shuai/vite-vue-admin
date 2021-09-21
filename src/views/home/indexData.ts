export let header = [
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
    width: '80px',
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
    width: '60px',
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
  // {
  //   label: "邮箱", //显示的名称
  //   props: [
  //     {
  //       prop: "email",
  //     },
  //   ],
  // },
  {
    label: "状态", //显示的名称
    props: [
      {
        prop: "status",
        type: 'tag',
        data:{
          // type: 'primary',
          effect: 'dark',
          color:(tag:string)=>{
            return tag == '提交失败' ? '#F56C6C' : '#67C23A'
          }
        },
      },
    ],
  },
];
