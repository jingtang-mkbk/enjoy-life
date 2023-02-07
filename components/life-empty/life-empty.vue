<template>
	<view class="empty">
		<view class="box">
			<image :src="icon" />
			<view class="tipText">
				<text>{{tip}}</text>
				<text @click="onClickLink">{{ linkText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "life-empty",
		props: {
			icon: {
				type: String,
				default: '../../static/icon/缺省.png'
			},
			tip: {
				type: String,
				require: true
			},
			linkText: {
				type: String,
				default: '添加'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClickLink() {
				// #ifdef H5
				if (this.$listeners['click-test']) {
					this.$emit('click-text')
				} else {
					if (!this.url) return 
					uni.navigateTo({
						url: this.url
					})
				}
				// #endif
				
				// #ifdef MP-WEIXIN
				if (this.url) {
					uni.navigateTo({
						url: this.url
					})
				} else {
					this.$emit('click-text')
				}
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty {
		overflow: hidden;

		.box {
			width: 670rpx;
			height: 330rpx;
			border-radius: 16px;
			background: #FFFFFF;
			margin: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				width: 128rpx;
				height: 128rpx;
			}

			.tipText {
				display: flex;
				font-size: 26rpx;

				text {
					color: #C3C3C5;
					font-weight: regular;

					line-height: 1.5;
					letter-spacing: 0px;
					text-align: center;
				}

				text:nth-child(2) {
					color: #6392bd;
					margin-left: 15rpx;
				}
			}
		}
	}
</style>
