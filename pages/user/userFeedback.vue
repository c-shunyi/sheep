<template>
	<view>
		<z-paging ref="paging" :auto="false" :refresher-enabled="false" :loading-more-enabled="false">
			<template #top>
				<navbar title="用户反馈"></navbar>
			</template>
			<view class="u-p-24">
				<view class="u-m-b-20">
					<u--textarea v-model="content" placeholder="对我们的产品、服务，您有什么建议？请告诉我们" count height="400rpx"
						maxlength="300"></u--textarea>
				</view>
				<view class="">
					<view class="flex flex-between u-m-b-20">
						<view class="c-666 u-font-32">
							上传图片
						</view>
						<view class="c-999 u-font-32">
							最多六张
						</view>
					</view>
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="6" width="200rpx" height="200rpx"></u-upload>
				</view>
			</view>
			<template #bottom>
				<view class="u-p-24">
					<u-button text="提交反馈" color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
						shape="circle" @click="submit" :loading="loading"></u-button>
				</view>
				<view :style="[{height:bottom + 'px'}]"></view>
			</template>
		</z-paging>
	</view>
</template>

<script>
	import {
		postFeedbackSave,
	} from '@/common/request/api/user.js'
	export default {
		data() {
			return {
				content: '',
				fileList1: [],
				loading:false
			}
		},
		onLoad() {

		},
		computed: {
			bottom() {
				return getApp().globalData.systemInfo.safeAreaInsets.bottom
			}
		},
		methods: {
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			async afterRead(event) {
				console.log(event)
				let lists = [].concat(event.file);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: "uploading",
						message: "上传中",
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let item = this[`fileList${event.name}`][fileListLen];
					this[`fileList${event.name}`].splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: "success",
							message: "",
							url: result,
						})
					);
					fileListLen++;
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: "https://txmg.36sm.cn/xmWeb/oss/hteditor/upload", // 仅为示例，非真实的接口地址
						filePath: url,
						name: "multipartFile",
						header: {
							"Authorization": uni.getStorageSync("token")
						},
						success: (res) => {
							resolve(JSON.parse(res.data).data.data.fileUrl);
						},
					});
				});
			},
			submit(){
				if(!this.content) return uni.$u.toast('请输入反馈内容')
				this.loading = true
				let urlList = this.fileList1.map(item=>item.url)
				let data={
					title:this.content,
					urlList
				}
				postFeedbackSave(data).then(res=>{
					this.loading = false
					uni.showToast({
						title:'反馈提交成功',
						mask:true
					})
					setTimeout(()=>{
						this.$navBack()
					},1500)
				})
			}
		}
	}
</script>

<style scoped lang="scss">

</style>