<template>
  <div class="card-wrapper van-hairline--bottom">
    <div class="card-img">
      <img :src="images[0]" ref="img" />
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{ title }}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="prices">￥{{ price }}</div>
      <div class="counter">
        <div v-if="p_num && nofly" @touchend="counter(-1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="p_num" v-if="p_num && nofly">{{ p_num }}</div>
        <div @touchend="counter(1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions, mapMutations } from 'vuex';
import Animate from '../tools/animate';
import { getUserCookie } from '../util/userCookie';

export default {
  props: ['images', 'tags', 'title', 'price', 'desc', 'p_num', '_id', 'productId', 'nofly'],
  methods: {
    ...mapMutations(['storageChange']),
    ...mapActions(['addCart', 'deleteCart', 'getShopCat']),
    counter(num) {
      if (!getUserCookie().pin) {
        Toast('用户未登录');
        return;
      }
      if (this.p_num === 1 && num === -1) {
        // eslint-disable-next-line no-underscore-dangle
        this.deleteCart({ _id: this._id });
      } else {
        this.addCart({ productId: this.productId, num });
      }
      if (this.nofly) {
        return;
      }
      const { top, left } = this.$refs.img.getBoundingClientRect();
      const img = document.getElementById('shop-car');
      const { left: imgX, top: imgY } = img.getBoundingClientRect();
      const { offsetWidth, offsetHeight } = img;
      const { offsetHeight: height, offsetWidth: width } = this.$refs.img;
      const endX = imgX + offsetWidth / 2;
      const endY = imgY + offsetHeight / 2;
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width,
        height,
      });
    },
  },
};
</script>

<style lang="less">
.card-wrapper {
  width: 100%;
  display: flex;
  height: 100px;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      color: #ff1a90;
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
    .counter {
      display: flex;
      position: absolute;
      bottom: 12px;
      right: 15px;
      justify-content: flex-end;
      align-items: center;
      > div:not(.p_num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .p_num {
        padding: 0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
