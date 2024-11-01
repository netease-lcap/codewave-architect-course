<template>
  <el-submenu :index="index">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-submenu>
</template>
<script>
export default {
  name: "my-submenu",
  props: {
    index: String,
  }
};
</script>
<style scoped></style>
