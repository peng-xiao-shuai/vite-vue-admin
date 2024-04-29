import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import defaultData from '@/config/default-data'
import { useSettingStore } from '@/stores'
import { ElTooltip } from 'element-plus'

export default defineComponent({
  setup(_props) {
    const settingStore = useSettingStore()
    const router = useRouter()
    const handleNavTo = (e: string) => {
      router.push({
        path: e,
      })
    }

    return () => (
      <div class="item">
        <ElTooltip
          content={
            settingStore.getBugNumber === 0
              ? '没有日志或异常'
              : 'Bug / ' + settingStore.getBugNumber
          }
          placement="bottom"
        >
          <div class={[{ isBug: settingStore.getBugNumber !== 0 }]}>
            <i
              class={[defaultData.iconfont, 'vitebug']}
              onClick={() => handleNavTo('/log/add-log')}
            ></i>

            <span class="bugNum"></span>
          </div>
        </ElTooltip>
      </div>
    )
  },
})
