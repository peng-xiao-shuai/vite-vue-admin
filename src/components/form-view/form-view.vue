<!--
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 10:47:21
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-25 14:56:55
 * @Description:
-->
<template>
  <el-form
    v-bind="property"
    ref="elFormRef"
    :model="formData"
    :rules="props.showType === 'query' ? {} : rules"
    :disabled="disabled"
    :class="property?.inline ? '' : 'flex flex-wrap justify-between'"
  >
    <el-form-item
      v-for="(item, index) in formRenderItems"
      :key="item.prop"
      :prop="item.prop"
      :label="showLabel ? clearSymbol(item.text) : ''"
      :style="{
        flexBasis: item?.basis || '100%',
      }"
    >
      <!-- 插槽 -->
      <slot
        v-if="item.type == 'slot'"
        :name="item.slotName || 'default'"
        :index="index"
      ></slot>

      <PTRenderJsx
        v-else-if="typeof item.render == 'function'"
        :row="formData"
        :index="index"
        :prop="item as any"
      />
      <component
        :is="matchComponents(item.type || FormTypeEnum.Input)"
        v-bind="bindAttr(item, formData, index)"
        v-else
        @update:model-value="formData[item.prop!] = $event"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PTRenderJsx } from 'el-plus-powerful-table-ts/es'
import {
  FormTypeEnum,
  formViewProps,
  useFormViewState,
  useFunction,
} from './form-view-data'
import { clearSymbol, matchComponents } from './utils'

const props = defineProps(formViewProps)

const { formViewData, formRenderItems, elFormRef, transformHeader } =
  useFormViewState(props)
const { formData, rules } = toRefs(formViewData)

const { bindAttr, submitForm, resetForm, refreshRender } = useFunction(
  props,
  formData,
  elFormRef,
  transformHeader,
)

defineExpose({
  $slots: useSlots(),
  $attrs: useAttrs(),
  $refs: {
    elFormRef,
  },
  props,
  formViewData,
  formItems: formRenderItems.value,
  submitForm,
  resetForm,
  refreshRender,
})
</script>

<style scoped lang="scss">
.el-form--inline .el-form-item {
  margin-right: 10px;
}
</style>
