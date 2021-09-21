const header = [
  {
    label: '账号名',
    props: [{
      prop: 'name'
    }]
  },
  {
    label: '问题信息',
    props: [{
      prop: 'info'
    }]
  },
  {
    label: '问题地址',
    props: [{
      type: "href",
      prop: "url",
      data: {
        prop: "url",
        style: { fontWeight: "bold" },
      },
    },]
  },
  {
    label: '问题详情',
    props: [{
      prop: 'error'
    }]
  },
  {
    label: '问题时间',
    props: [{
      prop: 'time'
    }]
  },
  {
    label: '问题类型',
    props: [{
      prop: 'type'
    }]
  },
];

export { header };