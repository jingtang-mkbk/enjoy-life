<template>
		<view class="repair-detail">
			<view class="repair-map" v-if="status===2">
				
			</view>
			<!-- 房屋信息 -->
			<view class="title">
				<p>房屋信息</p>
			</view>
			<u-cell-group>
				<u-cell title="北京三旗花园1号楼101">
					<tag slot="value" :text="tagTxt ? tagTxt : '上门中'" :type="tagStatus ? tagStatus : 'default'"/>
				</u-cell>
			</u-cell-group>
			<!-- 报修信息 -->
			<view class="title">报修信息</view>
			<view class="repair-info">
				<view class="repair-info-cell" v-for="(it,index) in list" :key="index">
					<view class="label">{{it.label}}</view>
					<view class="txt">{{it.txt}}</view>
				</view>
				<view class="repair-description">
					<view class="">
						问题描述
					</view>
					<view class="txt2">
						{{description}}
					</view>
				</view>
			</view>
			<!-- 取消 完成不显示该 -->
			<view class="annex" v-if="picFlag">
				<text>问题附件</text>
				<view class="pic">
					<img :src="pic" alt="">
				</view>
			</view>
		</view>
</template>

<script> 
	import { getRepairDetail } from '@/api/repair.js'

	export default {
		props: {
			description: {
				type: String,
				required: true
			},
			
		},
	  data() {
	    return {
	      list: [
					{ label: '维修项目' , txt: '水暖' }, 
					{ label: '手机号码', txt: '18900000000' }, 
					{ label: '预约日期', txt: '2023/01/06' },
				],
				description: '',
				pic: '',
				status: null
	    };
	  },
		computed: {
			tagTxt() {
				switch(this.status) {
					case 0: return "已取消"
					case 1: return "受理中"
					case 2: return "上门中"
					case 3: return "已完成"
				}
			},
			tagStatus() {
				switch(this.status) {
					case 0: return "default"
					case 1: return "primary"
					case 2: return "success"
					case 3: return "warning"
				}
			},
			picFlag() {
				switch(this.status){
					case 0: return false
					case 3: return false
					default: return true
				}
			}
		},
		onLoad({id}) {
			this.getDetail(id)
		},
	  methods: {
			async getDetail(id) {
				const { data } = await getRepairDetail(id)
				this.list[0].txt = data.repairItemName
				this.list[1].txt = data.mobile
				this.list[2].txt = data.appointment
				this.description = data.description
				this.pic = data.attachment[0].url
				this.status = data.status
			},
	  }
	};
</script>

<style lang="scss" scoped>
	.repair-detail{
		width: 750rpx;
		height: 100vh;
		background-color: #FAFAFA;
		
		.repair-map{
			height: 440rpx;
			width: 100%;
		}
		
		.title{
			color: #ccc;
			font-size: 30rpx;
			padding: 20rpx 30rpx;
		}
		
		::v-deep .u-cell-group__wrapper{
			background-color: #fff;
		}
		
		.repair-info{
			width: 100%;
			
			.repair-info-cell{
				height: 90rpx;
				width: 750rpx;
				box-sizing: border-box;
				padding: 20rpx 30rpx;
				border-bottom: #FAFAFA 1rpx solid;
				background-color: #fff;
				display: flex;
				align-items: center;
				
				.label{
					width: 200rpx;
				}
				
				.txt{
					flex: 1;
					
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.repair-description{
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx 30rpx;
				background-color: #fff;
				border-bottom: #FAFAFA 1rpx solid;
				
				.txt2{
					margin-top: 20rpx;
					font-size: 28rpx;
				}
			}
		}
		
		.annex{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			
			.pic{
				margin-top: 20rpx;
				width: 160rpx;
				height: 160rpx;
				
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>