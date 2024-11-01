<template>
  <Mentionable
    :keys="['@']"
    :items="items"
    insert-space
    :mapInsert="mapInsert"
    @open="onOpen"
    @apply="onApply"
    @close="onClose"
    @search="onSearch"
  >
    <textarea
      v-model="value"
      :style="{ width, height }"
      class="editor"
      @input="onInput"
    />

    <template #item-@="{ item }">
      <div class="user">
        <img :src="item.avatar" class="member-avatar" />
        <span class="member-name">
          {{ item.name }}
        </span>
      </div>
    </template>
  </Mentionable>
</template>
<script>
import { Mentionable } from "vue-mention";
import "floating-vue/dist/style.css";

export default {
  name: "my-mention",
  components: {
    Mentionable,
  },
  props: {
    text: {
      type: String,
      default: "Hello,World",
    },
    items: {
      type: Array,
      default: () => [
        {
          email: "abc@netease.corp.com",
          name: "Mr Cat",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
          email: "abc@netease.corp.com",
          name: "Mr Dog",
          avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        },
      ],
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      value: this.text,
    };
  },
  methods: {
    mapInsert(item, key) {
      return item.name;
    },
    onInput(e) {
      this.$emit("update:text", this.value);
    },
    onOpen() {
      this.$emit("open");
    },
    onApply(e) {
      this.$emit("apply");
      this.$emit("update:text", this.value);
    },
    onClose() {
      this.$emit("close");
    },
    onSearch(keyword) {
      this.$emit("search", keyword);
    },
  },
};
</script>
<style>
.mention-item {
  padding: 4px 10px;
  border-radius: 4px;
}

.mention-item .member-avatar {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  vertical-align: middle;
  border-radius: 50%;
}
.editor {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  resize: none;
}
.mention-selected {
  background: rgb(226, 226, 225);
}
</style>
