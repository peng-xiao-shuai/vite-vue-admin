<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      text: '',
    }
  },
})
</script>

<style scoped lang="scss">
</style>