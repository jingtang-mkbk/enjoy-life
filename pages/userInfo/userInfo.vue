<template>
	<view class="userInfo">
		<u-cell-group>
			<u-cell title="头像" isLink>
				<button class="chooseAvatarBtn" open-type="chooseAvatar" slot="value" @chooseavatar="onChooseAvatar">
					<image class="avatar" :src="userInfo.avatar" />
				</button>
			</u-cell>
			<u-cell title="昵称">
				<input confirm-type="send" @blur="updateNickName" type="nickname" :value="userInfo.nickName"
					placeholder="请填写昵称" class="nickName" slot="value" />
			</u-cell>
		</u-cell-group>

		<life-button @click="goBack" icon="../../static/icon/confirm.png">
			确认
		</life-button>
	</view>
</template>

<script>
	import {
		updateUserInfo
	} from '@/api/user.js'
	export default {
		data() {
			return {

			}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo
			}
		},
		methods: {
			// 用户选择头像
			onChooseAvatar(e) {
				const avatar = e.detail.avatarUrl

				uni.uploadFile({
					url: 'https://live-api.itheima.net/upload',
					filePath: avatar,
					name: 'file',
					header: {
						Authorization: 'Bearer ' + this.$store.state.user.userToken.token
					},
					formData: {
						type: 'avatar'
					},
					success: async (res) => {
						const data = JSON.parse(res.data)
						if (data.code !== 10000) {
							return uni.showToast({
								icon: 'error',
								title: '上传失败'
							})
						}

						await this.$store.dispatch('user/loadUserInfo')
						uni.showToast({
							icon: 'success',
							title: '上传成功'
						})
					}
				})
			},
			// 更新昵称
			async updateNickName(e) {
				const value = e.detail.value
				try {
					await updateUserInfo({
						nickName: value
					})

					await this.$store.dispatch('user/loadUserInfo')
					uni.showToast({
						icon: 'success',
						title: '更新昵称成功'
					})
				} catch (err) {

				}
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userInfo {
		height: 100%;
		background-color: #FAFAFA;

		::v-deep .u-cell__body {
			height: 102rpx;
			padding: 0 30rpx;
			background-color: #fff;

			.u-cell__title-text {
				color: #333 !important;
				font-size: 28rpx !important;
			}
		}

		.chooseAvatarBtn::after,
		.chooseAvatarBtn {
			background-color: unset;
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.avatar {
			width: 42rpx;
			height: 42rpx;
			border-radius: 50%;
		}

		.nickName {
			text-align: right;
		}
	}
</style>
