<template>
  <!-- $env.VUE_APP_DESIGNER -->
  <div :class="$style.root">
    <u-text :text="text ? text : '--'"></u-text>
  </div>
</template>

<script>
import UText from './index.vue'

  export default {
    name: 'u-preview',
    props: {
      text: String,
    },
    components: {
      UText
    }
  }
</script>

<style module>
.root {
  word-wrap: break-word;
}
</style>
