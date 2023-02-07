<template>
	<view>
		<view class="user_base">
		  <view class="left">
		    <image :src="userInfo.avatar || '../../static/icon/banner.png'" />
		    <text>{{ userInfo.nickName || '微信用户' }}</text>
		  </view>
		  <view class="right" @click="goUserInfo">
		    <text>去完善信息</text>
		    <image src="../../static/icon/right.png"></image>
		  </view>
		</view>
		<view class="links">
		  <u-cell-group>
		    <u-cell :border="false" isLink title="我的房屋" url="/pkg-house/house/house">
		      <image class="left-icon" slot="icon" src="../../static/icon/myhouse.png" />
		    </u-cell>
		    <u-cell :border="false" isLink title="我的报修" url="/pkg-my-repair/my-repair/my-repair">
		      <image class="left-icon" slot="icon" src="../../static/icon/myrepair.png" />
		    </u-cell>
		    <u-cell :border="false" isLink title="访客记录">
		      <image class="left-icon" slot="icon" src="../../static/icon/myfriends.png" />
		    </u-cell>
		  </u-cell-group>
		</view>
		<u-button type="primary" text="退出账号" @click="logout"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
		  userInfo() {
		    return this.$store.state.user.userInfo
		  }
		},
		methods: {
			logout() {
				uni.showModal({
					title: "享+生活",
					content: "确认退出账号",
					confirmText: "退出",
					success: (res) => {
						if (res.confirm) {
							this.$store.commit('user/setUserToken', null)
							uni.removeStorageSync('userToken')
							uni.navigateTo({
								url: "/pages/login/login"
							})
						}
					}
				})
			},
			goUserInfo() {
				uni.navigateTo({
					url: "/pages/userInfo/userInfo"
				})
			}
		},
		onLoad() {
		  this.$store.dispatch('user/loadUserInfo')
		}
	}
</script>

<style lang="scss" scoped>
.user_base {
  width: 750rpx;
  height: 482rpx;
  padding: 128rpx 40rpx 0px 40rpx;
  border-radius: 0px 0px 60px 60px;
  background: #6394C0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  .left {
    height: 80rpx;
    display: flex;
    align-items: center;

    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }

    text {
      color: #fff;
      font-size: 40rpx;
      margin-left: 20rpx;
    }
  }

  .right {
    height: 80rpx;
    display: flex;
    align-items: center;

    text {
      color: #fff;
      font-size: 28rpx;
      margin-right: 10rpx;
    }

    image {
      width: 32rpx;
      height: 32rpx;
    }
  }
}

::v-deep .u-button {
  width: 670rpx !important;
  margin: 25rpx auto;
  background-color: #6394C0 !important;
  border: none;
}

.links {
  width: 670rpx;
  height: 306rpx;
  background-color: #fff;
  border-radius: 16rpx;
  margin: 0 auto;
  margin-top: -136rpx;

  ::v-deep .u-cell__body {
    padding: 0 25rpx;
    height: 102rpx;

    .u-cell__title-text {
      color: #3C3E42 !important;
      font-size: 28rpx !important;
    }
  }

  .left-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 25rpx;
  }
}
</style>