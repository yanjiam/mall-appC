<template>
  <van-tabbar fixed route>
    <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item
    icon="cart-o"
    to="/home/shopping"
    id="shop-car"
    :badge="badge"
    >购物车</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" to="/home/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      shopCatList: (state) => state.shopCatList,
    }),
    badge() {
      const count = Object.values(this.shopCatList).reduce((prev, next) => prev + next.p_num, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>
</style>
