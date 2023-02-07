<template>
	<view class="home">
		<view class="top">
			<view class="nav">
				<navigator url="/pkg-house/house/house">
					<image src="../../static/icon/house.png" />
					<text>我的房屋</text>
				</navigator>
				<navigator url="../../pkg-my-repair/my-repair/my-repair">
					<image src="../../static/icon/在线报修.png" />
					<text>在线报修</text>
				</navigator>
				<navigator>
					<image src="../../static/icon/访客邀请.png" />
					<text>访客邀请</text>
				</navigator>
			</view>
			<image class="banner" src="../../static/icon/banner.png"></image>
		</view>
		<view class="msg">
			<view class="title">
				<image src="../../static/icon/社区公告.png" mode=""></image>
				<text>社区</text>
				<text>公告</text>
			</view>
		</view>
		<view class="list">
		  <community-item :url="'/pages/community-detail/community-detail?id=' + item.id" :title="item.title"
		    :info="item.content" :pub_date="item.createdAt" v-for="item in list" :key="item.id">
		  </community-item>
		</view>
	</view>
</template>

<script>
	import { getCommunityList } from '@/api/home.js'
	
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			async loadCommunityList() {
				const res = await getCommunityList()
				this.list = res.data
			}
		},
		onLoad() {
			this.loadCommunityList()
		}
	}
</script>

<style lang="scss" scoped>
.home {
	 
  .top {
    height: 452rpx;
    width: 750rpx;
    background-color: #D2DDE8;
    overflow: hidden;

		.nav {
			width: 670rpx;
			height: 164rpx;
			border-radius: 16rpx;
			background-color: #fff;
			margin: 25rpx auto;
			display: flex;
			
			navigator {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				image {
					width: 60rpx;
					height: 60rpx;
				}
				
				text {
					font-size: 24rpx;
					color: #686868;
					line-height: 30rpx;
					margin-top: 14rpx;
				}
			}
    }

		.banner {
			width: 670rpx;
			height: 240rpx;
			display: block;
			margin: 0 auto;
			position: relative;
			// z-index: 2;
		}
  }

	.msg {
		height: 300rpx;
		border-radius: 20rpx;
		background-color: #FBFBFF;
		margin-top: -62rpx;
		padding: 0 40rpx;
	 
	  .title {
			padding-top: 100rpx;
			display: flex;
			align-items: center;
			
			image {
				width: 48rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
			
			text {
				font-size: 36rpx;
				
				&:first-child{
					color: #333333;
				}
				
				&:nth-child(2) {
					color: #ebbb83;
				}
 			}
	  }
	}

	.list {
		
	}
}
</style>