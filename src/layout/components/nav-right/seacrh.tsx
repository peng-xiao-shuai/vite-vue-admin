import { defineComponent,ref,Transition  } from "vue";
import { useI18n } from 'vue-i18n';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup(props){
    const {t} = useI18n();
    const router = useRouter();
    const Store = useStore();

    const isSearch= ref<boolean>(false);
    const search = ref<string>("");
    const change = (e: string)=>{
      router.push({
        name: e,
      });
    }
    let menu: any[]=[]
    const searchMenusFun = (arr: any[], menu: any[], superior?: any)=>{
      arr.forEach((each: any) => {
        let item: any = JSON.parse(JSON.stringify(each));
        if (!item.hidden && item.name) {
          if (item.children) {
            item.path = superior ? superior.path + " /" + item.path : item.path;
            menu.push(item);
            menu.concat(searchMenusFun(item.children, menu, item));
          } else {
            item.path = superior.path + " /" + item.path;
            menu.push(item);
          }
        }
      });
      return menu;
    }
    let menus: any = searchMenusFun(Store.state.user.menus, menu);

    return ()=>(
      <div class="item">
        <el-tooltip content={t('search')} placement="bottom">
          <i class="viteIcon vitesousuo-" onClick={()=>{isSearch.value = !isSearch.value}}></i>
        </el-tooltip>

        <Transition  name="navSearch">
          <el-select
            v-show={isSearch.value}
            v-model={search}
            popper-class="searchSelect"
            filterable
            onChange={change}
            placeholder={t('search.menus')}
          >
            {menus.map((item:any,index:number)=><el-option key={item.path} label={item.path} value={item.name}></el-option>)}
          </el-select>
        </Transition>
      </div>
    )
  }
})