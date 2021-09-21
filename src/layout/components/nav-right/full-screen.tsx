import { defineComponent, ref, inject } from "vue";
import screenFull from "screenfull";
import { useI18n } from 'vue-i18n';
import defaultData from '@/config/default-data';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup() {
    const { t } = useI18n();

    let isRfs = ref(false);

    const click = () => {
      if (!screenFull.isEnabled) {
        ElMessage({
          message: "您的浏览器不支持！",
          type: "warning",
        });
        return false;
      }
      screenFull.toggle();
    }
    const rfsChange = () => {
      isRfs.value = (screenFull as {isFullscreen: boolean}).isFullscreen
    }
    const init = () => {
      if (screenFull.isEnabled) {
        screenFull.on("change", rfsChange);
      }
    }

    init();

    return () => (
      <div class="item">
        <el-tooltip content={t('full.screen')} placement="bottom">
          <div class="item">
            <i
              class={[
                defaultData.iconfont,
                !isRfs.value ? 'vitefullScreen' : 'vitecancel-full-screen',
              ]}
              onClick={() => { click() }}
            ></i>
          </div>
        </el-tooltip>
      </div >
    );
  },
});