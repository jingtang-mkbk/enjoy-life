import '../utils/request.js'

// 封装获取用户信息api
export const getUserInfo = () => {
	return uni.$u.http.get('userInfo')
}

// 修改用户信息
export const updateUserInfo = (data) => {
	return uni.$u.http.put('userInfo', data)
}