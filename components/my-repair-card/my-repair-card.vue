<template>
	<navigator class="card" :url="url">
		<view class="title">
			<h5>{{addr}}</h5>
			<view>
				<tag :text="repairStatusTxt2" :type="repairStatus" />
			</view>
		</view>
		<view class="txt" style="margin-top: 10rpx">
			<h5>报修项目</h5>
			<p>{{repairItem}}</p>
		</view>
		<view class="txt">
			<h5>预约时间</h5>
			<p>{{appointment}}</p>
		</view>
		<view class="txt">
			<h5>电话号码</h5>
			<p>{{mobile}}</p>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"my-repair-card",
		props:{
			addr: {
				type: String,
				default: "北京富力家园1单元101室"
			},
			repairStatusTxt: {
				type: Number,
				default: "上门中"
			},
			repairItem: {
				type: String,
				default: "水暖"
			},
			appointment: {
				type: String,
				default: "2022/08/13"
			},
			mobile: {
				type: String,
				default: "13777777777"
			},
			url: {
				type: String,
				required: true
			}
		},
		computed:{
			repairStatusTxt2() {
				switch(this.repairStatusTxt) {
					case 0: return "已取消"
					case 1: return "受理中"
					case 2: return "上门中"
					case 3: return "已完成"
				}
			},
			repairStatus() {
				switch(this.repairStatusTxt) {
					case 0: return "default"
					case 1: return "primary"
					case 2: return "success"
					case 3: return "warning"
				}
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss" scoped>
.card{
	width: 100%;
	height: 311rpx;
	background-color: #fff;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	
	.title{
		height: 96rpx;
		border: 1rpx solid #F2F2F6;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.txt{
		padding: 12rpx 30rpx;
		display: flex;
		justify-content: space-between;
		
		h5{
			color: #c3c3c5;
		}
		p{
			color: #686868;
		}
	}
}

</style>