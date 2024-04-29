<template>
  <el-select
    v-model="iconValue"
    filterable
    remote
    reserve-keyword
    clearable
    placeholder="请选择图标"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="(val: string) => emits('update:icon', val)"
  >
    <template #prefix>
      <div class="prefix _flex _flex-center">
        <i :class="['el-icon', iconValue]">
          <component v-if="type === 'element' && iconValue" :is="iconValue" />
        </i>
      </div>
    </template>
    <div
      class="icons"
      :style="{
        width: '750px',
        'grid-template-columns': `repeat(${columnNumber || 7}, 1fr)`,
        ...optionStyle,
      }"
    >
      <el-option
        v-for="item in options"
        :key="item.name"
        :label="item.name"
        :value="item.name"
      >
        <div class="item _flex _flex-center _flex-wrap">
          <template v-if="type == 'element'">
            <el-icon>
              <component :is="item.component" />
            </el-icon>
            <span class="_word-break">{{ item.name }}</span>
          </template>

          <template v-else>
            <i :class="[item.name]"></i>
            <span class="_word-break">{{ item.name }}</span>
          </template>
        </div>
      </el-option>
    </div>
  </el-select>
</template>

<script lang="ts" setup>
import { ref, watchEffect, watch, shallowRef } from 'vue'
import type { Component } from 'vue'
import defaultData from '@/config/default-data'
import axios from 'axios'

const props = defineProps<{
  columnNumber?: number
  icon: string | Component
  optionStyle?: object
  type?: 'icon-font' | 'element'
}>()

const emits = defineEmits(['update:icon'])

const loading = ref(true)
const options = shallowRef<{ name: string; component?: Component }[]>([])
let cacheIconFont: { name: string }[] = []
let cacheIconSvg: { name: string; component: Component }[] = []
const iconValue = ref<string | Component>('')
watchEffect(() => {
  if (props.icon) {
    iconValue.value = props.icon
  }
})

const getIconFonts = async () => {
  axios.get(defaultData.iconFontUrl).then((res) => {
    // 获取所有的 字体图标
    cacheIconFont = [...res.data.matchAll(/([\w|\-|\d]+):before/g)].map(
      (item: string[]) => ({
        name: item[1],
      }),
    )
    options.value = [...cacheIconFont]
    loading.value = false
  })
}

const getElementIcon = async () => {
  type Icon = {
    [key: string]: Component
  }
  import('@element-plus/icons-vue').then((res: Icon) => {
    for (const i in res) {
      cacheIconSvg.push({
        name: res[i].name!,
        component: res[i],
      })
    }
    options.value = [...cacheIconSvg]

    loading.value = false
  })
}

watch(
  () => props.type,
  (val) => {
    console.log(val)

    if (val == 'icon-font' || !val) {
      getIconFonts()
    } else {
      getElementIcon()
    }
  },
  {
    immediate: true,
  },
)

// 搜索
const remoteMethod = (str: string) => {
  options.value = (
    props.type == 'element' ? cacheIconSvg : cacheIconFont
  ).filter((icon) => icon.name.indexOf(str) !== -1)
}
</script>

<style lang="scss" scoped>
.prefix {
  color: var(--el-color-primary);
  .el-icon {
    font-size: 18px;
  }
}
.icons {
  padding: 0 10px;
  display: grid;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  :deep(.el-select-dropdown__item) {
    height: auto;
    line-height: auto;
    padding: 0;
  }
  :deep(.selected) {
    .item {
      font-weight: 400;
      border: 1px solid var(--el-color-primary);
      color: var(--el-color-primary);
      box-shadow: 0 0 2px 0 var(--el-color-primary);
    }
  }
  .item {
    text-align: center;
    border: 1px solid var(--el-border-color-lighter);
    color: var(--el-text-color-secondary);
    border-radius: 5px;
    transition: var(--el-transition-duration);
    padding: 5px 10px;
    height: 80px;

    i {
      font-size: 24px;
    }

    .el-icon {
      margin: 4px 0;
    }

    > span {
      display: inline-block;
      width: 100%;
      white-space: break-spaces;
      line-height: 1;
      font-size: 12px;
    }
  }

  .item:hover {
    border: 1px solid var(--el-color-primary);
    color: var(--el-color-primary);
    box-shadow: 0 0 2px 0 var(--el-color-primary);
  }
}
</style>

<style lang="scss">
.el-select-dropdown {
  .el-scrollbar {
    padding: 10px 0;
  }
  .el-select-dropdown__list {
    padding: 0;
  }
}
</style>
