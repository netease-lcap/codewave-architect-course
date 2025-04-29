<template>
  <div class="demo-customtemplates">
    <at :members="members" name-key="name">
      <template slot="item" slot-scope="s">
        <img :src="s.item.avatar">
        <span v-text="s.item.name"></span>
      </template>
      <div class="editor" contenteditable v-html="content" :style="{ width, height }"></div>
    </at>
  </div>
</template>

<script>
import At from 'vue-at/dist/vue-at'

export default {
  components: { At },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100px'
    },
    members: {
      type: Array,
      default: () =>
        [{
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          name: 'myrtie.green'
        }, {
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          name: '椿木'
        }]
    },
    content: {
      type: String,
      default: 'Hello, @me'
    }
  }
}
</script>

<style scoped>
.editor {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  overflow: auto;
  background-color: #fff;
  cursor: text;
}

.atwho-li img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: middle;
  border-radius: 50%;
}
</style>