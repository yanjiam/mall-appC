<template>
  <div class="login">
    <div class="box">
      <div class="title">欢迎登录商城</div>
      <van-form
        class="form"
        validate-first
        @failed="onFailed"
        @submit="onSubmit"
      >
        <van-field
          v-model="pin"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ emailReg, message: '请输入正确的邮箱格式' }]"
        />
        <van-field
          v-model="passwd"
          name="passwd"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入正确内容' }]"
        />
        <div style="margin:55px 25px 25px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button>
        </div>
      </van-form>
      <span
        @click="
          () => {
            $router.push('/register');
          }"
      >没有账号？ 点我注册</span>
    </div>
  </div>
</template>

<script>
import { setCookie } from '../util/userCookie';

export default {
  data() {
    return {
      pin: '',
      passwd: '',
      emailReg: /^[\w-]+@[\w.-]+.com$/,
    };
  },
  methods: {
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
    async onSubmit(values) {
      try {
        const res = await this.$api.login(values.email, values.passwd);
        if (res.state === 0) {
          this.$store.commit('setUserInfo', res.data);
          const {
            username, pin, avatar, power,
          } = res.data;
          setCookie({
            username,
            pin,
            avatar,
            power,
          });
          this.$toast.success('登陆成功');
          this.$router.push('/home/my');
        } else {
          this.$toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100vh;
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0909%252F0bbda4a8j00qz5rdr003bc000hs012hc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653482727&t=8db4a18686b7ea9569e8a90ce46e33f1);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    padding: 20px;
    background: #fff;
    opacity: .95;
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 30px;
      font-weight: bold;
      font-size: 20px;
    }
    span {
      align-self: center;
    }
  }
}
</style>
