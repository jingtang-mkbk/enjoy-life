import '../utils/request.js'

// 报修列表
export const getRepairList = ({ current, pageSize }) => {
	return uni.$u.http.get('repair', {
		params: {
			current,
			pageSize
		}
	})
}

// 报修详情
export const getRepairDetail = (repairItemId) => {
	return uni.$u.http.get('repair/' + repairItemId)
}