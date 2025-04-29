<template>
  <el-menu-item :index="index">
    <slot></slot>
  </el-menu-item>
</template>
<script>
export default {
  name: "my-menu-item",
  props: {
    index: String,
  },
};
</script>
<style scoped></style>
