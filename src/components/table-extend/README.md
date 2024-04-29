<!--
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 09:40:51
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-21 11:54:05
 * @Description:
-->

## 导出组件

> 基于表格组件的 `header` 数据进行渲染

| 属性名         | 说明                                                                                     | TS 类型                                   | 默认值              |
| -------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------- |
| `title`        | 导出 `excel` 文件名称                                                                    | `string`                                  | `router.meta.title` |
| `refName`      | `PowerfulTable` 组件 `ref` 名称                                                          | `string`                                  | `'PTable'`          |
| `beforeExport` | 导出全部时，如果 `PowerfulTable` 组件 `props.listRequest.listApi` 属性为空，才需要此属性 | ^[function]`((row: Row) => void) => void` | -                   |

### 示例一

```html
<template>
  <export-excel :before-export="beforeExport" />
  <powerful-table ref="PTable" :list="lists" :header="headers" />
</template>

<script lang="ts" setup>
  import { PowerfulTable } from 'el-plus-powerful-table-ts/es'
  import { useBasicTableData } from './index'
  const PTable = ref(null)

  const { headers, lists } = useBasicTableData()

  const beforeExport = (cb: (row: any) => void) => {
    // 传递 lists
    cb(lists)
  }
</script>
```

### 示例二

```html
<template>
  <export-excel />
  <powerful-table
    ref="PTable"
    :listRequest="{
    listApi: requestListApi
  }"
    :header="headers"
  />
</template>

<script lang="ts" setup>
  import { useBasicTableData } from './index'
  import { requestListApi } from '@/api/xxx'
  const PTable = ref(null)

  const { headers } = useBasicTableData()
</script>
```

## 注意事项

- 在 `PowerfulTable` 组件 `header` 中如果使用 `render` 必须返回 `string` 或者 `number`

```js
const headers = [{
  label: '名称', //显示的名称
  props: [
    {
      text: '品牌：',
      prop: 'brand',
      // 这里不能返回 VNode
      render: (h, row) => `${row.brand}（${{ Audi: '奥迪', BMW: '宝马' }[row.brand!]})`
    },
  ],
}]
```

- 导出的表格表头值为 `label` 或者 `text`，`text` 不存在时使用 `label`, `label` 必须存在
- - 如果 `props` 为数组则会格外拆出列，下面数组会导出 `2` 列，虽然 `headers` 长度是 `1` 但是 `props` 长度是 `2`

```js
const headers = [
  {
    label: '名称', //显示的名称
    props: [
      {
        text: '品牌：',
        prop: 'brand',
      },
      {
        text: '品牌1：',
        prop: 'brand1',
      },
    ],
  },
]
```

- 导出的表格单元格值由 `export-excel` 组件 `cellContent` 函数实现
- - `render > filters > prop`

```js
const headers = [
  {
    label: '名称', //显示的名称
    props: {
      text: '品牌：',
      prop: 'brand',
      render: () => 1,

      filters: [
        { key: 0, value: '否' },
        { key: 1, value: '是' },
      ],
      // or
      filters: (row) => row.brand,
    },
  },
]
```
