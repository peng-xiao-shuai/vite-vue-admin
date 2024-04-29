import { nextTick, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { isType } from '@/utils/interface'
import { useDestroy } from './useUtils'
import { useRoute } from 'vue-router'
import AMapLoader from '@amap/amap-jsapi-loader'
import { List } from '#/index'
import '#/amap'

export const useQQMap = (
  content = { lat: 39.90923, lng: 116.397428 },
  idName = 'container',
) => {
  const qq = window.qq
  const center = new qq.maps.LatLng(content.lat, content.lng)

  const listener: any[] = []
  const { name } = useRoute()
  const location: Qq.Location = reactive({
    lat: '39.90923',
    lng: '116.397428',
    address: '中国北京市北京市东城区西长安街1号',
  })
  let map: any, marker: any
  nextTick(() => {
    // 获取地图
    map = new qq.maps.Map(document.getElementById(idName), {
      zoom: 8,
      center: center,
    })
    //创建一个Marker
    marker = new qq.maps.Marker({
      //设置Marker的位置坐标
      position: center,
      // //设置Marker被添加到Map上时的动画效果为落下
      // animation: qq.maps.MarkerAnimation.DOWN,
      // //设置Marker被添加到Map上时的动画效果为反复弹跳
      // animation: qq.maps.MarkerAnimation.BOUNCE,
      //设置Marker被添加到Map上时的动画效果为从天而降
      animation: qq.maps.MarkerAnimation.DROP,
      //设置显示Marker的地图
      map: map,
      //设置Marker可拖动
      draggable: true,
      //设置Marker的可见性，为true时可见,false时不可见
      visible: true,
    })

    markerDragend()
  })

  // 拖拽开始 结束
  const markerDragend = () => {
    // 拖拽开始
    listener.push(
      qq.maps.event.addListener(marker, 'dragstart', () => {
        marker.setAnimation(qq.maps.MarkerAnimation.UP)
      }),
    )
    // 拖拽结束
    listener.push(
      qq.maps.event.addListener(
        marker,
        'dragend',
        (e: { latLng: Qq.LatLng }) => {
          //getPosition()  返回Marker的位置
          marker.setAnimation(qq.maps.MarkerAnimation.DOWN)

          geocoderFun(e.latLng)
        },
      ),
    )
  }
  const cb = (detail: Qq.Detail) => {
    map.setCenter(detail.location)
    marker.setPosition(detail.location)
    Object.assign(location, detail.location)
    location.address = detail.address
  }
  /**
   * 地址解析
   * @param {LatLng | string} data  data:string = 地址 data:object = {lat,lng}
   */
  const geocoderFun = (data: Qq.LatLng | string) => {
    //地址和经纬度之间进行转换服务
    const geocoder = new qq.maps.Geocoder({
      complete: function (result: { detail: Qq.Detail }) {
        cb(result.detail)
      },
    })

    if (isType<Qq.LatLng>(data, 'lat')) {
      const coord = new qq.maps.LatLng(data.lat, data.lng)

      geocoder.getAddress(coord)
    } else {
      geocoder.getLocation(data)
    }
  }

  const unmounted = () => {
    // 销毁地图
    typeof map.destroy === 'function' && map.destroy()
    // 移除事件
    listener.forEach((item) => {
      qq.maps.event.removeListener(item)
    })
    listener.splice(0, listener.length)
  }

  // 避免name名称配置错误没有被keep-alive缓存无法进入onDeactivated生命周期时
  useDestroy(name!, unmounted)

  return {
    location,
    geocoderFun,
  }
}

// Polygon静态参数
// https://lbs.amap.com/api/jsapi-v2/documentation#polygon
const PolygonOptions: AMap.PolygonOptions = {
  strokeColor: '#D60000',
  strokeOpacity: 0.6,
  fillOpacity: 0.1,
  fillColor: '#D60000',
  zIndex: 99999,
}
const textStyle: AMap.TextOptions['style'] = {
  background: '#fff',
  'font-size': '20px',
  padding: '5px 10px',
  border: '1px solid #009CED',
}
const geolocationOptions: AMap.GeolocationOptions = {
  enableHighAccuracy: true, //是否使用高精度定位，默认:true
  timeout: 10000, //超过10秒后停止定位，默认：5s
  position: 'RB', //定位按钮的停靠位置
  offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
  zoomToAccuracy: true,
  GeoLocationFirst: false,
}

/**
 *
 * @param {List[]} list
 * @param {Function} errorCallback 错误信息提示
 * @param {Function}successCallback 成功信息提示
 */
export const useAMapFence = (
  list: Ref<List[]>,
  errorCallback: (result: any) => void,
  successCallback: (res: { msg: string; status: string }) => void,
) => {
  const { name } = useRoute()
  let _AMap: typeof AMap | undefined = undefined
  // 实例合集
  const compilations: {
    map: AMap.Map | undefined
    polyEditor: AMap.PolygonEditor | undefined
    mouseTool: AMap.MouseTool | undefined
    placeSearch: AMap.PlaceSearch | undefined
    polygons: AMap.Polygon[]
    texts: AMap.Text[]
  } = {
    // 画布实例
    map: undefined,
    // 多边形修改实例
    polyEditor: undefined,
    // 鼠标绘制实例
    mouseTool: undefined,
    // 搜索实例
    placeSearch: undefined,
    // 多边形实例合集
    polygons: [],
    // 文本实例合集
    texts: [],
  }

  // 默认数据
  const defaultData: List = {
    fenceCode: '',
    fenceName: '',
    fencePath: [],
    id: 0,
  }
  // 是否绘制中
  const isDraw = ref(false)
  // 是否初始化
  const isInit = ref(false)
  // 当前围栏数据
  const currentData: List = reactive({ ...defaultData })

  // 清除
  const clear = () => {
    // 避免点击绘制新电子围栏后列表点击点位未清除
    compilations.polyEditor?.close()
    // 避免绘制中点击列表，绘制中的数据未清除
    compilations.mouseTool?.close(true)
  }

  // 初始化地图
  const initMap = () => {
    return new Promise((resolve, reject) => {
      AMapLoader.load({
        key: 'd44819a368d76ea619971a50854f19b9', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.PolygonEditor',
          'AMap.Geolocation',
          'AMap.Driving',
          'AMap.MouseTool',
          'AMap.Geolocation',
          'AMap.PlaceSearch',
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((amap: typeof AMap) => {
          _AMap = amap
          compilations.map = new amap.Map('map', {
            center: [116.400274, 39.905812],
            zoom: 12,
          })

          // 加载搜索
          searchInit()

          // 给地图实例绑定点击事件 onClick, 无法解决绘制后，点击多边形会冒泡给地图（估计是官方bug）
          // map.on('click', () => {
          //   polyEditor && polyEditor.close()
          // })

          renderData()

          // 鼠标绘制实例
          compilations.mouseTool = new _AMap.MouseTool(compilations.map)

          // 定位
          const geolocation = new _AMap.Geolocation(geolocationOptions)
          compilations.map.addControl(geolocation as any)

          geolocation.getCurrentPosition((status: string, result: object) => {
            if (status == 'complete') {
            } else errorCallback(result)
          })

          // 绘制完成事件
          compilations.mouseTool.on('draw', ({ obj }) => {
            successCallback({
              msg: '电子围栏绘制完成！',
              status: 'success',
            })
            // console.log(obj._opts, '绘制完成,坐标系')
            // 将当前绘制的多边形改为编辑状态
            compilations.polyEditor = new _AMap!.PolygonEditor(
              compilations.map!,
              obj,
            ) // 获取修改多边形实例
            compilations.polyEditor.open() // 修改为编辑状态

            // 设置状态为修改完成，这个状态为true是可以保存
            isDraw.value = true
            // this.$set(this.currentData, 'fencePath', JSON.stringify(obj.getPath()))

            // 绘制完成关闭操作, 设置为true清除绘制, 这里不需要设置为true, 避免清除之后需要重新创建绘制
            compilations.mouseTool?.close(false)
          })

          isInit.value = true
          resolve(_AMap)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * 重新渲染数据
   */
  const renderData = () => {
    unmounted()

    list.value.forEach((item, index) => {
      // 文本实例
      compilations.texts.push(
        new _AMap!.Text({
          // 取电子围栏第一个点位显示文字
          position: item.fencePath[0],
          text: item.fenceName,
          extData: {
            id: item.id,
          },
          style: textStyle,
        }),
      )

      const newPolygon = new _AMap!.Polygon()
      newPolygon.setOptions({
        path: item.fencePath,
        extData: {
          id: item.id,
        },
        ...PolygonOptions,
      })
      // 多边形实例
      compilations.polygons.push(newPolygon),
        compilations.polygons[index].on(
          'click',
          ({ target }: { target: AMap.Polygon }) => {
            if (!isDraw.value) {
              clear()
              compilations.polyEditor = new _AMap!.PolygonEditor(
                compilations.map!,
                target,
              ) // 获取修改多边形实例
              compilations.polyEditor.open() // 修改为编辑状态

              Object.assign(currentData, <List>find(target))
            }
          },
        )
    })

    compilations.map!.add([...compilations.polygons, ...compilations.texts])
  }
  /**
   * 创建绘制
   */
  const createDraw = () => {
    clear()
    Object.assign(currentData, defaultData)
    compilations.mouseTool?.polygon({
      ...PolygonOptions,
    })
  }

  /**
   * 添加
   * @param {number} id
   */
  const pushPolygon = (id: number) => {
    // 读取当前编辑的多边形数据
    const polygon = compilations.polyEditor?.getTarget()

    // 停止编辑
    compilations.polyEditor && compilations.polyEditor.close()
    console.log(id, list.value)

    // 不存在id即是添加
    if (!list.value.some((item) => item.id === id)) {
      // 销毁编辑多边形数据产生的数据
      polygon && polygon.destroy()
      // 以下操作就无需请求接口也可以实现页面数据增加 一下情况下提高页面性能
      // list.push({
      //   fencePath: polygon?.getPath() as AMap.Vector2[],
      //   fenceName: currentData.fenceName,
      //   fenceCode: currentData.fenceCode,
      //   id,
      // })

      const newPolygon = new _AMap!.Polygon()
      newPolygon.setOptions({
        path: polygon?.getPath() as AMap.Vector2[],
        extData: {
          id,
        },
        ...PolygonOptions,
      })
      // 渲染多边形和文本
      compilations.polygons.push(newPolygon)
      compilations.texts.push(
        new _AMap!.Text({
          position: (polygon?.getPath() as AMap.Vector2[])[0],
          text: currentData.fenceName,
          extData: {
            id,
          },
          style: textStyle,
        }),
      )

      compilations.polygons[compilations.polygons.length - 1].on(
        'click',
        ({ target }) => {
          if (!isDraw.value) {
            clear()
            compilations.polyEditor = new _AMap!.PolygonEditor(
              compilations.map!,
              target,
            ) // 获取修改多边形实例
            compilations.polyEditor.open() // 修改为编辑状态
            Object.assign(currentData, find(target))
          }
        },
      )

      compilations.map?.add([
        compilations.polygons[compilations.polygons.length - 1],
        compilations.texts[compilations.texts.length - 1],
      ])
    } else {
      // 修改文本实例内容
      compilations.texts
        .find((item) => item.getExtData().id == currentData.id)
        ?.setText(currentData.fenceName)
      // 修改多边形实例属性
      ;(<List>find(polygon!)).fencePath = polygon?.getPath() as AMap.Vector2[]
      ;(<List>find(polygon!)).fenceName = currentData.fenceName
    }

    // 修改新增都执行
    isDraw.value = false
    // })
  }

  /**
   * 视图转到点击的多边形
   * @param {List} item
   */
  const viewPolygon = (item: List) => {
    console.log(item, 'item')

    clear()

    compilations.map?.setFitView(
      [<AMap.Polygon>find(item.id)],
      false,
      [60, 60, 60, 60],
      16,
    )
  }
  /**
   * 编辑多边形
   * @param {Event} event
   * @param {List} item
   */
  const editPolygon = (event: Event, item: List) => {
    // 阻止冒泡
    event.stopPropagation()
    viewPolygon(item)
    compilations.polyEditor = new _AMap!.PolygonEditor(
      compilations.map!,
      <AMap.Polygon>find(item.id),
    ) // 获取修改多边形实例
    compilations.polyEditor.open() // 修改为编辑状态

    Object.assign(currentData, item)
  }

  /**
   * 删除多边形
   * @param {number} index list 的下标
   */
  const removePolygon = (index: number) => {
    clear()
    // 销毁
    compilations.polygons[index].destroy()
    compilations.texts[index].remove()
    list.value.splice(index, 1)
    compilations.polygons.splice(index, 1)
    compilations.texts.splice(index, 1)
  }
  /**
   * 查询多边形 或者 list中某一项
   * @param {AMap.Polygon | number} target
   * @returns
   */
  const find = (target: AMap.Polygon | number) => {
    if (isType<AMap.Polygon>(target, 'getExtData')) {
      return list.value.find((item) => item.id == target.getExtData().id)
    } else {
      return compilations.polygons.find(
        (item) => item && item.getExtData().id == target,
      )!
    }
  }

  /**
   * 搜索位置
   * @param address 地址
   * @param callback 回调事件
   * https://lbs.amap.com/api/jsapi-v2/documentation#searchcallback
   */
  const findSearch = (
    address: string,
    callback: (status: string, result: object) => void = () => {},
  ) => {
    if (!!compilations.placeSearch) {
      compilations.placeSearch.search(address, callback)
    } else console.error('placeSearch is not undefined')
  }

  /**
   * 获取实例
   * @param {'map' | 'polyEditor' | 'mouseTool' | 'placeSearch' | 'polygons' | 'texts'} variable 变量
   */
  const get = <K extends keyof typeof compilations>(
    variable: K,
  ): (typeof compilations)[K] => {
    return compilations[variable]
  }

  /**
   * 实例化搜索
   */
  const searchInit = () => {
    //构造地点查询类
    compilations.placeSearch = new _AMap!.PlaceSearch({
      pageSize: 5, // 单页显示结果条数
      pageIndex: 1, // 页码
      city: '北京', // 兴趣点城市
      citylimit: false, //是否强制限制在设置的城市内搜索
      map: compilations.map!, // 展现结果的地图实例
    })
  }

  /**
   * 销毁实例
   */
  const unmounted = () => {
    compilations.polygons.forEach((item) => {
      item.destroy()
    })
    compilations.polygons = []
    compilations.texts.forEach((item) => {
      item.destroy()
    })
    compilations.texts = []
  }

  useDestroy(name!, unmounted)

  return {
    isInit,
    isDraw,
    currentData,
    get,
    initMap,
    renderData,
    createDraw,
    viewPolygon,
    pushPolygon,
    editPolygon,
    removePolygon,
    findSearch,
    searchInit,
    unmounted,
  }
}
