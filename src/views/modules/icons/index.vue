<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name />

      <icon-select v-model:icon="iconValue" />

      <div class="tipBox">字体图标</div>

      <div class="icons">
        <div
          class="i-icon _flex _flex-center _flex-wrap"
          v-for="item in iconFont"
          :key="item"
        >
          <i :class="item"></i>
          <div class="iconName _word-break">{{ item }}</div>
        </div>
      </div>
      <div style="margin-bottom: 20px"></div>
      <icon-select v-model:icon="svgValue" type="element" />

      <div class="tipBox">ElementPlus 图标</div>

      <div class="icons">
        <div
          class="i-icon _flex _flex-center _flex-wrap"
          v-for="(item, index) in iconSvg"
          :key="index"
        >
          <el-icon>
            <component :is="item" />
          </el-icon>
          <div class="iconName _word-break">{{ item.name }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, shallowReactive } from 'vue'
import type { Component } from 'vue'
import iconSelect from '@/components/icon-select/index.vue'
import axios from 'axios'

const iconValue = ref('')
let iconFont = shallowRef<string[]>([])
const svgValue = shallowRef<Component | string>('StarFilled')
const iconSvg: { [s: string]: Component } = shallowReactive({})

const getIconFonts = async () => {
  axios
    .get('https://at.alicdn.com/t/c/font_2351447_xw9ezbg0kb.css')
    .then((res) => {
      // 获取所有的 字体图标
      iconFont.value = [...res.data.matchAll(/([\w|\-|\d]+):before/g)].map(
        (item: string[]) => item[1]
      )
    })
}

const getElementIcon = () => {
  import('@element-plus/icons').then((res) => {
    Object.assign(iconSvg, res)
  })
}

getElementIcon()
getIconFonts()
</script>

<script lang="ts">
export default {
  name: 'Icons',
}
</script>

<style lang="scss" scoped>
.operate-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons {
  display: grid;
  grid-row-gap: var(--system-padding);
  grid-column-gap: var(--system-padding);
  grid-template-columns: repeat(10, 1fr);

  .i-icon {
    text-align: center;
    border: 1px solid var(--el-border-color-lighter);
    color: var(--el-text-color-regular);
    border-radius: 5px;
    transition: var(--el-transition-duration);
    padding: 5px;
    height: 80px;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      box-shadow: 0 0 2px 0 var(--el-color-primary);
    }

    i {
      font-size: 28px;
    }

    .iconName {
      margin-top: 10px;
      font-size: 13px;
      width: 100%;
    }
  }
}
</style>
