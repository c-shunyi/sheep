<template>
	<view class="bg4">
		<z-paging ref="paging" v-model="quantityList" @query="queryList" auto-show-system-loading auto-show-back-to-top>
			<template #top>
				<navbar title="羊的数量"></navbar>
				<view class="bg-quantity" style="letter-spacing: 4rpx;">
					<view class="u-p-t-60 u-px-72 u-font-36 line-h-36 c-333 font-600 flex align-end">
						大羊总数 <span class="u-font-44 line-h-44 c-70b971 u-px-4">{{ sheepData.dySl }}</span> 只
					</view> 
					<view class="u-font-32 line-h-32 c-333 font-600 flex flex-between" style="padding: 50rpx 0rpx 0 92rpx;">
						<view class="flex-1 flex align-end">
							公 <span class="u-font-36 c-70b971 line-h-36 u-px-4">{{sheepData.dyGdSl}}</span> 只
						</view>
						<view class="flex-1 flex align-end">
							母 <span class="u-font-36 line-h-36 c-FF9C3F" style="line-height: 36rpx;">{{ sheepData.dyGdMl }}</span> 只
						</view>
					</view>
					<view class="u-p-t-58 u-px-72 u-font-36 line-h-36 c-333 font-600 flex align-end">
						羔羊总数 <span class="u-font-44 line-h-44 c-70b971 u-px-4">{{ sheepData.ygsl }}</span> 只
					</view>
					<view class="u-font-32 line-h-32 c-333 font-600 flex flex-between" style="padding: 48rpx 0rpx 0 92rpx;">
						<view class="flex-1 flex align-end">
							公 <span class="u-font-36 c-70b971 line-h-36 u-px-4">{{ sheepData.dyGdMl }}</span> 只
						</view>
						<view class="flex-1 flex align-end">
							母 <span class="u-font-36 c-FF9C3F line-h-36 u-px-4">{{ sheepData.yGGdSl }}</span> 只
						</view>
					</view>
				</view>
				<view class="u-px-24 u-p-t-24">
					<view class="tab u-m-b-32 flex flex-between c-666 font-400 u-font-30" :class="tabOpt == 'left'? 'tab-left' : 'tab-right'">
						<view class="flex-1 flex flex-center" :class="tabOpt == 'left'? 'common' : ''" @tap="selectTab('left')">
							羊羔
						</view>
						<view class="flex-1 flex flex-center" :class="tabOpt == 'right'? 'common' : ''" @tap="selectTab('right')">
							大羊
						</view>
					</view>
				</view>
			</template>
			<view class="u-px-36">
				<view class="u-p-24 flex align-center b-radius-20 u-m-b-24" style="background-color: #f6f6f8;"
				v-for="(item,index) in quantityList" :key="index">
					<u--image :src="item.categoryImage" width="108rpx"  height="108rpx" radius="8rpx"></u--image>
					<view class="u-m-l-24 flex-1">
						<view class="u-font-32 c-333 u-m-b-24">
							{{item.categoryName}}
						</view>
						<view class="flex align-end">
							<view class="u-font-32 c-333 font-400 u-m-r-20">
								当前存栏
							</view>
							<view class="flex align-center flex-1">
								<view class="male"></view>
								<view class="c-333 u-font-32 u-m-l-12">
									{{item.maleCount}}
								</view>
							</view>
							<view class="flex align-center flex-1">
								<view class="female"></view>
								<view class="c-333 u-font-32 u-m-l-12">
									{{item.femaleCount}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
import { getInventoryList } from '@/common/request/api/user.js'
	export default{
		data(){
			return{
				quantityList:[],
				tabOpt:'left',
				sheepData:{},
			}
		},
		methods:{
			queryList(pageNo,pageSize){
				//  type 类型：1-大羊 2-羊羔
				const params = {
					type: this.tabOpt === 'left' ? 2 : 1,
				}
				getInventoryList(params).then(res=>{
					this.sheepData = res.data || {}
					let list = res.data.inventoryList || []
					this.$refs.paging.completeByTotal(list,list.length);
				}).catch(err=>{
					this.$refs.paging.completeByError(err);
				})
				// setTimeout(()=>{
				// 	let list = []
				// 	for(let i=1;i<=10;i++){
				// 		list.push({
				// 			image:'https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg',
				// 			categoryTitle:'羊的品类' + i,
				// 			maleNum:uni.$u.random(1, 99999),
				// 			femaleNum:uni.$u.random(1, 99999),
				// 		})
				// 	}
				// 	this.$refs.paging.completeByTotal(list,list.length);
				// },1000)
			},
			selectTab(type){
				this.tabOpt = type
				this.queryList(1,10)
			},
		}
	}
</script>

<style scoped lang="scss">
	.bg4{
		width: 100vw;
		height: 100vh;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg4.png') 0 0 no-repeat;
		background-size: contain;
	}
	.bg-quantity{
		width: 100vw;
		height: 460rpx;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-quantity.png') 0 0 no-repeat;
		background-size: cover;
	}
	.tab{
		width: 702rpx;
		height: 82rpx;
	}
	.tab-right{
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/tab-right.png') 0 0 no-repeat;
		background-size: cover;
	}
	.tab-left{
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/tab-left.png') 0 0 no-repeat;
		background-size: cover;
	}
	.common{
		font-weight: 600;
		font-size: 16px;
		color: #70B971;
	}
</style>