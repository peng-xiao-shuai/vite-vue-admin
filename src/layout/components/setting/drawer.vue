<template>
  <el-drawer
    title="全局配置"
    :model-value="drawer"
    size="40%"
    @close="handleClose"
  >
    <el-form
      ref="currentFrom"
      label-position="top"
      style="padding: 0 20px"
      class="Dform"
    >
      <div class="grid grid-c-5">
        <el-form-item
          :label="t(item) + '颜色'"
          v-for="(item, index) in Object.keys(themeColor)"
          :key="index"
        >
          <el-color-picker
            v-model="themeColor[item]"
            @change="handleThemeColor($event, item)"
          ></el-color-picker>
        </el-form-item>
      </div>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { defineEmit, defineProps } from "vue"
import { useStore } from "vuex"
import { getLightColor } from '/@/utils/theme'
const store = useStore()
let props = defineProps({
  drawer: { type: Boolean, default: false },
})
const emit = defineEmit(["update:drawer"])

const themeColor = store.state.settings.themeColor
const handleThemeColor = (color, key) => {
  // 设置主题颜色
  const Tcolors = JSON.parse(window.localStorage.getItem('themeColors') || "{}")
  const Lcolors = JSON.parse(window.localStorage.getItem('themeLightColors') || "{}")

  let colorKey = '--color-' + key
  setTheme(Tcolors, colorKey, color, 'themeColors')

  // 设置不同透明度颜色
  for (let i in new Array(10).fill(10)) {
    if (i % 2 == 1) {
      let colorKey = '--color-' + key + '-light-' + i
      setTheme(Lcolors, colorKey, getLightColor(color, i / 10), 'themeLightColors')
    }
  }

  /**
   * @param {object} v Lcolors
   * @param {string} ckey --color-' + key + '-light-' + i
   * @param {string} cval red
   * @param {string} key themeLightColors
   */
  function setTheme (v, ckey, cval, key) {
    document.documentElement.style.setProperty(ckey, cval)
    v[ckey] = cval
    window.localStorage.setItem(key, JSON.stringify(v))
  }
}

const handleClose = () => {
  emit('update:drawer', false)
}
</script>