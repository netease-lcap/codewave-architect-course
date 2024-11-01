<template>
  <div class="root">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-tab",
  props: {
    text: {
      type: String,
      default: "Hello",
    },
  },
};
</script>
<style scoped>
.root {
  font-size: 24px;
  width: 100%;
  min-height: 300px;
  color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.header {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.body {
  width: 100%;
  height: 100%;
}
</style>
