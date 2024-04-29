import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import defaultData from '@/config/default-data'
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElMessage,
} from 'element-plus'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const navSetting = defaultData.navSetting

    type SizeSelect = {
      value: '' | 'default' | 'large' | 'small'
      label: string
    }
    const sizeSelect: SizeSelect[] = [
      {
        value: 'default',
        label: 'default',
      },
      {
        value: 'large',
        label: 'large',
      },
      {
        value: 'small',
        label: 'small',
      },
    ]

    // 修改组件大小
    const setSize = (e: '' | 'default' | 'large' | 'small') => {
      navSetting.size = e
      localStorage.setItem('navSetting', JSON.stringify(navSetting))
      ElMessage.success('修改成功！即将刷新网页')
      setTimeout(() => {
        window.location.reload()
      }, 800)
    }
    const slots = {
      dropdown: () => {
        return (
          <ElDropdownMenu class="user-dropdown">
            {sizeSelect.map((item: SizeSelect, index: number) => {
              return (
                <ElDropdownItem
                  key={'locale' + index}
                  onClick={() => {
                    setSize(item.value)
                  }}
                >
                  <div
                    style={{
                      color:
                        navSetting.size == item.value
                          ? 'var(--el-color-primary)'
                          : '#666',
                    }}
                  >
                    <i
                      class="language_r"
                      style={
                        navSetting.size == item.value
                          ? {
                              borderColor: 'var(--el-color-primary)',
                              background: 'var(--el-color-primary)',
                            }
                          : {}
                      }
                    ></i>
                    {t(item.label)}
                  </div>
                </ElDropdownItem>
              )
            })}
          </ElDropdownMenu>
        )
      },
    }

    return () => (
      <div class="item">
        <ElDropdown class="avatar-container" trigger="hover" v-slots={slots}>
          <div class={[defaultData.iconfont, 'vitefont-size']}></div>
        </ElDropdown>
      </div>
    )
  },
})
