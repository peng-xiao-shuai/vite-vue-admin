<template>
  <div style="width: 100%; position: relative">
    <canvas
      :id="id"
      @mousedown="handleDown"
      @mousemove="handleMove"
      @mouseup="handleUp"
      @mouseleave="handleUp"
      :style="{
        width: '100%',
        height: '400px',
        border: '1px solid #000',
      }"
    ></canvas>

    <!-- <el-dialog title="签名图片" v-model="isDialog" width="300">
      <div>
        <el-image
          style="width: 100%; height: auto; border: 1px solid #ccc"
          :preview-src-list="[baseUrl]"
          :src="baseUrl"
          fit="cover"
        ></el-image>
      </div>
    </el-dialog> -->
    <slot name="default" :ctx="ctxRef">
      <el-button type="primary" @click="handleClear">清除画布</el-button>
      <el-button type="primary" @click="handleCreateImg">生成图片</el-button>
    </slot>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, ref, nextTick } from "vue";
export default defineComponent({
  props: {
    modelValue: String,
    //
    // style: {
    //   type: Object,
    //   default: () => {},
    // },
    // 画笔颜色
    signColor: String,
    // 背景颜色
    signBgColor: String,
  },
  emits: ["update:modelValue", "success"],
  setup(props, context) {
    // 获取canvas dom
    let can: HTMLCanvasElement | any, ctx: CanvasRenderingContext2D, cw: number, ch: number;
    let ctxRef: {value: CanvasRenderingContext2D | null} = ref(null);
    const baseUrl = ref("");
    const isDialog = ref<boolean>(false);
    const id = "sign" + new Date().getTime();

    nextTick(() => {
      can = document.getElementById(id);

      if (!can) return

      cw = can.offsetWidth;
      ch = can.offsetHeight;
      can.width = cw;
      can.height = ch;
      ctx = can.getContext("2d") as CanvasRenderingContext2D;
      ctxRef.value = ctx;

      ctx.fillStyle = props.signColor || "#fff";
      ctx.fillRect(0, 0, cw, cw);
      ctx.save();

      ctx.strokeStyle = props.signBgColor || "#000";
      ctx.lineWidth = 1;
    });

    const status = ref<boolean>(false);
    // 鼠标按下
    const handleDown = (e: MouseEvent) => {
      // 激活绘制
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);

      status.value = true;
    };

    const handleMove = (e: MouseEvent) => {
      if (status.value) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    };

    const handleUp = () => {
      status.value = false;
    };

    const handleClear = () => {
      ctx.clearRect(0, 0, cw, ch);
    };
    const handleCreateImg = () => {
      baseUrl.value = can.toDataURL("image/jpeg");
      if (baseUrl.value) {
        ElMessage.success("生成图片成功！");
        // isDialog.value = true
        context.emit("update:modelValue", baseUrl.value);
        context.emit("success", baseUrl.value);
      }
    };

    return {
      handleDown,
      handleMove,
      handleUp,
      handleClear,
      handleCreateImg,

      id,
      ctxRef,
      baseUrl,
      isDialog,
    };
  },
});
</script>
