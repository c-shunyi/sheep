<script>
	export default {
		globalData:{
			menuButtonInfo: {},
			systemInfo:{}
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			this.globalData.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// #endif
			this.globalData.systemInfo = uni.getSystemInfoSync()
			console.log(this.globalData)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/css/index.scss"
</style>
