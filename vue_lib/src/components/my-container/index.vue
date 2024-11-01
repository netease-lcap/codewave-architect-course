<template>
  <div>
    <div :class="$style.container">
      <div :class="$style.header">
        <slot name="header"><UText>title</UText></slot>
        <template v-if="!$slots.header && $env.VUE_APP_DESIGNER">
          <UText>title</UText>
        </template>
      </div>
      <div :class="$style.body">
        <slot><UText>content</UText></slot>
        <template v-if="!$slots.default && $env.VUE_APP_DESIGNER">
          <UText>content</UText>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { Text } from "virtual-lcap:lcap-ui"

export default {
  name: "my-container",
  components: {
    UText: Text,
  },
  props: {
    text: {
      type: String,
      default: "Hello",
    },
  },
};
</script>
<style module>
.container {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  min-height: 200px;
}
.header {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.header p {
  margin: 0;
}
.body {
  padding: 10px;
}
</style>
