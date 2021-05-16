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
const store = useStore()
let props = defineProps({
  drawer: { type: Boolean, default: false },
})
const emit = defineEmit(["update:drawer"])

const themeColor = store.state.settings.themeColor
const handleThemeColor = (color, key) => {
  window.localStorage.setItem(key, color)
  document.documentElement.style.setProperty('--color-' + key, color)
}

const handleClose = () => {
  emit('update:drawer', false)
}
</script>