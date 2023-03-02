import { defineComponent } from 'vue'
import { useToggle, useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    return () => (
      <div class="item">
        <el-tooltip content={t('light/dark')} placement="bottom">
          <div class="switch" onClick={() => toggleDark()}>
            <el-icon>{isDark.value ? <Moon /> : <Sunny />}</el-icon>
          </div>
        </el-tooltip>
      </div>
    )
  },
})
