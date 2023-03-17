<template>
  <div class="map-marker">
    <div class="info-box">
      <el-text tag="div">经度：{{ data.lng }}</el-text>
      <el-text tag="div">纬度：{{ data.lat }}</el-text>
      <el-text tag="div">地址：{{ data.address }}</el-text>
    </div>
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useDestroy } from '@/hooks/useUtils'
import AMapLoader from '@amap/amap-jsapi-loader'
import '#/amap'
const { name } = useRoute()
const data = reactive({
  lng: 116.397428,
  lat: 39.90923,
  address: '北京市东城区东华门街道天安门',
})
// 定义实例
let map: AMap.Map, geocoder: AMap.Geocoder, marker: AMap.Marker
AMapLoader.load({
  key: 'd44819a368d76ea619971a50854f19b9',
  version: '2.0',
  plugins: ['AMap.Geocoder'],
}).then((amap: typeof AMap) => {
  const _AMap = amap
  map = new _AMap.Map('map', {
    center: [data.lng, data.lat],
    zoom: 12,
  })

  geocoder = new _AMap.Geocoder()
  marker = new _AMap.Marker({
    position: map.getCenter(),
    offset: new _AMap.Pixel(-26, -61),
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    // 设置是否可以拖拽
    draggable: true,
    cursor: 'move',
  })
  marker.setMap(map)

  // 拖拽事件
  marker.on('dragend', ({ lnglat }) => {
    data.lng = lnglat.lng
    data.lat = lnglat.lat

    geocoder.getAddress(lnglat, function (status, result) {
      if (status === 'complete' && result.regeocode) {
        data.address = result.regeocode.formattedAddress
      } else {
        console.error('根据经纬度查询地址失败')
      }
    })
  })
})

/**
 * 销毁实例
 */
const unmounted = () => {
  map?.destroy()
  marker?.remove()
}

useDestroy(name!, unmounted)
</script>
<style scoped lang="scss">
.map-marker {
  position: relative;
  height: 600px;
  .info-box {
    position: absolute;
    color: var(--el-text-color-regular);
    left: 20px;
    top: 20px;
    padding: calc(var(--system-padding) - 2px);
    background: var(--el-bg-color);
    border-radius: 5px;
    z-index: 6;
    box-shadow: var(--el-box-shadow-light);
  }
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
