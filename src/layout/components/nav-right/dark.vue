<script lang="tsx">
import { defineComponent } from 'vue'
import { useToggle, useDark } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    return () => (
      <div class="item">
        <el-tooltip content={t('light/dark')} placement="bottom">
          <div
            class={['switch _flex _flex-align-center', { dark: isDark.value }]}
            onClick={() => toggleDark()}
          >
            <el-icon class="_flex _flex-align-center">
              {isDark.value ? <Moon /> : <Sunny />}
            </el-icon>
          </div>
        </el-tooltip>
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.switch {
  border-radius: 20px;
  width: 45px;
  height: 24px;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box;
  padding: 1px;
  transition: var(--el-transition-duration);

  .el-icon {
    transition: var(--el-transition-duration);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: var(--el-fill-color-dark);
  }
  &.dark .el-icon {
    transform: translateX(21px);
  }

  &:hover {
    border-color: var(--el-color-primary);
    .el-icon {
      color: var(--el-color-primary);
    }
  }
}
</style>
