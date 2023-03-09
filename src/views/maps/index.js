// Polygon静态参数
// https://lbs.amap.com/api/jsapi-v2/documentation#polygon
export const PolygonOptions = {
  strokeColor: '#D60000',
  strokeOpacity: 0.6,
  fillOpacity: 0.1,
  fillColor: '#D60000',
  zIndex: 99999,
}

export const textStyle = {
  background: '#fff',
  'font-size': '20px',
  padding: '5px 10px',
  border: '1px solid #009CED',
}

export const geolocationOptions = {
  enableHighAccuracy: true, //是否使用高精度定位，默认:true
  timeout: 10000, //超过10秒后停止定位，默认：5s
  position: 'RB', //定位按钮的停靠位置
  offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
  zoomToAccuracy: true,
  GeoLocationFirst: false,
}
