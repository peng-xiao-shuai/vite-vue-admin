<template>
  <div class="search-view">
    <div class="wrap">
      <img src="/src/assets/logo.svg" style="width: 50px;" alt="vite-vue-admin">
      <p>{{ defaultData.name }}</p>
      <el-input placeholder="搜索页面（路径或者名称）" v-model='searchValue'>
        <template #suffix>
          <i class="el-icon-search" style="margin-right: 5px;"></i>
        </template>
      </el-input>

      <div class="tip">
        {{ t('you.can.use.shortcut.keys') }} <span>s</span> {{ t('call.up.the.search.panel,press') }} <span>esc</span> {{ t('close') }}
      </div>
    </div>

    <!-- 220px = wrap的高度（150） + warp的下外边距（50） + view的padding（20 * 2） -->
    <el-card :shadow="defaultData.cardShadow" body-style="padding: 0;height: 100%" style="border: none;height: calc(100% - 240px);">
      <el-scrollbar>
        <el-empty description="抱歉，没有找到相关页面！！" v-show='!funMenu().length'></el-empty>

        <template v-for="item in funMenu()">
          <div v-if='item.meta && item.meta.locale' :key="item.meta.locale" :label="item.path" :value="item.name" class="menu-item" @click="navTo(item)">
            <i :class="[item.meta.icon,defaultData.iconfont]"></i>
            <div>
              <div class="name">
                {{ item.meta.locale ? t(item.meta.locale) : '' }}
              </div>

              <div class="path">
                <span v-for="(s,i) in item.locales">{{ s && t(s) }} {{ i == item.locales.length - 1 ? '' : '/ ' }}</span>
              </div>

              <div class="path">
                {{ item.path }}
              </div>
            </div>
          </div>
        </template>
      </el-scrollbar>

    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from "vue-router";
import { Routers } from '@/router/index';
const Store = useStore();
const router = useRouter()
const route = useRoute()
const {t} = useI18n();
const searchValue = ref<string>('')
import { useSearch } from '@/hooks/states';

watch(() => route.path, () => {
  useSearch.value = false
})

type Arr = Routers & {locales: string[]}

const searchMenusFun = (arr: Arr[], menu: Arr[], superior?: Arr)=>{
  arr.forEach((each: Arr) => {
    let item = {...each};
    if (!item.hidden as boolean && item.name) {
      item.locales = superior && superior.locales ? superior.locales.concat([(item.meta as {locale: string}).locale]) : item.meta && item.meta.locale ? [item.meta.locale] : []

      if (item.children) {
        item.path = superior ? superior.path + " /" + item.path : item.path;

        menu.push(item);
        menu.concat(searchMenusFun(item.children as Arr[], menu, item));
      } else {
        item.path = (superior && superior.path) + " /" + item.path;

        menu.push(item);
      }
    }
  });
  return menu;
}

let menus = searchMenusFun(Store.state.user.menus, []);

// 筛选菜单 在页面上循环
const funMenu = ()=> {
  if(searchValue.value === ''){
    return menus
  }

  return menus.filter((item: Arr)=>{
    return item.path.indexOf(searchValue.value) != -1 || (item.meta && item.meta.locale) && t(item.meta.locale as string).indexOf(searchValue.value) != -1
  })
}

// 跳转
const navTo = (item: Arr)=>{
  router.push({
    path: item.path.replace(' ','')
  })
}

</script>
<style lang='scss' scoped>
.wrap{
  margin: 0 auto 50px;
  height: 150px;
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;

  p{
    text-align: center;
    width: 100%;
    margin: 0 0 10px;
    color: var(--color-primary);
    font-weight: bold;
  }

  .tip{
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    span{
      display: inline-block;
      padding: 0px 5px;
      height: 18px;
      line-height: 18px;
      background: var(--color-primary);
      border-radius: 2px;
      color: #fff;
      margin: 0 3px;
    }
  }
}

.menu-item{
  display: flex;
  color: #444;
  transition: all .2s;
  border-left: 0px solid var(--color-primary);
  
  &:hover{
    background: #f5f7fa;
    color: var(--color-primary);
    border-left: 4px solid var(--color-primary);
  }

  i{
    padding: 20px;
    font-size: 22px;
  }

  >div{
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    padding-left: 10px;
    // border-left: 1px solid #ddd;

    .name{
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 14px;
    }
    .path{
      width: 100%;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>