import store from '@/store/index.js'

uni.$u.http.setConfig((config) => {
	/* config 为默认全局配置*/
	config.baseURL = `https://live-api.itheima.net/`; /* 根域名 */
	return config
})

// 请求拦截器
uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	config.header = {
		...config.header,
		Authorization: 'Bearer ' + store.state.user.userToken?.token
	}
	uni.showLoading({
		title: '请求中...'
	})
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

// 响应拦截器
uni.$u.http.interceptors.response.use((response) => {
	uni.hideLoading()
	return response.data
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(response)
	return Promise.reject(response)
})
