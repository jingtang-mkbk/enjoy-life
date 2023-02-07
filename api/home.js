import '../utils/request.js'

// 获取公告列表
export const getCommunityList = () => {
	return uni.$u.http.get('announcement')
}

// 获取公告详情
export const getCommunityDetail = (id) => {
	return uni.$u.http.get('announcement/' + id)
}