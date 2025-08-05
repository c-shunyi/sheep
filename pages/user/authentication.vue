<template>
	<view class="bg-authentication">
		<z-paging ref="paging" :auto="false" :refresher-enabled="false" :loading-more-enabled="false">
			<template #top>
				<navbar title="身份认证"></navbar>
			</template>
			<view class="u-p-40">
				<view class="u-p-t-24" style="font-family: DingTalk, DingTalk;font-style: italic;margin-bottom: 122rpx;">
					<view class="u-font-56 c-274510 u-m-b-24">
						HELLO,
					</view>
					<view class="u-font-40 c-274510">
						请填写您的身份信息
					</view>
				</view>
				<view style="margin-bottom: 108rpx">
					<u--form labelPosition="top" :model="formData" :rules="rules" ref="uForm" labelWidth="auto" :labelStyle="labelStyle">
						<view class="" style="height: 400rpx;">
							<u-form-item label="姓名" prop="name" v-if="step == 1">
								<u-input v-model="formData.name" />
							</u-form-item>
							<u-form-item label="生产性质" prop="nature" v-if="step == 1">
								<uni-data-select v-model="formData.nature" :localdata="localdata"></uni-data-select>
							</u-form-item>
							<u-form-item label="手机号" prop="phone" v-if="step == 2">
								<u-input v-model="formData.phone" />
							</u-form-item>
							<u-form-item label="身份证号" prop="idNumber" v-if="step == 2">
								<u-input v-model="formData.idNumber" />
							</u-form-item>
							<u-form-item label="地址" prop="address" v-if="step == 3">
								<u-cell-group :border="false">
									<u-cell>
										<view class="u-font-32" slot="title">
											{{formData.address}}
										</view>
										<view class="" slot="right-icon">
											<u-icon name="map" color="#999999" size="24"></u-icon>
										</view>
									</u-cell>
								</u-cell-group>
							</u-form-item>
						</view>
					</u--form>
				</view>
				<view>
					<u-button
					text="下一步" 
					shape="circle" 
					color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
					@click="nextStep"></u-button>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import store from '@/common/store'
	export default{
		data(){
			return{
				formData:{
					name:'',
					nature:'',
					phone:'',
					idNumber:'',
					address:'省/市/县/旗镇'
				},
				rules:{
					name:[{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}],
					nature:[{
						required: true,
						message: '请选择生产性质',
						trigger: ['blur', 'change']
					}],
					phone:[{
						required: true,
						message: '请输手机号',
						trigger: ['blur', 'change']
					},{
			            validator: (rule, value, callback) => {
				            return uni.$u.test.mobile(value);
			            },
			            message: '手机号码不正确',
			            trigger: ['blur'],
		            }],
					idNumber:[{
						required: true,
						message: '请输入身份证号',
						trigger: ['blur', 'change']
					},{
			            validator: (rule, value, callback) => {
				            return uni.$u.test.idCard(value);
			            },
			            message: '身份证号不正确',
			            trigger: ['blur'],
		            }],
					address:[{
						required: true,
						message: '请选择地址',
						trigger: ['blur', 'change']
					}],
				},
				localdata:[
					{
						text:'优质母羊生产',
						value:1
					},
					{
						text:'优质肉羔生产',
						value:2
					},
				],
				labelStyle:{
					fontSize: '36rpx',
					fontFamily: 'PingFangSC, PingFang SC',
					color: '#333333',
					fontWeight: '500',
				},
				step:3
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods:{
			async nextStep(){
				if(this.step == 1){
					let verify = await this.$refs.uForm.validate({name:true,nature:true})
					this.step = 2
				}else if(this.step == 2){
					let verify = await this.$refs.uForm.validate({phone:true,idNumber:true})
					this.step = 3
				}else if(this.step == 3){
					let verify = await this.$refs.uForm.validate({address:true})
					store.commit('setIsFromAuthentication',true)
					uni.switchTab({
						url:'/pages/tabbar/home/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-authentication{
		width: 100vw;
		height: 100vh;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-authentication.png') 0 0 no-repeat;
		background-size: cover;
	}
	::v-deep .uni-select{
		height: 37.6px !important;
	}
	::v-deep .uni-stat-box{
		background-color: transparent;
	}
</style>