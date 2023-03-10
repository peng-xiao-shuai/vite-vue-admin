import '@amap/amap-jsapi-types'
declare global {
  interface Window {
    qq: any
  }
  namespace Qq {
    export type LatLng = { lat: string; lng: string }
    export type Location = { address: string } & LatLng
    export type Detail = { location: LatLng; address: string }
  }
  namespace AMap {
    export class PlaceSearch {
      constructor(opts: {
        city?: string //城市
        type?: string //数据类别
        pageSize?: number //每页结果数,默认10
        pageIndex?: number //请求页码，默认1
        extensions?: string //返回信息详略，默认为base（基本信息）
        citylimit?: boolean //是否强制限制在设置的城市内搜索
        map: AMap.Map //展现结果的地图实例
      })

      search: (
        keyword: string,
        callback: (status: string, result: object) => void
      ) => void
    }

    export type GeolocationOptions = Partial<{
      position: string // 悬停位置，默认为"RB"，即右下角
      offset: [number, number] //	缩略图距离悬停位置的像素距离，如 [2,2]
      borderColor: string // 按钮边框颜色值，同CSS，如'silver'
      borderRadius: string // 按钮圆角边框值，同CSS，如'5px'
      buttonSize: string // 箭头按钮的像素尺寸，同CSS，如'12px'
      convert: boolean // 是否将定位结果转换为高德坐标
      enableHighAccuracy: boolean // 进行浏览器原生定位的时候是否尝试获取较高精度，可能影响定位效率，默认为false
      timeout: number // 定位的超时时间，毫秒
      maximumAge: number // 浏览器原生定位的缓存时间，毫秒
      showButton: boolean // 是否显示定位按钮，默认为true
      showCircle: boolean // 是否显示定位精度圆，默认为true
      showMarker: boolean // 是否显示定位点，默认为true
      markerOptions: AMap.MarkerOptions // 定位点的样式
      circleOptions: AMap.CircleOptions // 定位圆的样式
      panToLocation: boolean // 定位成功后是否自动移动到响应位置
      zoomToAccuracy: boolean // 定位成功后是否自动调整级别
      GeoLocationFirst: boolean // 优先使用H5定位，默认移动端为true，PC端为false
      noIpLocate: number // 是否禁用IP精确定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
      noGeoLocation: number // 是否禁用浏览器原生定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
      useNative: boolean // 是否与高德定位SDK能力结合，需要同时使用安卓版高德定位sdk，否则无效
      getCityWhenFail: boolean // 定位失败之后是否返回基本城市定位信息
      needAddress: boolean // 是否需要将定位结果进行逆地理编码操作
      extensions: string // 是否需要详细的逆地理编码信息，默认为'base'只返回基本信息，可选'all'
    }>

    type GeolocationCallBack = (status: string, result: object) => void
    export class Geolocation {
      constructor(opts: GeolocationOptions)

      getCurrentPosition: (callback: GeolocationCallBack) => void
      getCityInfo: (callback: GeolocationCallBack) => void
    }
  }
}
export {}
