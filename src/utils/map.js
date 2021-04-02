//创建一个Marker
export function markerFun (content, map) {
  var marker = new qq.maps.Marker({
    //设置Marker的位置坐标
    position: content,
    //设置Marker被添加到Map上时的动画效果为落下
    animation: qq.maps.MarkerAnimation.DOWN,
    //设置Marker被添加到Map上时的动画效果为反复弹跳
    animation: qq.maps.MarkerAnimation.BOUNCE,
    //设置Marker被添加到Map上时的动画效果为从天而降
    animation: qq.maps.MarkerAnimation.DROP,
    //设置显示Marker的地图
    map: map,
    //设置Marker可拖动
    draggable: true,
    //设置Marker的可见性，为true时可见,false时不可见
    visible: true,
  })
  return marker
}

// 拖到开始 结束
export function markerDragend (marker) {
  qq.maps.event.addListener(marker, "dragstart", function (e) {
    //getPosition()  返回Marker的位置
    marker.setAnimation(qq.maps.MarkerAnimation.UP)
    // console.log(marker.getPosition())
  })
  //   qq.maps.event.addListener(marker, "dragend", function (e) {
  //     //getPosition()  返回Marker的位置
  //     marker.setAnimation(qq.maps.MarkerAnimation.DOWN)
  //   // console.log(marker.getPosition())
  // })
}
/**
 * 地址解析
 * @type true = 经纬度转地址 false = 地址转经纬度
 * @param {object|string} data  data:string = 地址 data:object = {lat,lng}
 * @param {object} marker markerFun方法返回的实例
 * @param {object} map 地图实例
 */
export function GeocoderFun (type, data, marker, map) {
  //地址和经纬度之间进行转换服务
  var geocoder = new qq.maps.Geocoder()

  return new Promise((resolve) => {
    if (type) {
      var latLng = new qq.maps.LatLng(data.lat, data.lng)
      geocoder.setComplete(result => {
        console.log(result)
        resolve(result)
        map.setCenter(result.detail.location)
        marker.setPosition(result.detail.location)
      })
      geocoder.getAddress(latLng)
    } else {
      geocoder.getLocation(data)
      geocoder.setComplete(result => {
        resolve(result)
        map.setCenter(result.detail.location)
        marker.setPosition(result.detail.location)
      })
    }
  })

}


