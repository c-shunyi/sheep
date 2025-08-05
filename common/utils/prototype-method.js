const objToUri = obj => {
	return Object.keys(obj)
		.filter(k=>obj[k])
		.map(k=>k + '=' + obj[k])
		.join('&')
}
export default{
	init(Vue){
		//路由跳转
		Vue.prototype.$navTo = (url, hasLogin = false, options = {}) => {
			if (typeof hasLogin !== 'boolean') {
				[hasLogin, options] = [false, hasLogin]
			}
			let goToUrl = "";
			if(Object.keys(options).length > 0) {
				if(url.includes("?")){
					goToUrl = `${url}&${objToUri(options)}`
				} else {
					goToUrl = `${url}?${objToUri(options)}`
				}
			} else {
				goToUrl = url
			}
			if (hasLogin && !uni.getStorageSync('token')) {
				uni.showToast({
					title:'请先登陆！',
					icon:'none',
					mask:true
				})
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/login/index'
					})
				},1500)
			} else {
				uni.navigateTo({
					url:goToUrl,
					success: (res) => {
						
					},
					fail: (err) => {
						console.log('navigateTo', err)
					}
				})
			}
		}
		//页面返回方法
		Vue.prototype.$navBack = (num)=> {
			let delta = num ? num : 1
			let pages = getCurrentPages()
			let prevPage = pages[pages.length - (1 + delta)]
			if (!prevPage) {
				uni.switchTab({
					url: '/pages/tabbar/home/index'
				})
			} else {
				uni.navigateBack({
					delta
				})
			}
		}
		//函数防抖 (只执行最后一次点击)
		Vue.prototype.$Debounce = (fn, t) => {
		    let delay = t || 500;
		    let timer;
		    // console.log(fn)
		    // console.log(typeof fn)
		    return function () {
		        let args = arguments;
		        if(timer){
		            clearTimeout(timer);
		        }
		        timer = setTimeout(() => {
		            timer = null;
		            fn.apply(this, args);
		        }, delay);
		    }
		};
		//函数节流
		Vue.prototype.$Throttle = (fn, t) => {
		    let last;
		    let timer;
		    let interval = t || 500;
		    return function () {
		        let args = arguments;
		        let now = +new Date();
		        if (last && now - last < interval) {
		            clearTimeout(timer);
		            timer = setTimeout(() => {
		                last = now;
		                fn.apply(this, args);
		            }, interval);
		        } else {
		            last = now;
		            fn.apply(this, args);
		        }
		    }
		};
		//图片
		Vue.prototype.$fullLink = (name) => {
			let url = `https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/${name}`
			return url
		};
		//协议
		Vue.prototype.$protocolRule = (title,type) => {
			uni.navigateTo({url:`/pages/user/protocol?title=${title}&type=${type}`})
		}
	}
}