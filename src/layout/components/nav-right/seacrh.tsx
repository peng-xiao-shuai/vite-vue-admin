import { defineComponent,ref,Transition  } from "vue";
import defaultData from "@/config/default-data";
import { useI18n } from 'vue-i18n';
import { useSearch } from '@/hooks/states';

export default defineComponent({
  setup(){
    const {t} = useI18n();

    return ()=>(
      <div class="item">
        <el-tooltip content={t('search')} placement="bottom">
          <i class={[defaultData.iconfont,"vitesousuo-"]} onClick={()=>{useSearch.value = !useSearch.value}}></i>
        </el-tooltip>
      </div>
    )
  }
})