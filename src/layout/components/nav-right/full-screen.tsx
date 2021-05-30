import { defineComponent, ref, inject } from "vue";
import screenFull from "screenfull";
import { useI18n } from 'vue-i18n';


export default defineComponent({
  setup(props) {
    const message = inject<any>("$message");
    const { t } = useI18n();
    const screenfull: any = screenFull;

    let isRfs = ref(false);

    const click = () => {
      console.log(112);

      if (!screenfull.isEnabled) {
        message({
          message: "您的浏览器不支持！",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    }
    const rfsChange = () => {
      isRfs.value = screenfull.isFullscreen;
    }
    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on("change", rfsChange);
      }
    }

    init();

    return () => (
      <div class="item">
        <el-tooltip content={t('full.screen')} placement="bottom">
          <div class="item">
            <i
              class={[
                'viteIcon',
                !isRfs ? 'vitefullScreen' : 'vitecancel-full-screen',
              ]}
              onClick={() => { click() }}
            ></i>
          </div>
        </el-tooltip>
      </div >
    );
  },
});