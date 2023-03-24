import config from '@/config/default-data'
import { create, remove } from '@/utils/watermark'
import { nextTick, ref, reactive, computed } from 'vue'
import { Log } from '@/utils/interface'
import { defineStore } from 'pinia'

// 初始化，是否灰度模式
if (config.settings.grayMode) {
  document.getElementsByTagName('body')[0].style.filter = 'grayscale(1)'
}
// 添加水印
nextTick(function () {
  config.waterMark.switch && create(config.waterMark)
})
export const useSettingStore = defineStore('setting', () => {
  const themeColor = reactive(config.themeColor)
  const errorLog = ref<Log[]>([])
  const drawerSetting = reactive(config.settings)
  const waterMark = reactive(config.waterMark)
  const getBugNumber = computed(() => {
    return errorLog.value.filter(
      (item: Log) => item.type === 'Bug' || item.type === 'Ajax'
    ).length
  })

  // 用于修改非颜色属性
  const setDrawerSetting = ({ val, key }: { val: number; key: string }) => {
    drawerSetting[key] = val
    window.localStorage.setItem('settings', JSON.stringify(drawerSetting))
  }

  // 修改水印
  const setWaterMark = ({
    key,
    val,
  }: {
    val: number | string
    key: string
  }) => {
    waterMark[key] = val
    waterMark.switch ? create(waterMark) : remove()
    window.localStorage.setItem('waterMark', JSON.stringify(waterMark))
  }

  return {
    themeColor,
    errorLog,
    getBugNumber,
    drawerSetting,
    waterMark,
    setDrawerSetting,
    setWaterMark,
  }
})
