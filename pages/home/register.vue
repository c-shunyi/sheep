<template>
	<view class="bg-register">
		<z-paging ref="paging" v-model="registerList" @query="queryList" auto-show-system-loading auto-show-back-to-top back-to-top-bottom="340rpx">
			<template #top>
				<navbar title="羔羊添加登记" v-if="type == 'add'"></navbar>
				<navbar title="羔羊减少登记" v-if="type == 'lessen'"></navbar>
				<navbar title="大羊消息登记" v-if="type == 'bigSheep'"></navbar>
				<view class="u-px-24 u-p-t-24">
					<u-search placeholder="请输入内容" v-model="searchContent" :actionStyle="actionStyle"></u-search>
					<view class="tab u-m-t-32 flex flex-between u-p-t-20 c-666 font-400 u-font-30" :class="tabOpt == 'left'? 'tab-left' : 'tab-right'">
						<view class="flex-1 flex flex-center" :class="tabOpt == 'left'? 'common' : ''" @tap="selectTab('left')">
							常用
						</view>
						<view class="flex-1 flex flex-center" :class="tabOpt == 'right'? 'common' : ''" @tap="selectTab('right')">
							历史
						</view>
					</view>
				</view>
			</template>
			<view class="u-px-24 u-p-b-24">
				<view class="bg-fff u-p-24" style="min-height: 600rpx;">
					<view class="u-p-24 flex align-center b-radius-20 u-m-b-24" style="background-color: #f6f6f8;"
					v-for="(item,index) in registerList" :key="index"
					@tap="clickItem(item)">
						<u--image :src="item.image" width="108rpx"  height="108rpx" radius="8rpx"></u--image>
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
			</view>
			<template #bottom>
				<view class="u-p-24 bg-FEFDEE">
					<view class="flex flex-between u-m-b-12">
						<view class="flex flex-center">
							<u-icon name="info-circle" color="#F0802D" size="28rpx"></u-icon>
							<view class="c-ED6A0C u-font-32 u-m-l-12">
								{{ type == 'add' ? '本次增加' : '本次减少' }}
							</view>
						</view>
						<view class="flex flex-center">
							<view class="c-ED6A0C u-font-32 u-m-r-24">
								公羊:{{maleCountTotal}}只
							</view>
							<view class="c-ED6A0C u-font-32">
								母羊:{{femaleCountTotal}}只
							</view>
						</view>
					</view>
					<view class="flex justify-end c-ED6A0C u-font-32">
						共用{{motherSheepCount}}只母羊生产
					</view>
				</view>
				<view class="u-px-32 u-py-20 flex flex-between">
					<view class="relative" @tap="selectedShow = true">
						<view class="absolute" style="top: -10rpx;right: -20rpx;z-index: 10;height: 40rpx;">
							<u-badge type="error" max="9999" :value="cartList.length"></u-badge>
						</view>
						<u--image :src="$fullLink('icon-car.png')" width="108rpx"  height="108rpx" radius="8rpx"></u--image>
					</view>
					<view class="flex flex-center">
						<view class="flex align-end c-333 u-font-28 u-m-r-24">
							共计:<span class="c-F94B05 u-font-40">{{sheepNum}}</span>只
						</view>
						<view style="width: 220rpx;">
							<u-button
							text="提交" 
							shape="circle" 
							color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
							:loading="btnLoading"
							@click="submit"></u-button>
						</view>
					</view>
				</view>
				<view :style="[{height:bottom + 'px'}]"></view>
			</template>
		</z-paging>
		<u-popup :show="eweShow" bgColor="transparent" mode="center" :safeAreaInsetBottom="false" :mask-closable="false">
		    <view class="pop-upnotification1 relative">
				<view class="flex align-center flex-col" style="margin-top: 254rpx;">
					<view class="font-600 c-333 u-font-40" style="margin-bottom: 86rpx;">
						本次产羔母羊数
					</view>
					<view class="u-p-12 flex flex-center" style="width: 360rpx;height: 100rpx;background: #EDFFD7;border-radius: 50rpx;">
						<u-number-box v-model="motherSheepCount" :min="0">
							<view class="minus-plus flex flex-center" slot="minus">
								<u-icon name="minus" size="54rpx" color="#ffffff" bold></u-icon>
							</view>
							<view class="u-mx-32" slot="input" style="width: 120rpx;">
								<u--input  border="none" v-model="motherSheepCount" inputAlign="center" fontSize="40rpx"></u--input>
							</view>
							<view class="minus-plus flex flex-center" slot="plus">
								<u-icon name="plus" size="54rpx" color="#ffffff" bold></u-icon>
							</view>
						</u-number-box>
					</view>
					<view class="" style="margin-top: 82rpx;width: 480rpx;">
						<u-button
						text="确认" 
						shape="circle" 
						size="large"
						color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
						@click="confirmDoeSheep"></u-button>
					</view>
				</view>
		        <!-- <view class="absolute flex flex-center" style="bottom: -104rpx;right: 0;left: 0;margin: auto;">
		        	<u-icon name="close-circle" color="#ffffff" size="40" @click="eweShow = false"></u-icon>
		        </view> -->
		    </view>
		</u-popup>
		<u-popup :show="itemShow" @close="itemShow = false" round="32rpx">
		    <view>
		        <view class="u-py-30 u-px-48 flex flex-between">
		        	<view style="width: 48rpx;"></view>
					<view class="font-600 c-333 u-font-34">
						请选择公母数量
					</view>
					<u--image :src="$fullLink('icon-close2.png')" width="48rpx"  height="48rpx" @click="itemShow = false"></u--image>
		        </view>
				<view class="u-m-t-50 flex flex-center">
					<u--image src="https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg" width="160rpx"  height="160rpx" radius="8rpx"></u--image>
				</view>
				<view class="flex flex-center u-m-t-50">
					<view class="flex flex-between bg-box" style="padding-left: 84rpx;padding-right: 24rpx;">
						<view class="male"></view>
						<view class="u-p-12 flex flex-center" style="width: 360rpx;height: 100rpx;background: #EDFFD7;border-radius: 50rpx;">
							<u-number-box v-model="maleCount" :min="0">
								<view class="minus-plus flex flex-center" slot="minus">
									<u-icon name="minus" size="54rpx" color="#ffffff" bold></u-icon>
								</view>
								<view class="u-mx-32" slot="input" style="width: 120rpx;">
									<u--input  border="none" v-model="maleCount" inputAlign="center" fontSize="40rpx"></u--input>
								</view>
								<view class="minus-plus flex flex-center" slot="plus">
									<u-icon name="plus" size="54rpx" color="#ffffff" bold></u-icon>
								</view>
							</u-number-box>
						</view>
					</view>
				</view>
				<view class="flex flex-center u-m-t-40">
					<view class="flex flex-between bg-box" style="padding-left: 84rpx;padding-right: 24rpx;">
						<view class="female"></view>
						<view class="u-p-12 flex flex-center" style="width: 360rpx;height: 100rpx;background: #EDFFD7;border-radius: 50rpx;">
							<u-number-box v-model="femaleCount" :min="0">
								<view class="minus-plus flex flex-center" slot="minus">
									<u-icon name="minus" size="54rpx" color="#ffffff" bold></u-icon>
								</view>
								<view class="u-mx-32" slot="input" style="width: 120rpx;">
									<u--input  border="none" v-model="femaleCount" inputAlign="center" fontSize="40rpx"></u--input>
								</view>
								<view class="minus-plus flex flex-center" slot="plus">
									<u-icon name="plus" size="54rpx" color="#ffffff" bold></u-icon>
								</view>
							</u-number-box>
						</view>
					</view>
				</view>
				<view class="u-m-t-62 u-p-24 flex align-center bg-FEFDEE">
					<u-icon name="info-circle" color="#F0802D" size="28rpx"></u-icon>
					<view class="c-ED6A0C u-font-28 font-400 u-m-l-12">
						请仔细核对羊的品类及对应数量
					</view>
				</view>
				<view class="u-p-24">
					<u-button
					text="确认" 
					shape="circle" 
					size="large"
					color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
					@click="addConfirm"></u-button>
				</view>
		    </view>
		</u-popup>
		<u-popup :show="selectedShow" @close="selectedShow = false" round="32rpx">
		    <view style="max-height: 1018rpx;">
		        <view class="u-py-30 u-px-48 flex flex-between">
		        	<view style="width: 48rpx;"></view>
					<view class="font-600 c-333 u-font-34">
						已选择数量
					</view>
					<u--image :src="$fullLink('icon-close2.png')" width="48rpx"  height="48rpx" @click="selectedShow = false"></u--image>
		        </view>
				<view class="u-p-24" style="max-height: 762rpx;overflow-y: auto;">
					<view class="bg-F6F6F8 b-radius-16 u-p-24 flex flex-between u-m-b-24" v-for="(item, index) in cartList" :key="index">
						<u--image src="https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg" width="108rpx"  height="108rpx"></u--image>
						<view class="flex-1 u-px-24">
							<view class="c-333 u-font-32 u-m-b-24">
								{{item.categoryName}}
							</view>
							<view class="flex flex-between">
								<view class="flex align-center flex-1">
									<view class="male"></view>
									<view class="c-333 u-font-32 u-m-l-12" v-if="type == 'add'">
										+{{item.maleCount}}
									</view>
									<view class="c-333 u-font-32 u-m-l-12" v-else>
										-{{item.maleCount}}
									</view>
								</view>
								<view class="flex align-center flex-1">
									<view class="female"></view>
									<view class="c-333 u-font-32 u-m-l-12" v-if="type == 'add'">
										+{{item.femaleCount}}
									</view>
									<view class="c-333 u-font-32 u-m-l-12" v-else>
										-{{item.femaleCount}}
									</view>
								</view>
							</view>
						</view>
						<view class="minus-plus flex flex-center" style="width: 88rpx;height: 88rpx;" @click="cartList.splice(index, 1)">
							<u-icon name="trash" size="54rpx" color="#ffffff" bold></u-icon>
						</view>
					</view>
				</view>
				<view class="u-p-24">
					<u-button
					text="确认" 
					shape="circle" 
					size="large"
					color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
					@click="selectedShow = false"></u-button>
				</view>
		    </view>
		</u-popup>
		<u-popup :show="timeShow" @close="timeShow = false" bgColor="transparent" mode="center" :safeAreaInsetBottom="false">
		    <view class="pop-upnotification2 relative">
				<view class="flex align-center flex-col" style="margin-top: 204rpx;">
					<view class="font-600 c-333 u-font-40" style="margin-bottom: 120rpx;">
						请选择产羔时间
					</view>
					<uni-datetime-picker v-model="createTime" type="date">
						<view class="b-radius-16 flex flex-between u-p-28" style="width: 536rpx;height: 100rpx;border: 1rpx solid #B9EA9B;margin: auto;">
							<view class="u-font-34 c-333 font-400">
								{{createTime}}
							</view>
							<u--image :src="$fullLink('icon-calendar.png')" width="48rpx"  height="48rpx"></u--image>
						</view>
					</uni-datetime-picker>
					<view class="" style="margin-top: 82rpx;width: 480rpx;">
						<u-button
						text="确认" 
						shape="circle" 
						size="large"
						color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
						@click="changeSheep"></u-button>
					</view>
				</view>
		        <view class="absolute flex flex-center" style="bottom: -104rpx;right: 0;left: 0;margin: auto;">
		        	<u-icon name="close-circle" color="#ffffff" size="40" @click="timeShow = false"></u-icon>
		        </view>
		    </view>
		</u-popup>
	</view>
