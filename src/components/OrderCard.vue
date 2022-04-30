<template>
  <div class="orderCard">
    <div class="header">
      <span>{{ this.time }}</span>
      <h3>{{ this.title }}</h3>
    </div>
    <div class="content">
      <div class="content-list">
        <div class="content-list-imgList">
          <van-image
            class="content-list-imgList-img"
            round
            v-for="item in imgList"
            :key="item"
            :src="item"
          />
        </div>
        <div v-if="imgList.length === 1" class="content-list-info">
          <h3>{{ this.firstName }}</h3>
          <span>x {{ this.data.product_list[0].num }} </span>
        </div>
      </div>
      <div class="content-payinfo">
        共{{ this.productNum }}件 实付：<span>￥{{ this.data.pay_num }}</span>
      </div>
    </div>
    <div class="footer">
      <van-button
        size="small"
        v-if="data.status !== 2 && data.status !== 3"
        round
        @click="del"
        >取消订单</van-button
      >
      <van-button
        size="small"
        v-if="data.status === 0"
        round
        type="warning"
        @click="toPay"
        >去支付</van-button
      >
      <van-button
        size="small"
        v-if="data.status === 2"
        round
        type="warning"
        @click="sended"
        >确认收货</van-button
      >
    </div>
    <van-share-sheet
      v-model="showShare"
      title="选择支付方式"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import { Toast } from 'vant';

export default {
  props: ['data'],
  data() {
    return {
      title: '',
      showShare: false,
      imgList: [],
      firstName: '',
      options: [
        { name: '微信', icon: 'wechat' },
        {
          name: '支付宝',
          icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ixintu.com%2Fdownload%2Fjpg%2F201909%2F490cbe1713be2a188a0beb9a06bcc8ad.jpg%21con&refer=http%3A%2F%2Fimg.ixintu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653716246&t=02fc117da8e1bfcebea94500bbaceea7',
        },
        {
          name: '银行卡',
          icon: 'https://img2.baidu.com/it/u=3072461632,3410743741&fm=253&fmt=auto&app=138&f=JPG?w=500&h=500',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['deleteOrder', 'changeStatus']),
    async getImgList() {
      this.imgList = [];
      let control = true;
      this.data.product_list.forEach(async (item) => {
        const res = await this.$api.getGoodsByIds(item.id);
        if (res.state === 0) {
          if (control) {
            this.firstName = res.data.title;
            control = false;
          }
          this.imgList.push(res.data.images[0]);
        }
      });
    },
    onSelect(option) {
      console.log(option.name);
      this.showShare = false;
    },
    async del() {
      // eslint-disable-next-line no-underscore-dangle
      const res = await this.deleteOrder({ _id: this.data._id });
      if (res) {
        this.$emit('onRefresh');
        Toast('取消成功');
      } else {
        Toast.fail('取消失败');
      }
    },
    async toPay() {
      // eslint-disable-next-line no-underscore-dangle
      const res = await this.changeStatus({ _id: this.data._id, status: 1 });
      if (res) {
        this.$emit('onRefresh');
        Toast('支付成功');
      } else {
        Toast.fail('支付失败');
      }
    },
    async sended() {
      // eslint-disable-next-line no-underscore-dangle
      const res = await this.changeStatus({ _id: this.data._id, status: 3 });
      if (res) {
        this.$emit('onRefresh');
        Toast('收货成功');
      } else {
        Toast.fail('请重试~');
      }
    },
    getCardStatus() {
      switch (this.data.status) {
        case 0:
          this.title = '待支付';
          break;
        case 1:
          this.title = '待发货';
          break;
        case 2:
          this.title = '待收货';
          break;
        case 3:
          this.title = '已完成';
          break;
        default:
          this.title = '';
          break;
      }
    },
  },
  computed: {
    time() {
      return moment(this.data.create_time).format('YYYY-MM-DD hh:mm:ss');
    },
    productNum() {
      return this.data.product_list.reduce((prev, next) => prev + next.num, 0);
    },
  },
  created() {
    this.getImgList();
    this.getCardStatus();
  },
};
</script>

<style lang="less" scoped>
.orderCard {
  padding: 0 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #fff;
  .header {
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      margin: 0;
    }
  }
  .content {
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: column;
    &-list {
      display: flex;
      align-self: start;
      justify-content: center;
      align-items: center;
      &-imgList {
        &-img {
          width: 50px;
          height: 50px;
          margin-right: 5px;
        }
      }
      &-info {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        h3 {
          margin: 0;
          margin-bottom: 8px;
        }
      }
    }
    &-payinfo {
      align-self: end;
    }
  }
  .footer {
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
    > * {
      margin-left: 10px;
    }
  }
}
</style>
