<template>
  <el-card :shadow="defaultData.cardShadow">
    <div class="operate-container">
      <div>
        <i :class="[defaultData.iconfont,'vitenumber']" style="margin-right: 5px"></i>
        <span>数字指令</span>
      </div>
    </div>

    <div class="grid grid-c-4">
      <div>
        <div class="tipBox">整数</div>
        <el-input v-model="inputs.number" placeholder="" v-num>
          <template #append>
            v-num
          </template>
        </el-input>
      </div>
      <div>
        <div class="tipBox">小数（默认2位）</div>
        <el-input v-model="inputs.float" placeholder="" v-num:float>
          <template #append>
            v-num:float
          </template>
        </el-input>
      </div>
      <div>
        <div class="tipBox">小数（自定义保留n位）</div>
        <el-input
          v-model="inputs.floatLength"
          placeholder=""
          v-num:float.5
        >
          <template #append>
            v-num:float.5
          </template>
        </el-input>
      </div>
      <div>
        <div class="tipBox">整数 || 小数（固定范围）</div>
        <el-input
          v-model="inputs.numberScope"
          placeholder=""
          v-num="[1, 10]"
        >
          <template #append>
            v-num="[1, 10]"
          </template>
        </el-input>
      </div>
    </div>
  </el-card>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, nextTick } from "vue";
export default defineComponent({
  setup(props, { emit }) {
    return {
      inputs: reactive({
        number: 0,
        float: 0,
        floatLength: 0,
        numberScope: 1,
      }),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>