import api from '../index.js'

// 获取当前登录用户的基本信息
export const getLoginBaseInfo = param => api({
	url:`/xmWeb/v1/mb/login/base/info`,
	param
})

// 平台会员反馈
export const postFeedbackSave = param => api({
	url:`/xmWeb/v1/mb/feedback/save`,
	method:'POST',
	param
})

// 平台消息列表
export const getMessageList = param => api({
	url:`/xmWeb/v1/mb/message/get/page/list`,
	param
})

// 获取会员认证信息
export const getInfoMemberId = param => api({
	url:`/xmWeb/mb/auth/info/memberId`,
	param
})
/**
 * 获取操作记录列表
 * @param {*} param 
 * @returns 
 */
export const getRecordList = param => api({
	url:`/xmWeb/api/sheep/operation/record/list`,
	param
})
/**
 * 获取羊只库存列表
 * @param {*} param 
 * @returns 
 */
export const getInventoryList = param => api({
	url:`/xmWeb/api/sheep/operation/inventory`,
	param
})

