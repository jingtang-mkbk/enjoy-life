<template>
  <view class="login">
    <view class="slogan">
      <text>您好</text>
      <text>加入享+，让生活更轻松</text>
    </view>

    <!-- 表单 -->
    <u--form :rules="rules" :model="form" labelPosition="left" ref="uForm">
      <u-form-item prop="mobile" borderBottom ref="item1">
        <u--input maxlength="11" v-model="form.mobile" placeholder-style="color:#979797" placeholder="请输入手机号" border="none"></u--input>
        <block slot="right">
          <u-count-down @finish="Onfinish" v-if="isShow" :time="60 * 1000" format="ss s"></u-count-down>
          <view @click="getCode" v-else class="code-btn">获取验证码</view>
        </block>
      </u-form-item>
      <u-form-item prop="code" borderBottom ref="item1">
        <u--input maxlength="6" v-model="form.code" placeholder-style="color:#979797" placeholder="请输入6位的验证码" border="none"></u--input>
      </u-form-item>
    </u--form>
    <view class="tip">未注册手机号经验证后将自动注册</view>
    <life-button @click="onLogin" bgColor="#5591AF" color="#fff" icon="../../static/icon/login.png">登录</life-button>
    <!-- 模拟短信登录 -->
    <u-notify ref="uNotify" @click.native="copyCode"></u-notify>
  </view>
</template>

<script>
import { sendCode, login } from '@/api/login.js';
export default {
  data() {
    return {
      form: {
        mobile: '18900000000',
        code: ''
      },
      code: '',
      isShow: false,
      rules: {
        // 字段名称
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['change', 'blur']
          },
          {
            pattern: /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/,
            message: '手机号格式不正确',
            trigger: ['change', 'blur']
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['change', 'blur']
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确',
            trigger: ['change', 'blur']
          }
        ]
      }
    };
  },
  methods: {
    getCode() {
      // 校验手机号，手机号校验成功才发送验证码
      this.$refs.uForm.validateField('mobile', async errorsRes => {
        // console.log(errorsRes);
        if (errorsRes.length) return;
        const res = await sendCode(this.form.mobile);
        console.log(res);
        const message = `【享+生活】验证码：${res.data.code}.您正在使用短信验证码功能，验证码提供他人可能导致账号被盗，请勿转发或泄漏。`;
        // data中定义code
        this.code = res.data.code;
        this.$refs.uNotify.show({
          top: 10,
          type: 'success',
          message: message,
          duration: 1000 * 6,
          fontSize: 12
        });
        // 震动
        uni.vibrateLong();
        // 显示倒计时
        this.isShow = true;
      });
    },
    // 复制验证码
    copyCode() {
      uni.setClipboardData({
        data: this.code
      });
    },
    // 倒计时结束
    Onfinish() {
      this.isShow = false;
    },
    async onLogin() {
      try {
        await this.$refs.uForm.validate();
        const res = await login(this.form);
        // console.log(res.data);
        // 存储vuex
        this.$store.commit('user/setUserToken', res.data);
        // 存储本地
        uni.setStorageSync('userToken', res.data);
        uni.switchTab({
          url: '/pages/my/my'
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding: 0 30rpx;
  .slogan {
    padding: 50rpx 30rpx;
    display: flex;
    flex-direction: column;

    text:nth-child(1) {
      color: #333333;
      font-weight: medium;
      font-size: 48rpx;
      line-height: 72rpx;
      letter-spacing: 0rpx;
      text-align: left;
    }
    text:nth-child(2) {
      color: #333333;
      font-weight: regular;
      font-size: 30rpx;
      line-height: 1.5;
      letter-spacing: 0rpx;
    }
  }
  ::v-deep .u-form {
    color: #979797;
    margin-top: 22rpx;
    .code-btn {
      color: #5591af;
      font-size: 30rpx;
    }
    .u-form-item {
      .u-form-item__body {
        height: 103rpx;
        padding: 0;
      }
      .u-form-item__body__right__message {
        margin-left: 0 !important;
      }
    }
  }
  .tip {
    color: #c3c3c5;
    font-size: 26rpx;
    line-height: 40rpx;
    margin-top: 30rpx;
  }
  // .login-btn {
  //   width: 750rpx;
  //   height: 213rpx;
  //   background-color: #5591af;
  //   position: fixed;
  //   bottom: 0;
  //   left: 0;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;

  //   image {
  //     width: 50rpx;
  //     height: 50rpx;
  //     margin-bottom: 20rpx;
  //   }
  //   text {
  //     font-size: 30rpx;
  //     color: #fff;
  //   }
  // }
}
</style>
