<template>
	<view class="choose-community">
		<view class="current-location">
			<view class="title">
				当前地点
			</view>
			<view class="content">
				<text>{{currentLocation}}</text>
				<view>
					<image src="../../static/icon/locate.png" />
					<text @click="chooseLocation">重新定位</text>
				</view>
			</view>
		</view>

		<view class="community">
			<view class="title">
				附近社区
			</view>
			<u-cell-group>
				<u-cell v-for="it in communityList" :key="it.id" :title="it.title" isLink url="/pkg-house/select-building/select-building"></u-cell>
			</u-cell-group>
		</view>
		
		<map :scale="16" :markers="markers" id="map" :longitude="location.longitude" :latitude="location.latitude"></map>
	</view>
</template>

<script>
	import qqmapwx from '../../utils/initQQmap.js'
	export default {
			data() {
				return {
					location: {
						longitude: 0,
						latitude: 0
					},
					markers: [{
						id: 1,
						longitude: 0,
						latitude: 0
					}],
					currentLocation: '定位中...',
					communityList: []
				};
			},
			onLoad() {
			  // 初始化定位，定位的逻辑中需要用到实例
			  this.initLocation()
			},
			methods: {
				// 初始化定位
				initLocation() {
				  // 进行定位
				  uni.getLocation({
				    type: 'gcj02',
				    isHighAccuracy: 'true',
				    success: (res) => {
				      this.updateLocation(res)
				      // 用于坐标解析
				      this.initLocationText()
							this.searchCommunity()
				    },
				    fail(err) {
				      console.log(err)
				    }
				  })
				},
				// 将坐标解析文本
				initLocationText() {
				  console.log(qqmapwx)
					qqmapwx.reverseGeocoder({
						location: this.location,
						success: (res, data) => {
							this.currentLocation = res.result.address
						}
					})
				},
				chooseLocation() {
					uni.chooseLocation({
						...this.location,
						success: (res) => {
							if(!res.name) return 
							this.currentLocation = res.name
							this.updateLocation(res)
							this.searchCommunity()
						}
					})
				},
				updateLocation(res) {
					this.location.longitude = res.longitude
					this.location.latitude = res.latitude
					this.markers[0].longitude = res.longitude
					this.markers[0].latitude = res.latitude
				},
				searchCommunity() {
					qqmapwx.search({
						location: this.location,
						keyword: '小区住宅',
						page_size: 10,
						success: (res) => {
							this.communityList = res.data
							res.data.forEach(it => {
								this.markers.push({
									id: it.id - 0,
									longitude: it.location.lng,
									latitude: it.location.lat,
									width: 20,
									height: 20,
									iconPath: '/static/icon/house.png',
									title: it.title
								})
							})
						}
					})
				}
			}
		}
</script>

<style lang="scss">
	.choose-community {
		height: 100%;
		background-color: #FAFAFA;

		.current-location {
			.title {
				padding: 0 30rpx;
				line-height: 86rpx;
			}

			.content {
				width: 750rpx;
				height: 102rpx;
				background-color: #fff;
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 28rpx;
					color: #333;
				}

				view {
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 6rpx;
					}

					text {
						color: #5591AF;
					}
				}
			}
		}

		.community {
			.title {
				padding: 0 30rpx;
				line-height: 86rpx;
			}

			::v-deep .u-cell__body {
				background-color: #fff;
			}
		}
		
		#map{
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
