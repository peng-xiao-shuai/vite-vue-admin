import { Graph, Shape, Node, Cell, Edge, Model } from "@antv/x6"
import store from "@/store/index"
import { ElMessage } from "element-plus"

// 获取缓存的xy轴
const positions: {[s:string|number]: {x:number, y:number}} = JSON.parse(window.localStorage.getItem('nodesPosition') || "{}")

/**
 * 初始化的graph
 * @param {} container 画布id
 * @param {*} mapContainer 小地图id
 * @returns 
 */
export function u_graph(container: HTMLElement, mapContainer: HTMLElement) {

  return {
    // 滚动
    // scroller: {
    //   enabled: false,
    // },
    // 小地图
    // minimap: {
    //   enabled: true,
    //   container: mapContainer,
    // },
    container: container,
    width: '100%',
    height: 700,
    grid: true,
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      validateMagnet({ e, magnet }: { e: Event, magnet: any }) {
        return magnet.getAttribute('port-group') !== 'in'
      },

      validateConnection({ sourceMagnet, targetMagnet }: { sourceMagnet: any, targetMagnet: any }) {
        // 只能从输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
          return false
        }

        // 只能连接到输入链接桩
        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
          return false
        }

        return true
      },
      validateEdge({ edge }: { edge: Edge }) {
        const target = edge.getTargetNode()
        const source = edge.getSourceNode()

        // 为null 拦截
        if (!source) return

        source.addChild(target)
        // 绑定上级
        return setTimeout(() => {
          ElMessage.success('绑定成功！id为' + target?.id + '名称为' + (target && target.attrs && target.attrs.currentForm.name))
          return true
        })

      },

      connector: {
        name: 'jumpover',
        args: {
          radius: 20,
        },
      },
      router: {
        name: 'er',
        args: {
          direction: 'V',
        },
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#a0a0a0',
              strokeWidth: 1,
              targetMarker: {
                name: 'classic',
                size: 7,
              },
            },
          },
          // connector: 'smooth',
          // tools: {
          //   name: 'button-remove',
          // },
        })
      },
    }
  }
}

// 链接桩
export const groups = {
  in: {
    position: 'top',
    attrs: {
      circle: {
        r: 6,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#fff',
      },
    },
  },
  out: {
    position: 'bottom',
    attrs: {
      circle: {
        r: 6,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#fff',
      },
    },
  },
}

/**
 * 添加Node
 * @param {object} graph 
 * @param {object} currentForm 
 * @param {object} position 
 */

export function addNode(graph: any, currentForm: any) {
  const width = currentForm.name.length * 10 < 80 ? 80 : currentForm.name.length * 10
  const jsonStr = JSON.parse(currentForm.jsonStr)

  const node = graph.addNode({
    id: currentForm.id,
    x: positions && positions[currentForm.id] ? positions[currentForm.id].x : (jsonStr.x || 0),
    y: positions && positions[currentForm.id] ? positions[currentForm.id].y : (jsonStr.y || 0),
    width: width,
    height: 40,
    // 链接桩
    ports: {
      groups,
      items: [
        {
          id: currentForm.id + 'in',
          group: 'in', // 指定分组名称
        },
        {
          id: currentForm.id + 'out',
          group: 'out', // 指定分组名称
        },
      ],
    },
    // tools: [

    // ],
    // 节点样式
    attrs: {
      // 手动挂载
      width,
      currentForm: JSON.parse(JSON.stringify(currentForm)),
      // 是否请求下级
      isAjax: false,
      // 显示还是隐藏
      isHide: true,
      body: {
        rx: 10,
        ry: 10,
        stroke: store.getters.getThemeColor,  // 边框颜色
      },
      label: {
        text: currentForm.name,
        fill: store.getters.getThemeColor,
        fontSize: 16,
        fontWeight: 'bold'
      },
    },
  })

  return node
}

/**
 * 添加Edge
 * @param {object} graph 实例
 * @param {string} sourceId 父节点id
 * @param {string} targetId 子节点id
 */
export function addEdge(graph: Graph, sourceId: string, targetId: string) {

  return graph.addEdge({
    id: sourceId + '-' + targetId,
    source: { cell: sourceId, port: 'out' },  // 源节点和链接桩 ID
    target: { cell: targetId, port: 'in' }, // 目标节点 ID 和链接桩 ID
    router: {
      name: 'metro',
      args: {
        startDirections: ['bottom'],
        endDirections: ['top'],
      },
    },
    attrs: {
      line: {
        stroke: '#a0a0a0',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 7,
        },
      },
    },
  })
}
