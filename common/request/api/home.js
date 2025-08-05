import api from '../index.js'

//数据总览
export const getOrderOverview = param => api({
	url:`/app-api/post/shop/order/overview`,
	param
})

//门店订单分页查询/洗衣管理
export const getOrderPage = param => api({
	url:`/app-api/post/shop/order/page`,
	param
})

//门店-一键送洗
export const postUpdateOrderLaundry = param => api({
	url:`/app-api/post/shop/order/updateOrderLaundry`,
	method:"POST",
	param
})

//司机投递-扫码入库
export const postOrderDelivery = param => api({
	url:`/app-api/post/shop/order/driver/delivery`,
	method:"POST",
	param
})
/**
 * 获取羊只品种库存列表
 * @param {type} param 
 * @returns 羊只品种库存列表
 */
export const getSheepInventory = param => api({
	url:`/xmWeb/api/sheep/operation/inventory`,
	param
})
/**
 * 羊羔数量增加
 * @param {*} param 
 * @returns 
 */
export const addLambSheep = param => api({
	url:`/xmWeb/api/sheep/operation/lamb/add`,
	method:"POST",
	param
})
/**
 * 羊羔数量减少
 * @param {*} param 
 * @returns 
 * auth: c_shunyi 2025-08-04
 */
export const reduceLambSheep = param => api({
	url:`/xmWeb/api/sheep/operation/lamb/reduce`,
	method:"POST",
	param
})
/**
 * 大羊数量维护
 * @param {*} param 
 * @returns 
 */
export const bigSheepManage = param => api({
	url:`/xmWeb/api/sheep/operation/adult/maintain`,
	method:"POST",
	param
})


