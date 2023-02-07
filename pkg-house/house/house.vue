<template>
	<view class="house">
		<life-empty url="/pkg-house/add-house/add-house" tip="您还没有认证房屋，请点击"></life-empty>
		
		<view class="house-list">
			<house-item></house-item>
			<house-item></house-item>
			<house-item></house-item>
			<house-item></house-item>
		</view>
	</view>
</template>

<script>
	export default {
		name: "house",
		data() {
			return {
				
			}
		},
		methods: {
			onClick() {
				console.log('popup')
			}
		}
	}
</script>

<style lang="scss" scoped>
.house {
		height: 100%;
		background-color: #FAFAFA;
		
		.house-list {
			padding: 40rpx;
		}
	}
</style>
