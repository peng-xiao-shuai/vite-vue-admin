<script>
import { useRoute, useRouter } from 'vue-router'
export default {
  setup(){
    let router = useRouter()
    let route = useRoute()
    const { params, query } = route

    console.log(route);
    router.replace({
        name: params.__name,
        params,query
    })
  }
}
</script>