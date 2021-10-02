<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang='ts'>
  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: 'svg-icon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '#333',
      }
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);
      return {
        symbolId
      }
    }
  })
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>