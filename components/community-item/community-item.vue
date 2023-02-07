<template>
	<view class="community" @click="navigatorTo">
			<view class="title">
				{{title}}
			</view>
	
			<view class="info">
				{{info}}
			</view>
	
			<view class="pub_date">
				{{pub_date}}
			</view>
		</view>
</template>

<script>
	export default {
		name:"community-item",
		props: {
			title: {
				type: String,
				required: true
			},
			info: {
				type: String,
				required: true
			},
			pub_date: {
				type: String,
				required: true
			},
			url: {
				type: String
			},
			type: {
				type: String,
				default: 'navigateTo'
			}
		},
		data() {
			return {
			};
		},
		methods: {
			navigatorTo() {
				const allow = ['switchTab', 'navigateTo']
				if (!this.url) return 
				if (!allow.includes(this.type)){
					throw new Error( this.$options.name + '组件：type类型不在' + allow.join('、') + '合法跳转类型中' )
				}
				uni[this.type]({
					url: this.url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.community {
		width: 100%;
		height: 320rpx;
		background-color: #fff;
		border-radius: 16rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
		padding: 30rpx;

		.title {
			font-size: 32rpx;
			color: #333;
			line-height: 1.5;
		}

		.info {
			margin-top: 20rpx;
			color: #686868;
			font-size: 28rpx;
			line-height: 1.5;
		}

		.pub_date {
			color: #BDBDBD;
			font-size: 24rpx;
			margin-top: 30rpx;
			line-height: 1.5;
		}
	}
</style>