<template>
	<view class="bg-news">
		<z-paging ref="paging" v-model="newsList" @query="queryList">
			<template #top>
				<u-navbar title="消息中心" bgColor="transparent" leftIcon=" " placeholder :titleStyle="titleStyle"></u-navbar>
			</template>
			<view class="u-p-24">
				<view class="u-m-b-24">
					<u-swiper :list="swiperList" height="326rpx"></u-swiper>
				</view>
				<view class="epidemic-prevention u-py-18 u-px-48 flex align-center u-m-b-24 b-radius-16 overflow-hidden">
					<u--image :src="$fullLink('icon-epidemic-prevention.png')" width="112rpx"  height="112rpx"></u--image>
					<view class="u-m-l-68 flex-1" style="font-family: SourceHanSansCN, SourceHanSansCN;">
						<view class="font-600 c-055082 u-font-38 u-m-b-12">
							疫病防控专区
						</view>
						<view class="font-400 c-055082 u-font-30">
							疫病、兽医...
						</view>
					</view>
				</view>
				<view v-for="(item,index) in newsList" :key="index">
					<view class="flex align-center u-m-b-24">
						<view class="bg-70b971 u-m-r-12" style="width: 12rpx;height: 36rpx;border-radius: 4rpx;"></view>
						<view class="u-font-34 c-333">{{item.classify}}</view>
					</view>
					<view class="u-p-24 bg-fff b-radius-20 u-m-b-24" v-for="(it,i) in item.list" :key="i" @tap="$navTo('/pages/news/particulars')">
						<view class="flex flex-between u-p-b-24" style="border-bottom: 1rpx solid #f1f1f1;">
							<view class="u-font-32 font-600 c-333">
								{{it.newsTitle}}
							</view>
							<view class="flex flex-center">
								<view class="u-font-28 font-400 c-999 u-m-r-12">
									查看详情
								</view>
								<u-icon name="arrow-right" color="#999999" size="32rpx"></u-icon>
							</view>
						</view>
						<view class="u-p-t-24 flex flex-between">
							<view class="flex-1 u-p-r-40">
								<view class="flex align-center u-m-b-16">
									<u--image :src="$fullLink('icon-news.png')" width="32rpx"  height="32rpx"></u--image>
									<view class="line-1 u-font-32 c-333 font-400 u-m-l-18" style="width: 460rpx;">
										{{it.describe}}
									</view>
								</view>
								<view class="flex align-center">
									<u--image :src="$fullLink('icon-time.png')" width="32rpx"  height="32rpx"></u--image>
									<view class="line-1 u-font-32 c-333 font-400 u-m-l-18" style="width: 460rpx;">
										{{$u.timeFormat(it.createTime,'yyyy-mm-dd')}}
									</view>
								</view>
							</view>
							<u--image :src="it.newsImg" width="104rpx"  height="104rpx" radius="12rpx"></u--image>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import { getBannerList, getNewList } from '@/common/request/api/news.js'
	export default{
		data(){
			return{
				titleStyle :{
					fontWeight: '500',
					fontSize: '34rpx',
					color: '#333333',
					fontFamily: 'PingFangSC, PingFang SC',
				},
				newsList:[],
				swiperList:[],
				// 是否获取数据中
				isGettingData:false,
			}
		},
		onLoad() {
			this.getBannerList()
		},
		onShow() {
		},
		methods:{
			// 获取轮播图
			getBannerList(){
				// 组装参数
				let params={
					location:'zh',
					type:0
				}
				// 调用接口
				getBannerList(params).then(res=>{
					this.swiperList = res.data.list.map(item=>{
						return item.imageUrl
					})
				})
			},
			queryList(pageNo,pageSize){
				// 组装参数
				let params={
					page:pageNo,
					size:pageSize,
				}
				// 调用接口
				getNewList(params).then(res=>{
					let list = res.data.list.map(item=>{
						return {
							classify:item.classify,
							list:item.list.map(it=>{
								return {
									newsTitle:it.newsTitle,
									describe:it.describe,
									newsImg:it.newsImg,
									createTime:it.createTime
								}
							})
						}
					})
					this.$refs.paging.completeByTotal(list,res.data.totalPage);
				}).catch(()=>{
					this.$refs.paging.completeByTotal([],0);
				})
				// 模拟数据(接口接口成功后删除即可)
				// this.mockData();
			},
			// 模拟数据
			mockData(){
				setTimeout(() => {
					let list = [
					{
						classify:'消息分类一',
						list:[
							{
								newsTitle:"这是一个消息主标题",
								describe:"消息简单介绍消息简单介消息简单介绍消息简单介绍",
								newsImg:"https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg",
								createTime:new Date().getTime()
							},
							{
								newsTitle:"这是一个消息主标题",
								describe:"消息简单介绍消息简单介消息简单介绍消息简单介绍",
								newsImg:"https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg",
								createTime:new Date().getTime()
							}
						]
					},
					{
						classify:'消息分类二',
						list:[
							{
								newsTitle:"这是一个消息主标题",
								describe:"消息简单介绍消息简单介消息简单介绍消息简单介绍",
								newsImg:"https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg",
								createTime:new Date().getTime()
							},
							{
								newsTitle:"这是一个消息主标题",
								describe:"消息简单介绍消息简单介消息简单介绍消息简单介绍",
								newsImg:"https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg",
								createTime:new Date().getTime()
							}
						]
					},
				]
				this.$refs.paging.completeByTotal(list,2);
				}, 1000);
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg-news{
		width: 100vw;
		height: 100vh;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-news.png') 0 0 no-repeat;
		background-size: contain;
	}
	.epidemic-prevention{
		width: 702rpx;
		height: 148rpx;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-epidemic-prevention.png') 0 0 no-repeat;
		background-size: cover;
	}
</style>