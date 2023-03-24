import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import defaultData from '@/config/default-data'
import { useSettingStore } from '@/stores'

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
        <el-tooltip
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
        </el-tooltip>
      </div>
    )
  },
})
