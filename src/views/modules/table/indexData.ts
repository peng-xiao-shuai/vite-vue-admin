import store from "@/store";
import defaultData from '@/config/default-data'

const header = [
  {
    label: "编号", //显示的标题
    minWidth: "60", //对应列的最小宽度
    sortable: true, //排序
    props: [
      {
        prop: "id",
      },
    ],
  },
  {
    label: "书名", //显示的名称
    props: [
      {
        type: "href",
        prop: "href",
        data: {
          prop: "name",
          style: { fontWeight: "bold" },
        },
      },
      {
        text: "热度：",
        type: "iconfont",
        prop: "iconfont",
        data: {
          class: [defaultData.iconfont],
          style: { color: "red" },
        },
      },
    ],
  },
  {
    label: "封面", //显示的名称
    width: "120",
    props: [
      {
        type: "image",
        prop: "image",
        data: {
          preview: true,
          style: { width: "40px", height: "60px", borderRadius: "5px" },
        },
      },
    ],
  },
  {
    label: "类型", //显示的名称
    width: "100",
    props: [
      {
        prop: "types",
        filter: [
          { key: 0, value: "玄幻" },
          { key: 1, value: "都市" },
          { key: 2, value: "真实" },
        ],
      },
    ],
  },
  {
    label: "内容", //显示的名称
    // overflowTooltip: true,
    width: "150",
    props: [
      {
        prop: "text",
        develop: true,
        line: 3
      },
    ],
  },
  {
    label: "评分", //显示的名称
    width: "150",
    props: [
      {
        prop: "rate",
        type: "rate",
        data: {
          colors: [
            store.getters.getThemeColor,
            store.getters.getThemeColor,
            store.getters.getThemeColor,
          ],
          max: 5,
          allowHalf: true,
        },
      },
    ],
  },
  {
    label: "推荐", //显示的名称
    width: "100",
    props: [
      {
        prop: "recommend",
        type: "switch",
        data: {
          activeColor: store.getters.getThemeColor,
        },
      },
    ],
  },
  {
    label: "价格", //显示的名称
    width: "120",
    props: [
      {
        text: "原价：",
        prop: "oldPrice",
      },
      {
        prop: "price",
        type: "input",
        data: {
          placeholder: "请输入现价",
        },
      },
    ],
  },
  {
    label: "更新时间（远程搜索）", //显示的名称
    sortable: "custom",
    props: [
      {
        prop: "date",
      },
    ],
  },
  {
    label: "操作", //显示的标题
    minWidth: "180px",
    fixed: 'right',
    props: [
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
