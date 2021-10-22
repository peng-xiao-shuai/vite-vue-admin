const tableData1 = [
  {
    date: '2016-05-03',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: '汤姆',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const tableData2 = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    money: '999',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    money: '999',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    money: '999',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    money: '999',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    money: '999',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    money: '999',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    money: '999',
    zip: 'CA 90036',
  },
]

let header = [
  {
    label: "参数", //显示的名称
    width: '200px',
    headerAlign: 'left',
    props: [
      {
        prop: "property",
      },
    ],
  },
  {
    label: "说明", //显示的标题
    // overflowTooltip: true,
    props: [
      {
        prop: "description",
        // type: 'text',
        // data: {
        //   develop: true,
        //   line: 1
        // }
      },
    ],
  },
  {
    label: "类型", //显示的名称
    width: '200px',
    props: [
      {
        prop: "type",
      },
    ],
  },
  {
    label: "可选值", //显示的名称
    width: '200px',
    props: [
      {
        prop: "optionalVal",
      },
    ],
  },
  {
    label: "默认值", //显示的名称
    width: '200px',
    props: [
      {
        prop: "defaultVal",
      },
    ],
  },
]

let lists = [
  {
    id: 1,
    property: "exportData",
    description: '导出数据参数',
    type: "Array",
    optionalVal: "-",
    defaultVal: "-",
    children: [{
      id: 3,
      property: "header",
      description: '表头数据',
      type: "Array",
      optionalVal: "-",
      defaultVal: "-",
    }, {
      id: 4,
      property: "prop",
      description: '字段名称数据',
      type: "Array",
      optionalVal: "-",
      defaultVal: "-",
    }, {
      id: 5,
      property: "list",
      description: '表格显示的数据',
      type: "Array",
      optionalVal: "-",
      defaultVal: "-",
    }, {
      id: 6,
      property: "multiHeader",
      description: '表格标题，表格上方显示的数据',
      type: "Array",
      optionalVal: "-",
      defaultVal: "-",
    }, {
      id: 7,
      property: "sheetName",
      description: '文档下方工作表页签名称',
      type: "String",
      optionalVal: "-",
      defaultVal: "sheet1",
    }, {
      id: 8,
      property: "merges",
      description: '需要合并的单元格数据，该属性与“multiHeader”配合使用，一个标题对应一个合并项数据',
      type: "Array",
      optionalVal: "-",
      defaultVal: "当只有一个标题时，默认合并第一行所有列",
    }, {
      id: 9,
      property: "border",
      description: '是否需要给每个单元格显示黑色边框，设置后优先级最高',
      type: "Boolean",
      optionalVal: "true，false",
      defaultVal: "-",
    }, {
      id: 10,
      property: "autoWidth",
      description: '是否需要自适应文档每列宽度，设置后优先级最高',
      type: "Boolean",
      optionalVal: "true，false",
      defaultVal: "-",
    }, {
      id: 11,
      property: "align",
      description: '单元格对齐方式，设置后优先级最高',
      type: "String",
      optionalVal: "center，left，right",
      defaultVal: "-",
    }, {
      id: 12,
      property: "stripe",
      description: '是否需要斑马纹，设置后优先级最高',
      type: "Boolean",
      optionalVal: "true，false",
      defaultVal: "-",
    }, {
      id: 13,
      property: "showSummary",
      description: '是否在最后一行开启合计功能',
      type: "Boolean",
      optionalVal: "true，false",
      defaultVal: "false",
    }, {
      id: 14,
      property: "summaryList",
      description: '合计数据',
      type: "Array",
      optionalVal: "-",
      defaultVal: "-",
    }]
  },
  {
    id: 2,
    property: "configData",
    description: '导出配置参数',
    type: "Object",
    optionalVal: "-",
    defaultVal: "-",
    children: [{
      id: 8,
      property: "fileName",
      description: '文档名称',
      type: "string | number",
      optionalVal: "-",
      defaultVal: "导出(XX条数据)",
    }, {
      id: 15,
      property: "border",
      description: '是否需要给每个单元格显示黑色边框，优先级低于exportData中的border',
      type: "Boolean",
      optionalVal: "true，false",
      defaultVal: "true",
    }, {
      id: 16,
      property: "autoWidth",
      description: '是否需要自适应文档每列宽度，优先级低于exportData中的autoWidth',
      type: "Boolean",
      optionalVal: "true，false",
      defaultVal: "true",
    }, {
      id: 17,
      property: "align",
      description: '单元格对齐方式，优先级低于exportData中的align',
      type: "String",
      optionalVal: "center，left，right",
      defaultVal: "center",
    }, {
      id: 18,
      property: "stripe",
      description: '是否需要斑马纹，优先级低于exportData中的stripe',
      type: "Boolean",
      optionalVal: "true，false",
      defaultVal: "false",
    }]
  },
]

export { tableData1, tableData2, header, lists };