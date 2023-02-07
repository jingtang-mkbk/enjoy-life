<template>
	<view :class="isFixed? 'isFixed' : ''" @click="$emit('click')" :style="{
		backgroundColor: bgColor,
		color: color
	}" class="life-button">
		<image v-if="icon" :src="icon" />
		<text>
			<slot />
		</text>
	</view>
</template>

<script>
	export default {
		name: "life-button",
		props: {
			bgColor: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#000'
			},
			icon: {
				type: String
			},
			isFixed: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.isFixed {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.life-button {
		width: 750rpx;
		height: 213rpx;
		// background: #5591AF;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		image {
			width: 50rpx;
			height: 50rpx;
			margin-bottom: 20rpx;
		}

		text {
			font-size: 30rpx;
			// color: #fff;
		}
	}
</style>
