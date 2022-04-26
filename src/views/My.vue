<template>
  <div class="my">
    <div class="title">
      <div class="title-left">
        <van-image
          round
          class="title-left-img"
          :src="
            avatar ||
            'https://m.360buyimg.com/pop/jfs/t1/195944/40/24097/62381/626665d0E00bc69b3/16d82d7d7b77d9d3.png'
          "
        />
        <span v-if="username"
          ><van-icon v-if="power === 2" name="gem" color="#f0be52" />{{
            username
          }}</span
        >
        <span
          v-else
          @click="
            () => {
              this.$router.push('/login');
            }
          "
          >登录/注册</span
        >
      </div>
      <div class="title-right">
        <van-popover
          v-if="pin"
          placement="left-start"
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <van-icon name="more-o" size="50" />
          </template>
        </van-popover>
      </div>
    </div>
    <div class="grid">
      <van-grid :border="false" center :column-num="4">
        <van-grid-item v-for="item in gridData1" :key="item.id">
          <b class="num">
            {{ item.id === "balance" ? `￥${item.value}` : item.value }}
          </b>
          <span>{{ item.text }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="order">
      <div class="order-title">
        <h3>我的订单</h3>
        <span>全部订单 ></span>
      </div>
      <van-grid :border="false" center :column-num="5">
        <van-grid-item
          v-for="item in gridData2"
          :key="item.id"
          :icon="item.icon"
          :text="item.text"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getUserCookie, removeUserCookie } from "../util/userCookie";

export default {
  components: {},
  data() {
    return {
      showPopover: false,
      gridData1: [
        {
          id: "balance",
          text: "余额",
          value: 0,
        },
        {
          id: "coupon",
          text: "优惠券",
          value: 0,
        },
        {
          id: "coin",
          text: "金币",
          value: 0,
        },
        {
          id: "integral",
          text: "积分兑换",
          value: 0,
        },
      ],
      gridData2: [
        {
          id: "awaitPay",
          text: "待支付",
          icon: "pending-payment",
        },
        {
          id: "awaitSend",
          text: "待配送",
          icon: "tosend",
        },
        {
          id: "sending",
          text: "配送中",
          icon: "logistics",
        },
        {
          id: "awaitEvaluate",
          text: "待评价",
          icon: "other-pay",
        },
        {
          id: "afterSale",
          text: "售后/退款",
          icon: "after-sale",
        },
      ],
      actions: [
        { text: "修改个人信息", fun: "edit" },
        { text: "退出登录", fun: "loginout" },
      ],
      pin: '',
      avatar: "",
      username: "",
      power: 1,
    };
  },
  methods: {
    init() {
      const { pin, avatar, power, username } = getUserCookie();
      this.pin = pin;
      this.avatar = avatar;
      this.power = power;
      this.username = username;
    },
    onSelect(action) {
      if (action.fun === "loginout") {
        removeUserCookie();
        this.init();
      } else {
        this.$router.push({
          path: '/register',
          query: {
            pin: this.pin,
          }
        })
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.my {
  height: 100vh;
  background: #eee;
  padding: 0px 5px;
  .title {
    padding: 30px 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      display: flex;
      align-items: center;
      &-img {
        width: 50px;
        height: 50px;
        margin-right: 8px;
      }
      span {
        font-size: 16px;
      }
    }
  }
  .grid {
    margin-top: 20px;
    padding: 10px 0px;
    background: #fff;
    border-radius: 10px;
  }
  .order {
    margin-top: 10px;
    padding: 0 5px;
    background: #fff;
    border-radius: 10px;

    &-title {
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #9b9d9c;
        font-size: 10px;
      }
    }
  }
}
</style>
