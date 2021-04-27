<template>
  <div class="history">
      <h4>历史记录</h4>
      <div class="his-item"
      v-for="item in searchList"
      :key="item.time"
      @click="search(item.value)"
      >{{ item.value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      default() {
        return [];
      },
    },
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang="less" scoped>
    .his-item {
        padding: 15px;
        background: #eee;
        border-radius: 10px;
        margin:0px 0px 10px 10px;
        display: inline-block;
    }
</style>
