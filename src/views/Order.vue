<template>
  <div class="order">
    <van-nav-bar
      title="我的订单"
      right-text="开发票"
      left-arrow
      @click-left="
        () => {
          this.$router.goBack();
        }"
      @click-right="
        () => {
          this.$toast('暂不支持开发票');
        }"
    />
    <van-tabs v-model="status" @click="changeTab">
      <van-tab v-for="item in tabList" :key="item.key" :title="item.title" />
    </van-tabs>
    <div class="orderList">
      <van-list
        v-model="loading"
        offset="100"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <order-card
          v-for="item in orderList"
          :key="item._id"
          :data="item"
          @onRefresh="onRefresh"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import orderCard from '../components/OrderCard.vue';

export default {
  components: { orderCard },
  data() {
    return {
      tabList: [
        {
          title: '全部',
          key: 0,
        },
        {
          title: '待支付',
          key: 1,
        },
        {
          title: '待配送',
          key: 2,
        },
        {
          title: '配送中',
          key: 3,
        },
        {
          title: '已完成',
          key: 4,
        },
      ],
      loading: false,
      finished: false,
      refreshing: false,
      status: 0,
      page: 1,
      size: 5,
      total: 0,
    };
  },
  methods: {
    ...mapMutations(['resetOrderList']),
    ...mapActions(['getOrderList']),
    async toPay(_id, status) {
      const res = await this.$api.changeStatus(_id, status);
      if (res.state === 0) {
        this.$toast.success('支付成功');
      }
    },
    changeTab() {
      this.onRefresh();
    },
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const res = await this.getOrderList({
        page: this.page,
        size: this.size,
        status: this.status === 0 ? null : this.status - 1,
      });
      if (res) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    onRefresh() {
      // 清空列表数据
      this.page = 0;
      this.refreshing = true;
      this.finished = false;
      this.resetOrderList();
      // 重新加载数据
      this.onLoad();
      this.refreshing = false;
    },
  },
  computed: {
    ...mapState({
      orderList: (state) => state.orderList,
    }),
  },
  created() {
    this.status = Number(this.$route.query.status) || 0;
    this.onRefresh();
  },
};
</script>

<style lang="less">
.order {
  .orderList {
    min-height: calc(100vh - 110px);
    padding: 10px;
    background: #eee;
  }
}
</style>
