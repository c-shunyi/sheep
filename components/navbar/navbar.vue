<template>
	<view class="">
		<u-navbar :title="title" bgColor="transparent" placeholder :titleStyle="titleStyle" @leftClick="$navBack()">
			<view slot="left">
				<u--image :src="$fullLink('icon-back.png')" width="60rpx"  height="60rpx"></u--image>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default{
		props:{
			title: {
				type: String,
				default: ''
			}
		},
		data(){
			return{
				titleStyle :{
					fontWeight: '500',
					fontSize: '34rpx',
					color: '#333333',
					fontFamily: 'PingFangSC, PingFang SC',
				},
			}
		}
	}
</script>

<style>
</style>