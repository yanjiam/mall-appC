<template>
  <div class="login">
    <div class="box">
      <div class="title">{{ this.title }}</div>
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
          aria-disabled=""
          placeholder="请输入邮箱"
          :rules="[{ pattern, message: '请输入正确的邮箱格式' }]"
        />
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="passwd"
          name="passwd"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true }]"
        />
        <van-field name="fileList" label="头像">
          <template #input>
            <van-uploader
              v-model="fileList"
              :after-read="afterRead"
              :before-delete="beforeDelete"
              max-count="1"
            />
          </template>
        </van-field>
        <div style="margin: 55px 25px 25px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            :disabled="isloading"
            >{{ this.btnText }}</van-button
          >
        </div>
      </van-form>
      <span
        @click="
          () => {
            $router.push('/register');
          }"
        >没有账号？ 点我注册</span
      >
    </div>
  </div>
</template>

<script>
import { setCookie } from "../util/userCookie";

export default {
  data() {
    return {
      title: "新用户注册",
      btnText: "提交",
      username: "",
      avatar: "",
      fileList: [],
      pin: "",
      passwd: "",
      pattern: /^[\w-]+@[\w.-]+.com$/,
      isloading: false,
    };
  },
  methods: {
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    async onSubmit(values) {
      try {
        if (this.$route.query.pin) {
          const res = await this.$api.changeInfo(
            values.email,
            values.passwd,
            values.username,
            this.avatar
          );
          if (res.state === 0) {
            this.$store.commit("setUserInfo", res.data);
            const { username, pin, avatar, power } = res.data;
            setCookie({
              username,
              pin,
              avatar,
              power,
            });
            this.$toast.success("修改成功");
            this.$router.push("/home/my");
          } else {
            this.$toast(res.msg);
          }
        } else {
          const res = await this.$api.register(
            values.email,
            values.passwd,
            values.username,
            this.avatar
          );
          if (res.state === 0) {
            this.$toast.success("注册成功");
            this.$router.push("/home/my");
          } else {
            this.$toast(res.msg);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    async init() {
      if (this.$route.query.pin) {
        this.title = "修改个人信息";
        this.btnText = "修改";
        const res = await this.$api.queryInfo(this.$route.query.pin);
        if (res.state === 0) {
          this.pin = res.data.pin;
          this.username = res.data.username;
          this.passwd = res.data.passwd;
          this.avatar = res.data.avatar;
          this.fileList.push({ url: res.data.avatar });
        } else {
          this.$toast("网络异常，请重试~");
          setTimeout(() => {
            this.$router.goBack();
          }, 200);
        }
      } else {
        this.title = "新用户注册";
        this.btnText = "注册";
        this.email = "";
        this.username = "";
        this.passwd = "";
        this.avatar = "";
      }
    },
    async afterRead(file) {
      this.isloading = true;
      const param = new FormData();
      param.append("avatar", file.file);
      const res = await this.$api.upload(param);
      if (res.status === "success") {
        this.$toast("上传成功");
        this.avatar = res.data.url;
        this.isloading = false;
      } else {
        file.status = "failed";
        file.message = "上传失败";
      }
    },
    beforeDelete() {
      this.fileList = [];
    },
  },
  created() {
    this.init();
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
    opacity: 0.95;
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
