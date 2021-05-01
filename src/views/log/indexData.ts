const header: any[] = [
  {
    label: '账号名',
    poprs: [{
      popr: 'name'
    }]
  },
  {
    label: '问题信息',
    poprs: [{
      popr: 'info'
    }]
  },
  {
    label: '问题地址',
    poprs: [{
      type: "href",
      popr: "url",
      data: {
        popr: "url",
        style: { fontWeight: "bold" },
      },
    },]
  },
  {
    label: '问题详情',
    poprs: [{
      popr: 'error'
    }]
  },
  {
    label: '问题时间',
    poprs: [{
      popr: 'time'
    }]
  },
  {
    label: '问题类型',
    poprs: [{
      popr: 'type'
    }]
  },
];

export { header };