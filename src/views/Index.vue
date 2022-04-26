<template>
  <div class="index">
    <van-nav-bar title="首页" @click-left="() => {}">
      <template #left>
        <van-icon name="location-o" size="35" />
        <span class="local">{{ local }}</span>
      </template>
    </van-nav-bar>
    <div class="swipe-box">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img
            class="swipe-img"
            :src="image.url"
            @click="toProductDesc(image.link)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="grid-box">
      <van-grid square>
        <van-grid-item
          v-for="value in 8"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </van-grid>
    </div>
    <div class="shopList">
      <div class="title">
        <span>
          <van-icon name="fire-o" />
          热销商品
        </span>
      </div>
      <van-list
        class="shopList-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有了"
        @load="onLoad"
        :immediate-check="true"
      >
        <van-image
          class="shopImg"
          v-for="item in goodsList"
          :key="item._id"
          radius="10"
          width="50%"
          :src="item.images[0]"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {},
  data() {
    return {
      local: '北京',
      images: [
        {
          url: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2018/06/13/anntw/4865080.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=760',
          link: '',
        },
        {
          url: 'http://n.sinaimg.cn/cq/transform/116/w550h366/20180719/qRBN-hfnsvza6289631.jpg',
          link: '',
        },
        {
          url: 'https://78jk.net/wp-content/uploads/2019/01/2019012708190010.jpg',
          link: '',
        },
      ],
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      total: 10,
    };
  },
  methods: {
    async onLoad() {
      console.log('执行了');
      try {
        const value = await this.$api.getAllGoodsList({
          page: this.page,
          size: this.size,
        });
        this.goodsList = [...this.goodsList, ...value.data];
        this.total = value.total;
        this.loading = false;
        if (this.goodsList.length >= this.total || this.page >= 10) {
          this.finished = true;
        } else {
          this.page += 1;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.index {
  background: #eee;
}
.swipe-box {
  padding: 10px;
}
.grid-box {
  margin: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}
.my-swipe {
  width: 100%;
  height: 150px;
  margin-top: 20px;
  border-radius: 10px;
}
.swipe-img {
  width: 100%;
  height: 100%;
}
.local {
  margin-left: 5px;
}
.my-swipe .van-swipe-item {
  width: 100%;
  height: 100%;
}
.shopList {
  min-height: calc(100vh - 350px);
  margin: 0 10px;
  padding: 20px 20px 50px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #fff;
  .title {
    width: 70%;
    margin-top: -20px;
    margin-left: -20px;
    span {
      display: inline-block;
      height: 30px;
      padding: 10px 10px 0px;
      font-size: 20px;
    }
  }
  &-list {
    padding: 20px 5px 0px;
    background: #fff;
    border-radius: 20px;
    .shopImg {
      height: 150px;
    }
  }
}
</style>
