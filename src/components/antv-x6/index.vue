<template>
  <!-- <el-card class="filter-container" :shadow="defaultData.cardShadow"> -->
  <div style="width: 100%" id="container"></div>

  <el-dialog
    :title="currentForm.value.id ? '修改' : '添加'"
    v-model="isDialog"
    @close="close"
  >
    <el-form
      :model="currentForm.value"
      :rules="rules"
      ref="updateForm"
      label-position="top"
      style="padding: 0 20px 20px"
      class="Dform"
    >
      <el-form-item
        v-if="currentForm.value.parentName"
        label="上级城市名称"
        prop="parentName"
      >
        <el-input
          disabled
          v-model="currentForm.value.parentName"
          placeholder="请输入上级城市名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="城市名称" prop="name">
        <el-input
          v-model="currentForm.value.name"
          placeholder="请输入城市名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- </el-card> -->
</template>

<script>
import { defineComponent, ref, nextTick, inject, reactive } from "vue"
import { Graph } from "@antv/x6"
import {
  AntvX6
} from '@/api/other'
// import "@antv/x6-vue-shape"
import { u_graph, addNode, addEdge } from './uiils'
let nodeId = 13
export default defineComponent({
  props: {
    arrs: {
      type: Object,
      default: () => { }
    }
  },
  setup (props) {
    const isDialog = ref(false)
    let message = inject("$message")
    // x6 实例
    let graph = null
    // 节点实例 节点点击时需要
    let currentCell = null

    const nodesPosition = {}

    let updateForm = ref(null)
    let currentForm = reactive({
      value: {
        name: '',
        parentId: 0,
        jsonStr: JSON.stringify({ x: 0, y: 0 })
      }
    })


    // 获取数据
    const getlist = (parentId = 0, _cell) => {
      AntvX6({ parentId })
        .then(res => {
          res.data.forEach((item) => {
            const node = addNode(graph, item)

            // parentId != 0 添加链接桩
            if (parentId != 0) {
              // 添加为子节点
              _cell.addChild(node)
              // 添加边
              addEdge(graph, parentId, item.id)

              _cell.setAttrs({ isAjax: true })
            }
          })
        })
    }

    nextTick(() => {
      graph = new Graph(u_graph(document.getElementById("container")))
      // console.log(graph)
      getlist()
      // 悬浮显示删除线
      graph.on('edge:mouseenter', ({ edge }) => {
        edge.addTools([
          'source-arrowhead',
          'target-arrowhead',
          {
            name: 'button-remove',
            args: {
              distance: -30,
            },
          },
        ])
      })
      graph.on('edge:mouseleave', ({ edge }) => {
        edge.removeTools()
      })
      // 删除
      graph.on('edge:removed', ({ edge, options }) => {
        console.log(options.ui)
        if (options.ui) {
          message.success('删除连接线！id为' + edge.id)
          return
        }
      })

      // 空白点击
      graph.on('blank:click', ({ x, y }) => {
        // 添加一级城市 无上级id
        isDialog.value = true

        currentForm.value.jsonStr = JSON.stringify({ x, y })
      })

      // 节点点击
      graph.on('node:click', ({ cell }) => {
        Object.assign(currentForm.value, cell.attrs.currentForm || {})
        currentCell = cell
        isDialog.value = true
      })

      // 鼠标 Hover 时添加按钮
      graph.on('node:mouseenter', ({ node }) => {
        node.addTools([
          {
            name: 'boundary',
            args: {
              attrs: {
                fill: '#7c68fc',
                stroke: '#333',
                'stroke-width': 1,
                'fill-opacity': 0.2,
              },
            },
          },
          // 减
          {
            name: 'button',
            args: {
              x: 2,
              y: 7,
              markup: [
                {
                  tagName: 'circle',
                  selector: 'button',
                  attrs: {
                    r: 10,
                    stroke: '#ccc',
                    strokeWidth: 1,
                    fill: 'white',
                    cursor: 'pointer',
                  },
                },
                {
                  tagName: 'rect',
                  selector: 'icon',
                  attrs: {
                    y: -1,
                    x: -5,
                    width: 10,
                    height: 2,
                    fill: '#999',
                    fontSize: 20,
                    fontWeight: 'bold',
                  },
                },
              ],
              onClick ({ cell }) {
                console.log(cell)
                if (!cell.attrs.isAjax) {
                  getlist(cell.id, cell)
                } else {
                  cell.children.forEach((item) => {
                    if (cell.attrs.isHide) {
                      item.hide()
                    } else {
                      item.show()
                    }
                  })

                  cell.setAttrs({ isHide: !cell.attrs.isHide })
                }
              },
            },
          },
          // 加
          // {
          //   name: 'button',
          //   args: {
          //     x: 2,
          //     y: 40,
          //     markup: [
          //       {
          //         tagName: 'circle',
          //         selector: 'button',
          //         attrs: {
          //           r: 10,
          //           stroke: '#ccc',
          //           strokeWidth: 1,
          //           fill: 'white',
          //           cursor: 'pointer',
          //         },
          //       },
          //       {
          //         tagName: 'text',
          //         textContent: '+',
          //         selector: 'icon',
          //         attrs: {
          //           width: 10,
          //           height: 2,
          //           fill: '#999',
          //           fontSize: 20,
          //           fontWeight: 'bold',
          //           textAnchor: 'middle',
          //           pointerEvents: 'none',
          //           y: '0.3em'
          //         },
          //       },
          //     ],
          //     onClick ({ cell }) {
          //       // 添加子集
          //       isDialog.value = true
          //       position = cell.attrs.position

          //       currentForm.value.parentId = cell.attrs.currentForm.id
          //       currentForm.value.parentName = cell.attrs.currentForm.name
          //     },
          //   },
          // },
          // 删除
          {
            name: 'button-remove',
            args: {
              x: 0,
              y: 0,
              offset: { x: node.attrs.width, y: 10 },
              onClick () {
                setTimeout(() => {
                  message.success('删除成功！')
                  graph.removeNode(node.id)
                }, 200)
              },
            },
          }])
      })

      // 鼠标移开时删除按钮
      graph.on('node:mouseleave', ({ node }) => {
        node.removeTools()
      })

      // 鼠标抬起
      graph.on('node:mouseup', ({ node }) => {
        nodesPosition[node.id] = node.position()

        // 存储用户 移动位置
        window.localStorage.setItem('nodesPosition', JSON.stringify(Object.assign(JSON.parse(window.localStorage.getItem('nodesPosition')) || {}, nodesPosition)))
      })
    })

    // 关闭回调
    const close = (status) => {

      if (status === 'add') {
        // console.log(graph, Node, Cell)
        // 添加节点
        addNode(graph, currentForm.value)
      } else if (status === 'update') {
        // 修改名称
        currentCell.setAttrs({ label: { text: currentForm.value.name } })
      }

      // 还原
      setTimeout(() => {
        currentForm.value = reactive({
          name: '',
          parentId: 0,
          jsonStr: JSON.stringify({ x: 0, y: 0 })
        })
      }, 100)
    }

    const onSubmit = () => {
      updateForm.value.validate((valid) => {
        if (valid) {
          if (currentForm.value.id) {
            setTimeout(() => {
              message.success("修改成功")
              close('update')
            }, 200)

          } else {
            setTimeout(() => {
              ++nodeId
              message.success("添加成功")
              // id 需要后端添加成功后返回
              currentForm.value.id = nodeId
              close('add')
            }, 200)
          }

          // 刷新父组件
          setTimeout(() => {
            isDialog.value = false
          }, 200)
        } else {
          // message.error("验证失败");
          return false
        }
      })
    }

    return {
      isDialog,
      updateForm,
      currentForm,
      close,
      // saveNodesPosition,
      rules: {
        categoryTypeId: [{
          required: true, message: '请选择城市类型', trigger: 'change'
        }],
        name: [{
          required: true, message: '请选择城市名称', trigger: 'change'
        }]
      },

      onSubmit
    }

  },
});
</script>

<style lang="scss" scoped>
</style>