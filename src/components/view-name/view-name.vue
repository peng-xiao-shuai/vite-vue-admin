<script lang='tsx'>
import { defineComponent, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const meta = useRoute().meta
    const { proxy } = getCurrentInstance() as any

    return () => (
      <>
        <div style='margin-bottom: 20px'>
          <i class={[proxy.defaultData.iconfont, meta.icon]} style="margin-right: 5px"></i>
          <span>{ meta.locale ? proxy.t(meta.locale) : meta.title }</span>
        </div>
      </>
    )
  }
})
</script>

<style scoped lang='scss'>

</style>