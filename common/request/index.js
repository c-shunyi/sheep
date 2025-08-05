import { baseURL } from '@/env.js'
const { baseUrl } = baseURL()
const headers = {}
headers['Content-Type'] = 'application/json'
headers['Access-Control-Allow-Origin'] = '*'
// headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
let api = (data) => {
	var token = uni.getStorageSync('token')
	if (token) {
		headers['Authorization'] = token
	} else {
		headers['Authorization'] = ''
	}
	let url = baseUrl + data.url
	let method = data.method || 'GET'
	let param = data.param || {}
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data: param,
			dataType: 'json',
			header: headers,
			timeout:5000,
			success: (res) => {
				if (res.data.code == '200') {
					resolve(res.data.data)
				} else if (res.data.code == '401') {
					uni.removeStorageSync('userInfo')
					uni.removeStorageSync('token')
					uni.$u.toast('请先登录')
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/index'
						})
					}, 1500)
				} else {
					reject(res.data)
					uni.$u.toast(res.data.msg)
				}
			},
			fail: (err) => {
				uni.$u.toast(err)
				reject(err)
			}
		})
	})
}

export default api