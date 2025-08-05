import api from '../index.js'

export const postStationLogin = param => api({
	url:`/xmWeb/v1/mb/login/app/phone/code`,
	method:'POST',
	param
})