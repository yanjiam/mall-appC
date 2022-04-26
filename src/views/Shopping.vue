<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="$router.goBack()"
        @click-right="del"
      >
        <template #right>
          <van-icon name="delete-o" size="55"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="card-list" v-if="this.shopCatList.length !== 0">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in shopCatList" :key="item._id">
          <van-checkbox class="check" :name="item._id"></van-checkbox>
          <goods-card v-bind="item" :nofly="true"></goods-card>
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img
        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
        alt=""
      />
    </div>
    <van-submit-bar
      :price="allMoney"
      :button-text="`去结算(${totalNum})`"
      @submit="onSubmit"
    >
      <van-checkbox
        v-if="this.shopCatList.length !== 0"
        v-model="checked"
        @click="checkAll"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { Dialog, Toast } from 'vant';
import goodsCard from '../components/GoodsCard.vue';

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      result: [],
      shopCatlist: [],
      checked: false,
    };
  },
  computed: {
    ...mapState({
      shopCatList: (state) => state.shopCatList,
    }),
    totalNum() {
      // eslint-disable-next-line no-underscore-dangle
      const resArr = this.shopCatList.filter((item) => this.result.includes(item._id));
      const res = resArr.reduce((prev, next) => prev + (next.p_num || 0), 0);
      return res;
    },
    allMoney() {
      // eslint-disable-next-line no-underscore-dangle
      const resArr = this.shopCatList.filter((item) => this.result.includes(item._id));
      return resArr.reduce(
        (prev, next) => Math.round(next.p_num * next.price * 100) + prev,
        0,
      );
    },
  },
  watch: {
    result() {
      if (this.result.length === this.shopCatList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    ...mapActions(['getShopCat', 'deleteCart']),
    ...mapMutations(['storageChange']),
    async getAllData() {
      this.getShopCat();
    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    async del() {
      if (this.result.length === 0) {
        Toast('你没有选中商品');
      } else {
        console.log(this.result);
        try {
          await Dialog.confirm({ message: '您是否要删除已选中商品' });
          this.result.forEach((item) => {
            // eslint-disable-next-line no-underscore-dangle
            this.deleteCart({ _id: item });
            this.$refs.checkboxGroup.toggleAll(false);
          });
          this.getShopCat();
        } catch (error) {
          console.log(error);
          Toast('用户点击了取消');
        }
        if (this.result.length === 0) {
          this.checkAll();
        }
      }
    },
    onSubmit() {},
  },
  created() {
    this.getAllData();
  },
};
</script>

<style lang="less" scoped>
.shopping {
  background: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .card-none {
    width: 100%;
    position: absolute;
    top: 46px;
    img {
      width: 100%;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
