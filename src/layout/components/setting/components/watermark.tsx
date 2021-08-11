import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup(props) {
    const store = useStore()
    const settings = store.state.settings

    const handleSetWaterMark = (val: number | string, key: string) => {
      store.commit('setWaterMark', { key, val })
    }

    return () => (
      <>
        <p class="config-title" data-label="全局水印"></p>
        <div class="config-item">
          <label>水印开关</label>
          <el-switch v-model={settings.waterMark.switch} active-value={1} inactive-value={0} onChange={(e: string | number) => handleSetWaterMark(e, 'switch')} />
        </div >
        <div class="config-item">
          <label>水印颜色</label>
          <el-color-picker v-model={settings.waterMark.color} onChange={(e: string) => handleSetWaterMark(e, 'color')} />
        </div >
        <div class="config-item">
          <label>水印文字</label>
          <el-input style="width:130px" v-model={settings.waterMark.text} onChange={() => { handleSetWaterMark(settings.waterMark.text, 'text') }} />
        </div >
        <div class="config-item">
          <label>水印大小</label>
          <el-input v-model={settings.waterMark.size} v-num onChange={() => { handleSetWaterMark(settings.waterMark.size, 'size') }} />
        </div >
        <div class="config-item">
          <label>水印角度</label>
          <el-input v-model={settings.waterMark.deg} v-num={[[-180, 180]]} onChange={() => { handleSetWaterMark(settings.waterMark.deg, 'deg') }} />
        </div>
        <div class="config-item">
          <label>背景色透明度</label>
          <el-input v-model={settings.waterMark.ratio} v-num={[[0, 100], 'number']} onChange={() => { handleSetWaterMark(settings.waterMark.ratio, 'ratio') }} />
        </div >
      </>
    )
  }
})