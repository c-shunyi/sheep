<template>
  <view class="">
    <z-paging
      ref="paging"
      :auto="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
    >
      <u-swiper :list="swiperList" height="512rpx"></u-swiper>
      <view
        class="relative u-p-24"
        style="
          top: -30rpx;
          border-radius: 30rpx 30rpx 0 0;
          background: linear-gradient(to bottom, #ffffff, #fafafa);
        "
      >
        <view class="flex align-center bg-fdf6ec">
          <u--image
            :src="$fullLink('announcement.png')"
            width="85px"
            height="32px"
          ></u--image>
          <u-notice-bar :text="announcement" icon=" "></u-notice-bar>
        </view>
        <view
          class="flex flex-between"
          v-for="(item, index) in registerList"
          :key="index"
          :class="item.className"
          @tap="$navTo(item.url)"
        >
          <u--image
            :src="$fullLink(item.icon)"
            width="128rpx"
            height="128rpx"
          ></u--image>
          <view class="u-px-38 flex-1">
            <view class="title u-m-b-12">
              {{ item.title }}
            </view>
            <view class="describe">
              {{ item.describe }}
            </view>
          </view>
          <u-icon name="arrow-right" color="#666666" size="32rpx"></u-icon>
        </view>
      </view>
    </z-paging>
    <u-modal
      :show="authenticationShow"
      title="身份认证"
      negativeTop="100rpx"
      width="546rpx"
    >
      <view
        class="font-400 u-font-30 c-666 flex flex-center"
        style="height: 100rpx"
      >
        请填写对应的认证信息身份证号等
      </view>
      <view class="flex flex-between" slot="confirmButton">
        <view style="width: 216rpx">
          <u-button
            text="取消"
            shape="circle"
            @click="authenticationShow = false"
          ></u-button>
        </view>
        <view style="width: 216rpx">
          <u-button
            text="确定"
            shape="circle"
            color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
            @click="identityAuthentication"
          ></u-button>
        </view>
      </view>
    </u-modal>
    <u-modal
      :show="resultShow"
      title="审核中，请稍等"
      negativeTop="100rpx"
      width="546rpx"
    >
      <view class="flex flex-center" slot="confirmButton">
        <view style="width: 300rpx">
          <u-button
            text="确定"
            shape="circle"
            color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
            @click="confirmResult"
          ></u-button>
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
import { getInfoMemberId, getMessageList } from "@/common/request/api/user.js";
import store from "@/common/store";
export default {
  data() {
    return {
      swiperList: [
        "https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/slideshow1.png",
      ],
      announcement: "",
      registerList: [
        {
          icon: "icon-add.png",
          className: "add",
          title: "产羔信息登记",
          describe: "每日产羔信息登记，用于记录",
          url: "/pages/home/register?type=add",
        },
        {
          icon: "icon-lessen.png",
          className: "lessen",
          title: "羔羊减少登记",
          describe: "羔羊减少信息登记，用于记录",
          url: "/pages/home/register?type=lessen",
        },
        {
          icon: "icon-register.png",
          className: "register",
          title: "大羊信息登记",
          describe: "大羊数量信息登记，用于记录",
          url: "/pages/home/bigSheepRegister",
        },
      ],
      authenticationShow: false,
      resultShow: false,
    };
  },
  onShow() {
    if (store.state.isFromAuthentication) {
      this.resultShow = true;
    }
    this.getInfoMemberId();
  },
  onLoad() {
    this.init();
  },
  methods: {
    /**
     * @description 初始化
     * @author c_shunyi 2025-08-06 15:50:45
     */
    async init() {
      this.getMessageContent();
    },
    getUserInfo() {
      this.authenticationShow = true;
    },
    identityAuthentication() {
      this.authenticationShow = false;
      this.$navTo("/pages/user/authentication");
    },
    confirmResult() {
      this.resultShow = false;
      store.commit("setIsFromAuthentication", false);
    },
    getInfoMemberId() {
      getInfoMemberId().then((res) => {});
    },
    /**
     * @description 获取公告
     * @author c_shunyi 2025-08-06 15:46:41
     */
    getMessageContent() {
      // 构建请求参数
      const params = {
        page: 1,
        size: 1,
        type: 1,
      };
      getMessageList(params)
        .then((res) => {
          console.log("获取公告成功:", res);
          res.data.list[0] &&
            (this.announcement =
              res.data.list[0].systemMessageDTO.basicInfo ||
              "暂无公告!!!暂无公告!!!暂无公告!!!");
        })
        .catch((err) => {
          console.error("获取公告失败:", err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.add {
  width: 702rpx;
  height: 280rpx;
  padding: 56rpx 60rpx;
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-add.png")
    0 0 no-repeat;
  background-size: cover;
}
.register {
  width: 702rpx;
  height: 280rpx;
  padding: 56rpx 60rpx;
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-register.png")
    0 0 no-repeat;
  background-size: cover;
}
.lessen {
  width: 702rpx;
  height: 280rpx;
  padding: 56rpx 60rpx;
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-lessen.png")
    no-repeat;
  background-size: cover;
}
.title {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 22px;
  color: #333333;
  line-height: 30px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07);
}
.describe {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 20px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07);
}
</style>
