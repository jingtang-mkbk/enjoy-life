<template>
	<view class="repair">
		<my-repair-card 
			v-for="it in repairList" 
			:key="it.id"  
			:addr="it.houseInfo"
			:repairStatusTxt="it.status"
			:repairItem="it.repairItemName"
			:appointment="it.appointment"
			:mobile="it.mobile"
			:url="`/pkg-my-repair/repair-detail/repair-detail?id=${it.id}`"
		/>
		<life-button @click="repair" bgColor="#fff" color="#000" icon="../../static/icon/repair.png">在线报修</life-button>
	</view>
</template>

<script>
	import { getRepairList } from '@/api/repair.js'
	
	export default{
		data() {
			return {
				repairList: []
			}
		},
		onLoad() {
			this.getRepairLists()
		},
		methods: {
			async getRepairLists() {
				const { data: { rows } } = await getRepairList({current: '1', pageSize: '10'})
				this.repairList = rows
			},
			repair() {
				uni.navigateTo({
					url: '/pkg-my-repair/edit-repair-info/edit-repair-info'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.repair{
		padding: 40rpx 40rpx 233rpx 40rpx;
		background-color: #FAFAFA;
	}
</style>