export const baseURL = ()=>{
	// #ifdef MP-WEIXIN
	const ACCOUNT_INFO = uni.getAccountInfoSync() // 获取微信 信息对象
	const ENV_VERSION = ACCOUNT_INFO.miniProgram.envVersion //获取信息 对象的 运行环境标识
	let baseUrl
	if (ENV_VERSION == 'develop') {
		baseUrl = 'https://txmg.36sm.cn'
	} else if (ENV_VERSION == 'trial') {
		baseUrl = 'https://txmg.36sm.cn'
	} else if (ENV_VERSION == 'release') {
		baseUrl = 'https://txmg.36sm.cn'
	}
	return {baseUrl}
	// #endif
	// #ifndef MP-WEIXIN
	let baseUrl = 'https://txmg.36sm.cn'
	return {baseUrl}
	// #endif
}
