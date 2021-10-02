<template>
  <el-card :shadow="defaultData.cardShadow">
    <!-- <view-name></view-name> -->
    <template #header>
      <span>当前用户权限：<span style="color: var(--color-primary);">{{userInfo('roles')}}</span></span>
      <el-button-group  style="float: right">
        <el-button :type="checket == 'admin' ? 'primary' : 'default'" @click="switchUser('admin')">admin</el-button>
        <el-button :type="checket == 'ordinary' ? 'primary' : 'default'" @click="switchUser('ordinary')">ordinary</el-button>
        <el-button :type="checket == 'test' ? 'primary' : 'default'" @click="switchUser('test')">test</el-button>
      </el-button-group>
    </template>

    <div class="grid grid-c-3" :key='key'>
      <div>
        <div class="tipBox">
          单个验证（指令）
          <div style="font-size: 13px;color: var(--el-color-info);">v-permission="['admin']"</div>
        </div>
        <el-button type='primary' v-permission="['admin']">['admin']</el-button>
        <el-button type='success' v-permission="['ordinary']">['ordinary']</el-button>
        <el-button type='warning' v-permission="'test'">"'test'"</el-button>
      </div>

      <div>
        <div class="tipBox">
          多个验证（指令，满足一个显示）
          <div style="font-size: 13px;color: var(--el-color-info);">v-permission="['admin','ordinary']"</div>
        </div>
        <el-button type='primary' v-permission="['admin','ordinary']">['admin','ordinary']</el-button>
        <el-button type='success' v-permission="['ordinary','test']">['ordinary','test']</el-button>
        <el-button type='warning' v-permission="['admin','test']">['admin','test']</el-button>
      </div>

      <div>
        <div class="tipBox">
          多个验证（指令，满足全部显示）
          <div style="font-size: 13px;color: var(--el-color-info);">v-permission:all="['admin','ordinary']"</div>
        </div>
        <el-button type='primary' v-permission:all="['admin','ordinary']">['admin','ordinary']</el-button>
        <el-button type='success' v-permission:all="['ordinary','test']">['ordinary','test']</el-button>
        <el-button type='warning' v-permission:all="['admin','test']">['admin','test']</el-button>
      </div>
    </div>

    <div class="grid grid-c-3" :key='key + 1'>
      <div>
        <div class="tipBox">
          单个验证（函数）
          <div style="font-size: 13px;color: var(--el-color-info);">v-if="$permission(['admin'])"</div>
        </div>
        <el-button type='primary' v-if="$permission(['admin'])">['admin']</el-button>
        <el-button type='success' v-if="$permission(['ordinary'])">['ordinary']</el-button>
        <el-button type='warning' v-if="$permission('test')">"'test'"</el-button>
      </div>

      <div>
        <div class="tipBox">
          多个验证（函数，满足一个显示）
          <div style="font-size: 13px;color: var(--el-color-info);">v-if="$permission(['admin','ordinary'])"</div>
        </div>
        <el-button type='primary' v-if="$permission(['admin','ordinary'])">['admin','ordinary']</el-button>
        <el-button type='success' v-if="$permission(['ordinary','test'])">['ordinary','test']</el-button>
        <el-button type='warning' v-if="$permission(['admin','test'])">['admin','test']</el-button>
      </div>

      <div>
        <div class="tipBox">
          多个验证（函数，满足全部显示）
          <div style="font-size: 13px;color: var(--el-color-info);">v-if="$permission(['admin','ordinary'])"</div>
        </div>
        <el-button type='primary' v-if="$permission(['admin','ordinary'], true)">['admin','ordinary']</el-button>
        <el-button type='success' v-if="$permission(['ordinary','test'], true)">['ordinary','test']</el-button>
        <el-button type='warning' v-if="$permission(['admin','test'], true)">['admin','test']</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang='ts'>
import { defineComponent,reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default defineComponent({
  setup(props,{emit}){
    const router = useRouter()
    const store = useStore()
    const checket = store.state.user.userInfo?.name || ref('admin')

    const userInfo = (e:string) => store.state.user.userInfo[e]
    // key 值 用于刷新页面
    const key = ref(0)
    const switchUser = (val: string) => {
      checket.value = val
      store.commit('setToken', val + '-token')
      store.commit('tagsRefresh')

      // 清除路由
      router.getRoutes().forEach((item) => {
        if (item.meta && item.meta.id) {
          router.removeRoute((item as {name: string}).name)
        }
      })

      store.dispatch('userInfo').then(() => {
        // 更改key刷新dom
        key.value += 1
      })
    }

    return {
      key,
      checket,
      userInfo,
      switchUser
    }
  }
})
</script>

<style scoped lang='scss'>

</style>