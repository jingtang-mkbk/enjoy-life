import '../utils/request.js'

// 发送验证码
export const sendCode = (mobile) => {
	return uni.$u.http.get('/code', {
		params: {
			mobile
		}
	})
}

// 登录
export const login = data => {
  // 基本用法，注意：post的第三个参数才为配置项
  return uni.$u.http.post('/login', data)
}