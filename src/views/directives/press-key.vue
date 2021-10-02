<template>
  <el-card :shadow="defaultData.cardShadow">
    <view-name></view-name>

    <!-- 注意 -->
    <div class="tipBox warning">
      <p>当指令绑定在 input 或者 textarea 或者 el-input 上时将为局部触发，否则将为全局触发</p>
      <span>
        函数如果需要携带参数，请使用箭头函数包裹。例如: <span class="code">v-press-key:q="() => msg('q')}"</span>。
        如果不包裹的话，该函数会立即执行一次
      </span>
      <p>id 为局部触发特有，全局使用将会无效。全局触发有多个按键相同时 将会优先触发第一个绑定的函数，并且会在控制台提示</p>
    </div>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox">q 按键 input 类型 （局部触发）</div>
        <el-input v-model="inputs.q" v-press-key:q="() => msg('按键 q 触发 input')">
          <template #append>
            v-press-key:q
          </template>
        </el-input>
      </div>

      <div>
        <div class="tipBox">q 按键 携带id（局部触发）</div>
        <el-input v-model="inputs.q" v-press-key:q.100="() => msg('按键 q 触发 input,携带 id 为 100')">
          <template #append>
            v-press-key:q.100
          </template>
        </el-input>
      </div>

      <div>
        <div class="tipBox">q 按键 携带id（局部触发）</div>
        <el-input v-model="inputs.q" v-press-key:q.200="() => msg('按键 q 触发 input,携带 id 为 200')">
          <template #append>
            v-press-key:q.200
          </template>
        </el-input>
      </div>
    </div>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox">q 按键 textarea 类型 （局部触发）</div>
        <el-input type="textarea" v-model="inputs.q" v-press-key:q="() => msg('按键 q 触发 textarea')">
          <template #append>
            v-press-key:q
          </template>
        </el-input>
      </div>

      <div>
        <div class="tipBox">q 按键 携带id（局部触发）</div>
        <el-input type="textarea" v-model="inputs.q" v-press-key:q.100="() => msg('按键 q 触发 textarea,携带 id 为 100')">
          <template #append>
            v-press-key:q.100
          </template>
        </el-input>
      </div>

      <div>
        <div class="tipBox">q 按键 携带id（局部触发）</div>
        <el-input type="textarea" v-model="inputs.q" v-press-key:q.200="() => msg('按键 q 触发 textarea,携带 id 为 200')">
          <template #append>
            v-press-key:q.200
          </template>
        </el-input>
      </div>
    </div>

    <div class="grid grid-c-4">
      <div>
        <div class="tipBox" v-press-key:a="() => msg('按键 a 触发，全局','error')">a 按键（全局触发）</div>
      </div>

      <div>
        <div class="tipBox" v-press-key:d="() => msg('按键 d 触发，全局','error')">d 按键（全局触发）</div>
      </div>

      <div>
        <div class="tipBox" v-press-key:d.100="() => msg('按键 d 触发 携带id，全局','error')">d 按键，携带id（全局触发）</div>
      </div>

      <div>
        <div class="tipBox" v-press-key:q="() => msg('按键 q 触发，全局','error')">q 按键（局部触发时，全局也触发）</div>
      </div>
    </div>

    <!-- <div class="grid grid-c-3">
      <div>
        <div class="tipBox" v-press-key:q="() => msg('按键 q 触发')">q 按键 （全局按键触发）</div>
        <el-input v-model="inputs.q" >
          <template #append>
            v-press-key:q
          </template>
        </el-input>
      </div>

      <div>
        <div class="tipBox">q 按键 携带id（全局按键触发）</div>
        <el-input v-model="inputs.q" v-press-key:q.100="() => msg('按键 q 触发 携带 id 为 100')">
          <template #append>
            v-press-key:q.100
          </template>
        </el-input>
      </div>

      <div>
        <div class="tipBox">q 按键 携带id（全局按键触发）</div>
        <el-input v-model="inputs.q" v-press-key:q.200="() => msg('按键 q 触发 携带 id 为 200')">
          <template #append>
            v-press-key:q.200
          </template>
        </el-input>
      </div>
    </div> -->
  </el-card>
</template>

<script setup lang='ts'>
import { getCurrentInstance,reactive } from "vue";

const { proxy } = getCurrentInstance() as any

const msg = (str:string,type:string = 'success')=>{
  proxy.$message[type](str)
  console.log(str);
}

const inputs = reactive({
  q:'',
})

</script>

<style scoped lang='scss'>
.tipBox{
  font-size: 15px !important;
}
</style>