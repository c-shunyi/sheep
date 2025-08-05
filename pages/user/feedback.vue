<template>
	<view>
		<z-paging ref="paging" v-model="list" @query="queryList" auto-show-system-loading auto-show-back-to-top>
			<template #top>
				<navbar title="反馈列表"></navbar>
			</template>
			<view class="u-p-24">
			</view>
			<template #bottom>
				<view class="u-p-24">
					<u-button text="去反馈" color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)" shape="circle" @click="$navTo('/pages/user/userFeedback')"></u-button>
				</view>
				<view :style="[{height:bottom + 'px'}]"></view>
			</template>
		</z-paging>
	</view>
</template>

<script>
	import {getMessageList} from '@/common/request/api/user.js'
	export default{
		data(){
			return{
				list:[],
			}
		},
		onLoad() {
			
		},
		computed:{
			bottom(){
				return getApp().globalData.systemInfo.safeAreaInsets.bottom
			}
		},
		methods:{
			queryList(pageNo,pageSize){
				let param={
					page:pageNo,
					size:pageSize
				}
				getMessageList(param).then(res=>{
					this.$refs.paging.completeByTotal(res.data.list,res.data.totalPage);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>