</template>

<script>
import { getSheepInventory, addLambSheep, reduceLambSheep} from '@/common/request/api/home.js'
	export default{
		data(){
			return{
				actionStyle:{
					background:'linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)',
					height:'34px',
					width:'80px',
					color:'#ffffff',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: '17px'
				},
				searchContent:'',
				registerList:[],
				tabOpt:'left',
				eweShow:false,
				// 产羔母羊数量
				motherSheepCount:0,
				itemShow:false,
				maleCount:0,
				femaleCount:0,
				selectedShow:false,
				// 选择的产羔时间弹窗-显示
				timeShow:false,
				// 选择的产羔时间
				createTime:uni.$u.timeFormat(new Date(),'yyyy-mm-dd'),
				// 当前选中的羊羔参数
				currentItem:{},
				// 羊羔添加购物车列表
				cartList:[],
				// 页面类型 add:添加羊羔, lessen:减少羊羔, bigSheep:大羊管理
				type:'',
				btnLoading:false,
			}
		},
		computed:{
			bottom(){
				return getApp().globalData.systemInfo.safeAreaInsets.bottom
			},

			// 计算羊羔总数
			sheepNum(){
				let num = 0
				this.cartList.forEach(item => {
					num += item.maleCount + item.femaleCount
				})
				return num
			},
			// 计算公羊羔总数
			maleCountTotal(){
				let num = 0
				this.cartList.forEach(item => {
					num += item.maleCount
				})
				return num
			},
			// 计算母羊羔总数
			femaleCountTotal(){
				let num = 0
				this.cartList.forEach(item => {
					num += item.femaleCount
				})
				return num
			}

		},
		onLoad(options) {
			this.init(options)
		},
		methods:{
			init(options){
				// 初始化数据
				// 获取页面类型
				this.type = options.type || 'add'
			},
			// 确认产羔母羊数量
			confirmDoeSheep(){
				if(this.motherSheepCount <= 0){
					uni.$u.toast('产羔母羊数量错误！')
					return
				}
				this.eweShow = false
			},
			queryList(pageNo,pageSize){
				// setTimeout(()=>{
				// 	let list = []
				// 	for(let i=1;i<=20;i++){
				// 		list.push({
				// 			image:'https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg',
				// 			categoryName:'羊的品类' + i,
				// 			maleCount:uni.$u.random(1, 99999),
				// 			femaleCount:uni.$u.random(1, 99999),
				// 		})
				// 	}
				// 	this.$refs.paging.completeByTotal(list,list.length);
				// 	this.eweShow = true
				// },1000)
				// 如果是添加羊羔，则显示弹窗
				if(this.type == "add"){
					this.eweShow = true
				}
				// 获取羊只品种库存列表
				const params = {
					type: 2,
				}
				getSheepInventory(params).then(res=>{
					let list = res.data
					console.log('获取羊只品种库存列表', list);
					
					// 模拟数据
					// for(let i = 1;i <= 20;i++){
					// 	list.push({
					// 		categoryId:i,
					// 		image:'https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg',
					// 		categoryName:'羊的品类' + i,
					// 		maleCount:uni.$u.random(1, 99999),
					// 		femaleCount:uni.$u.random(1, 99999),
					// 	})
					// }
					this.$refs.paging.completeByTotal(list,list.length);
				}).catch(err=>{
					this.$refs.paging.completeByError(err);
				})
			},
			selectTab(type){
				this.tabOpt = type
			},
			submit(){
				// 校验数据
				if(this.cartList.length === 0){
					uni.$u.toast('请至少选择一只羊')
					return
				}
				if(this.type === 'add'){
					// 添加羊羔
					this.timeShow = true
				}else if(this.type === 'lessen'){
					// 减少羊羔
					this.changeSheep()
				}
			},
			clickItem(item){
				this.currentItem = item
				this.itemShow = true
			},
			// 添加到羊羔购物车
			addConfirm(){
				// 判断输入框是否有值
				if(this.maleCount <= 0 && this.femaleCount <= 0){
					uni.$u.toast('请至少选择一只羊')
					return
				}
				// 判断购物车是否已存在该品类
				let index = this.cartList.findIndex(it => it.categoryId === this.currentItem.categoryId)
				if(index !== -1){
					// 如果存在，更新数量
					this.cartList[index].maleCount += this.maleCount
					this.cartList[index].femaleCount += this.femaleCount
				}
				if(index == -1){
					// 如果不存在，更新数量
					let item = {
						...this.currentItem,
						maleCount:this.maleCount,
						femaleCount:this.femaleCount
					}
					this.cartList.push(item)
				}
				// 清空输入框
				this.maleCount = 0
				this.femaleCount = 0
				// 关闭弹窗
				this.itemShow = false
			},
			// 确认修改羊羔
			changeSheep(){
				this.timeShow = false
				this.btnLoading = true
				const params = {
					changes: this.cartList.map(item => ({
						categoryId: item.categoryId,
						maleChange: item.maleCount,
						femaleChange: item.femaleCount,
					})),
				}
				if(this.type === 'add'){
					params.motherSheepCount = this.motherSheepCount
					params.timeInfo = this.createTime
					addLambSheep(params).then(res=>{
						uni.$u.toast('添加成功')
						this.cartList = []
						this.$refs.paging.refresh()
					}).catch(err=>{
						uni.$u.toast('添加失败')
					}).finally(() => {
						this.btnLoading = false
					})
				}else if(this.type === 'lessen'){
					// 处理减少羊羔的逻辑
					// 这里可以根据实际需求进行处理
					reduceLambSheep(params).then(res=>{
						uni.$u.toast('减少成功')
						this.cartList = []
						this.$refs.paging.refresh()
					}).catch(err=>{
						uni.$u.toast('减少失败')
					}).finally(() => {
						this.btnLoading = false
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	
	.bg-register{
		width: 100vw;
		height: 100vh;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-register1.png') 0 0 no-repeat;
		background-size: contain;
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
	::v-deep .u-badge{
		font-size: 24rpx !important;
		line-height: 36rpx !important;
	}
	.pop-upnotification1{
		width: 600rpx;
		height: 814rpx;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/pop-upnotification1.png') 0 0 no-repeat;
		background-size: cover;
	}
	.bg-box{
		width: 654rpx;
		height: 122rpx;
		background: linear-gradient( 215deg, #F7FFF3, #FBFFF0, #F7FFEF);
		border: 1px solid;
		border-radius: 16rpx;
		border-image: linear-gradient(147deg, rgba(224, 255, 188, 1), rgba(219, 255, 220, 1)) 1 1;
	}
	.pop-upnotification2{
		width: 600rpx;
		height: 796.26rpx;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/pop-upnotification2.png') 0 0 no-repeat;
		background-size: cover;
	}
</style>