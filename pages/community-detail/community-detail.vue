<template>
	<view class="community-detail">
		<u-cell :title="detail.title">
			<view slot="label" class="custom-label">
				<text>{{detail.creatorName}}</text>
				<text>{{ detail.createdAt }}</text>
			</view>
		</u-cell>
		<!-- <rich-text class="content" :nodes="detail.content"></rich-text> -->
		<view class="content" v-html="detail.content"></view>
	</view>
</template>

<script>
	import {
		getCommunityDetail
	} from '@/api/home.js'
	export default {
		data() {
			return {
				detail: {}
			}
		},
		methods: {
			async loadCommunityDetail(id) {
				const res = await getCommunityDetail(id)
				this.detail = res.data
			}
		},
		onLoad(options) {
			this.loadCommunityDetail(options.id)
		}
	}
</script>

<style lang="scss" scoped>
	.community-detail {
	  ::v-deep .u-cell__body {
	    height: 144rpx;
	    padding: 24rpx 26rpx 24rpx 32rpx !important;
	
	    .u-cell__title-text {
	      font-size: 32rpx;
	      color: #333;
	      line-height: 1.5;
	    }
	  }
	
	  .custom-label {
	    color: #BDBDBD;
	    font-size: 24rpx;
	    line-height: 1.5;
	    margin-top: 11rpx;
	    display: flex;
	    justify-content: space-between;
	  }
	
	  .content {
	    padding: 30rpx;
	    color: #686868;
	    font-size: 28rpx;
	    line-height: 1.5;
	  }
	}
</style>