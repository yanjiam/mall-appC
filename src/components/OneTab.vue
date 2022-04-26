<template>
  <div class="one-tab-wrapper" ref="oneTab">
    <div class="tab-item"
    v-for="(item, i) in menuList"
    :key="item.name"
    :class="{active: index == i}"
    @touchend="scrollTo(i, $event)"
    @touchstart="move = false"
    @touchmove="move = true"
    >
      <div class="img-wrapper">
        <img :src="item.avatar">
      </div>
      <div class="tab-title">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../api/index';
import tool from '../util/tool';

export default {
  data() {
    return {
      move: false,
      index: 0,
      menuList: [],
    };
  },
  methods: {
    ...mapActions(['getSideList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 计算移动的距离
      const { oneTab } = this.$refs;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const wrapperWidth = oneTab.offsetWidth;
      tool.moveTo(oneTab.scrollLeft, itemWidth / 2 + itemLeft - wrapperWidth / 2, oneTab, 'scrollLeft');
      // 获取侧边栏数据 ( sidebar + data )
      // eslint-disable-next-line no-underscore-dangle
      this.getSideList(this.menuList[i]._id);
    },
  },
  async mounted() {
    this.menuList = await api.getCategoryList().then((res) => res.data);
    // eslint-disable-next-line no-underscore-dangle
    this.getSideList(this.menuList[0]?._id);
  },
};
</script>

<style lang='less' scoped>
.one-tab-wrapper {
  width: 375px;
  height: 104px;
  display: flex;
  overflow: auto;
  .tab-item {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    .img-wrapper {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-content: center;
      border-width: 2px;
      border-style: solid;
      border-color: #fff;
      border-radius: 23px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
    }
    .tab-title {
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }
   .active {
      .img-wrapper {
        border-color: #d13193;
      }
      .tab-title {
        color: #fff;
        background-color: #d13193;
        font-weight: bold;
        border-radius: 30px;
      }
    }
}
.one-tab-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
