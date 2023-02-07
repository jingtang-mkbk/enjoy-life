<template>
	<view>
	    <u-swipe-action>
	      <u-swipe-action-item
	          :options="options"
	        >
				<view class="house-item">
					<view class="title">
						<view class="left">
							北京富力家园
						</view>
						<view class="right">
							<view class="success">
								审核通过
							</view>
							<!-- <view class="waiting">
								审核中
							</view>
							<view class="error">
								审核通过
							</view> -->
						</view>
					</view>
					<view class="content">
						<view class="number">
							<text>房间号</text>
							<text>1号楼1单元101室</text>
						</view>
						<view class="name">
							<text>业主</text>
							<text>张三</text>
						</view>
					</view>
				</view>
	        </u-swipe-action-item>
	      </u-swipe-action>
	</view>
		

</template>

<script>
	export default {
		name: "house-item",
		data() {
			return {
				options: [{
                    text: '删除',
					style: {
						backgroundColor: '#CC655E'
					}
                }]
			};
		}
	}
</script>

<style lang="scss">
	.house-item {
		width: 100%;
		height: 249rpx;
		border-radius: 16rpx;
		background: #FFFFFF;
		
		.title {
			height: 96rpx;
			border-bottom: 1rpx solid #F2F2F6;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				font-size: 30rpx;
				color: #333;
			}

			.right {
				.success {
					width: 128rpx;
					height: 48rpx;
					color: #27AE60;
					border-radius: 10rpx;
					background: #EBF8F0;
					font-size: 24rpx;
					line-height: 48rpx;
					text-align: center;
				}

				.waiting {
					width: 104rpx;
					height: 48rpx;
					border-radius: 10rpx;
					background: #E5F0FB;
					text-align: center;
					line-height: 48rpx;
					font-size: 24rpx;
					color: #2D9CDB;
				}

				.error {
					width: 128rpx;
					height: 48rpx;
					color: #EB5757;
					border-radius: 10rpx;
					background: #FCF2ED;
					font-size: 24rpx;
					line-height: 48rpx;
					text-align: center;
				}
			}
		}

		.content {
			height: 152rpx;
			padding: 24rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			view {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;

				text:nth-child(1) {
					color: #C3C3C5;
				}

				text:nth-child(2) {
					color: #686868;

				}
			}
		}
	}
</style>
