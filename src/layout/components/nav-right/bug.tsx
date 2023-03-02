import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import defaultData from '@/config/default-data'

export default defineComponent({
  setup(_props) {
    const store = useStore()
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
            store.getters.getBugNumber === 0
              ? '没有日志或异常'
              : 'Bug / ' + store.getters.getBugNumber
          }
          placement="bottom"
        >
          <div class={[{ isBug: store.getters.getBugNumber !== 0 }]}>
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
