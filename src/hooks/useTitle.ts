import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import defaultData from '@/config/default-data'

export const useTitle = () => {
  const route = useRoute();
  
  const { t } = useI18n()
  watch(() => route.path,() => {
    if (Object.keys(route.meta).length) {
      const title = t((route.meta?.locale || route.meta?.title) as string)
      document.title = `${title} | ${defaultData.name}`
    }
  },{
    immediate: true
  })
}