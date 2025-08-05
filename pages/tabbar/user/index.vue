<template>
  <view class="bg-user">
    <z-paging
      ref="paging"
      :auto="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
    >
      <template #top>
        <u-navbar
          title="我的"
          bgColor="transparent"
          leftIcon=" "
          placeholder
          :titleStyle="titleStyle"
        ></u-navbar>
        <view class="flex flex-center" style="height: 300rpx">
          <view class="flex flex-col flex-center">
            <view
              class="b-radius-20 overflow-hidden u-m-b-24"
              style="width: 144rpx; height: 144rpx; border: 8rpx solid #41a142"
            >
              <u--image
                src="https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg"
                width="128rpx"
                height="128rpx"
                radius="8rpx"
              ></u--image>
            </view>
            <view
              class="line-1 c-333 u-font-32"
              style="width: 320rpx; text-align: center"
            >
              {{ userInfo.nickName || "" }}
            </view>
          </view>
        </view>
      </template>
      <view class="u-p-24">
        <view class="bg-fff u-p-24 b-radius-20">
          <u-cell-group :border="false">
            <u-cell
              size="large"
              :title="item.title"
              :name="item.name"
              isLink
              v-for="(item, index) in menuList"
              :key="index"
              :border="index + 1 != menuList.length"
              @click="clickMenuList($event, item)"
            >
              <view class="u-m-r-24" slot="icon">
                <u--image
                  :src="$fullLink(item.icon)"
                  width="48rpx"
                  height="48rpx"
                ></u--image>
              </view>
            </u-cell>
          </u-cell-group>
        </view>
      </view>
    </z-paging>
    <u-modal
      :show="exitShow"
      title="温馨提示"
      negativeTop="100rpx"
      width="546rpx"
    >
      <view
        class="font-400 u-font-30 c-666 flex flex-center"
        style="height: 100rpx"
      >
        确认要退出或重新登录吗？
      </view>
      <view class="flex flex-between" slot="confirmButton">
        <view style="width: 216rpx">
          <u-button
            text="取消"
            shape="circle"
            @click="exitShow = false"
          ></u-button>
        </view>
        <view style="width: 216rpx">
          <u-button
            text="确定"
            shape="circle"
            color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
            @click="logOut"
          ></u-button>
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
import { getLoginBaseInfo } from "@/common/request/api/user.js";
export default {
  data() {
    return {
      titleStyle: {
        fontWeight: "500",
        fontSize: "34rpx",
        color: "#333333",
        fontFamily: "PingFangSC, PingFang SC",
      },
      exitShow: false,
      menuList: [
        {
          title: "填报记录",
          name: "record",
          icon: "icon-record.png",
          url: "",
        },
        {
          title: "羊的数量",
          name: "quantity",
          icon: "icon-quantity.png",
          url: "",
        },
        {
          title: "身份信息",
          name: "identity",
          icon: "icon-identity.png",
          url: "",
        },
        {
          title: "数据管理",
          name: "data",
          icon: "icon-data.png",
          url: "",
        },
        {
          title: "意见反馈",
          name: "service",
          icon: "icon-service.png",
          url: "",
        },
        {
          title: "退出登录",
          name: "exit",
          icon: "icon-exit.png",
          url: "",
        },
      ],
      userInfo: uni.getStorageSync("userInfo") || {},
    };
  },
  onLoad() {
    this.getuserInfo();
  },
  methods: {
    getuserInfo() {
      let params = {
        location: "zh",
      };
      getLoginBaseInfo(params).then((res) => {
        console.log(res);
      });
    },
    clickMenuList(e, item) {
      switch (e.name) {
        case "record":
          this.$navTo("/pages/user/record");
          break;
        case "quantity":
          this.$navTo("/pages/user/quantity");
          break;
        case "identity":
          uni.$u.toast("身份信息");
          break;
        case "data":
          uni.$u.toast("数据管理");
          break;
        case "service":
          this.$navTo("/pages/user/userFeedback");
          break;
        case "exit":
          // uni.$u.toast('退出登录')
          this.exitShow = true;
          break;
        default:
          console.log("其他");
      }
    },
    logOut() {
      this.exitShow = false;
      this.$navTo("/pages/login/index");
    },
  },
};
</script>

<style scoped lang="scss">
.bg-user {
  width: 100vw;
  height: 100vh;
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-user.png")
    0 0 no-repeat;
  background-size: contain;
}
</style>
