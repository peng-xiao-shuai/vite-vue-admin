<script lang="tsx">
import { defineComponent } from 'vue'
import defaultData from '@/config/default-data'

export default defineComponent({
  setup() {
    const navSetting = defaultData.navSetting
    // 可选语言
    const localeSelect = defaultData.localeSelect

    const setLocale = (val: string) => {
      if (val) {
        navSetting.locale = val
        localStorage.setItem('navSetting', JSON.stringify(navSetting))
        location.reload()
      }
    }

    type Item = {
      value: string
      label: string
    }

    const slots = {
      dropdown: () => {
        return (
          <el-dropdown-menu class="user-dropdown">
            {localeSelect.map((item: Item, index: number) => {
              return (
                <el-dropdown-item
                  key={'locale' + index}
                  onClick={() => {
                    setLocale(item.value)
                  }}
                >
                  <div
                    style={{
                      color:
                        navSetting.locale == item.value
                          ? 'var(--el-color-primary)'
                          : '#666',
                    }}
                  >
                    <i
                      class="language_r"
                      style={
                        navSetting.locale == item.value
                          ? {
                              borderColor: 'var(--el-color-primary)',
                              background: 'var(--el-color-primary)',
                            }
                          : {}
                      }
                    ></i>
                    {item.label}
                  </div>
                </el-dropdown-item>
              )
            })}
          </el-dropdown-menu>
        )
      },
    }

    return () => (
      <div class="item">
        <el-dropdown class="avatar-container" trigger="hover" v-slots={slots}>
          <div
            class={[
              defaultData.iconfont,
              navSetting.locale == 'en-US' ? 'vitelanguage2' : 'vitelanguage2',
            ]}
          ></div>
        </el-dropdown>
      </div>
    )
  },
})
</script>

<style lang="scss">
.language_r {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #999;
  margin-right: 10px !important;
  display: inline-block;
}
</style>
