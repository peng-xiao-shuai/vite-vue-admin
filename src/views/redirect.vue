<script>
// 不加会有警告
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup () {
    let router = useRouter()
    let route = useRoute()
    const { params, query } = route

    console.log(route)
    router.replace({
      name: params.__name,
      params, query
    })

    return () => [h('div')]
  }
}
</script>