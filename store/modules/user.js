import {
	getUserInfo
} from '@/api/user.js'
export default {
	namespaced: true,
	state: {
		userToken: uni.getStorageSync('userToken'),
		userInfo: {}
	},
	mutations: {
		setUserToken(state, payload) {
			state.userToken = payload
		},
		setUserInfo(state, payload) {
			state.userInfo = payload
		}
	},
	actions: {
		async loadUserInfo(context) {
			const res = await getUserInfo()
			// console.log(res)
			context.commit('setUserInfo', res.data)
		}
	},
	getters: {},
}
