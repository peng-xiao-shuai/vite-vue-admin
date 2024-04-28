/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-12 22:42:44
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2024-04-28 12:30:29
 * @Description:
 */
import { defineComponent } from 'vue'
import defaultData from '@/config/default-data'
import { useI18n } from 'vue-i18n'
import { useSettingStore } from '@/stores'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const settingStore = useSettingStore()

    return () => (
      <div class="item">
        <el-tooltip content={t('search')} placement="bottom">
          <i
            class={[defaultData.iconfont, 'vitesousuo-']}
            onClick={() => {
              settingStore.$patch((state) => ({
                isSearch: state.isSearch,
              }))
            }}
          ></i>
        </el-tooltip>
      </div>
    )
  },
})
