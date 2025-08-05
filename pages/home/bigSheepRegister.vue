<!-- 大羊消息登记 -->
<template>
  <view class="bg-register">
    <z-paging
      ref="paging"
      v-model="registerList"
      @query="queryList"
      auto-show-system-loading
      auto-show-back-to-top
      back-to-top-bottom="340rpx"
    >
      <template #top>
        <navbar title="大羊消息登记"></navbar>
        <view class="u-px-24 u-p-t-24">
          <u-search
            placeholder="请输入内容"
            v-model="searchContent"
            :actionStyle="actionStyle"
            @search="search"
            @custom="search"
          ></u-search>
          <view
            class="tab u-m-t-32 flex flex-between u-p-t-20 c-666 font-400 u-font-30"
            :class="tabOpt == 'left' ? 'tab-left' : 'tab-right'"
          >
            <view
              class="flex-1 flex flex-center"
              :class="tabOpt == 'left' ? 'common' : ''"
              @tap="selectTab('left')"
            >
              常用
            </view>
            <view
              class="flex-1 flex flex-center"
              :class="tabOpt == 'right' ? 'common' : ''"
              @tap="selectTab('right')"
            >
              历史
            </view>
          </view>
        </view>
      </template>
      <view class="u-px-24 u-p-b-24">
        <view class="bg-fff u-p-24" style="min-height: 600rpx">
          <view
            class="u-p-24 flex align-center b-radius-20 u-m-b-24"
            style="background-color: #f6f6f8"
            v-for="(item, index) in registerList"
            :key="index"
            @tap="clickItem(item)"
          >
            <u--image
              :src="item.categoryImage"
              width="108rpx"
              height="108rpx"
              radius="8rpx"
            ></u--image>
            <view class="u-m-l-24 flex-1">
              <view class="u-font-32 c-333 u-m-b-24">
                {{ item.categoryName }}
              </view>
              <view class="flex align-end">
                <view class="u-font-32 c-333 font-400 u-m-r-20">
                  当前存栏
                </view>
                <view class="flex align-center flex-1">
                  <view class="male"></view>
                  <view class="c-333 u-font-32 u-m-l-12">
                    {{ item.maleCount }}
                  </view>
                </view>
                <view class="flex align-center flex-1">
                  <view class="female"></view>
                  <view class="c-333 u-font-32 u-m-l-12">
                    {{ item.femaleCount }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <template #bottom>
        <view class="u-px-32 u-py-20 flex flex-between">
          <view class="relative" @tap="selectedShow = true">
            <view
              class="absolute"
              style="top: -10rpx; right: -20rpx; z-index: 10; height: 40rpx"
            >
              <u-badge
                type="error"
                max="9999"
                :value="cartList.length"
              ></u-badge>
            </view>
            <u--image
              :src="$fullLink('icon-car.png')"
              width="108rpx"
              height="108rpx"
              radius="8rpx"
            ></u--image>
          </view>
          <view class="flex flex-center">
            <view class="flex align-end c-333 u-font-28 u-m-r-24">
              共计:<span class="c-F94B05 u-font-40">{{ sheepNum }}</span
              >只
            </view>
            <view style="width: 220rpx">
              <u-button
                text="提交"
                shape="circle"
                color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
                :loading="btnLoading"
                @click="submit"
              ></u-button>
            </view>
          </view>
        </view>
        <view :style="[{ height: bottom + 'px' }]"></view>
      </template>
    </z-paging>
    <u-popup
      :show="eweShow"
      @close="eweShow = false"
      bgColor="transparent"
      mode="center"
      :safeAreaInsetBottom="false"
    >
      <view class="pop-upnotification1 relative">
        <view class="flex align-center flex-col" style="margin-top: 254rpx">
          <view class="font-600 c-333 u-font-40" style="margin-bottom: 86rpx">
            本次产羔母羊数
          </view>
          <view
            class="u-p-12 flex flex-center"
            style="
              width: 360rpx;
              height: 100rpx;
              background: #edffd7;
              border-radius: 50rpx;
            "
          >
            <u-number-box v-model="eweNum" :min="0">
              <view class="minus-plus flex flex-center" slot="minus">
                <u-icon name="minus" size="54rpx" color="#ffffff" bold></u-icon>
              </view>
              <view class="u-mx-32" slot="input" style="width: 120rpx">
                <u--input
                  border="none"
                  v-model="eweNum"
                  inputAlign="center"
                  fontSize="40rpx"
                ></u--input>
              </view>
              <view class="minus-plus flex flex-center" slot="plus">
                <u-icon name="plus" size="54rpx" color="#ffffff" bold></u-icon>
              </view>
            </u-number-box>
          </view>
          <view class="" style="margin-top: 82rpx; width: 480rpx">
            <u-button
              text="确认"
              shape="circle"
              size="large"
              color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
              @click="eweShow = false"
            ></u-button>
          </view>
        </view>
        <view
          class="absolute flex flex-center"
          style="bottom: -104rpx; right: 0; left: 0; margin: auto"
        >
          <u-icon
            name="close-circle"
            color="#ffffff"
            size="40"
            @click="eweShow = false"
          ></u-icon>
        </view>
      </view>
    </u-popup>
    <u-popup :show="itemShow" @close="itemShow = false" round="32rpx">
      <view>
        <view class="u-py-30 u-px-48 flex flex-between">
          <view style="width: 48rpx"></view>
          <view class="font-600 c-333 u-font-34"> 请选择公母数量 </view>
          <u--image
            :src="$fullLink('icon-close2.png')"
            width="48rpx"
            height="48rpx"
            @click="itemShow = false"
          ></u--image>
        </view>
        <view class="u-m-t-50 flex flex-center">
          <u--image
            :src="currentItem.categoryImage"
            width="160rpx"
            height="160rpx"
            radius="8rpx"
          ></u--image>
        </view>
        <view class="flex flex-center u-m-t-50">
          <view
            class="flex flex-between bg-box"
            style="padding-left: 84rpx; padding-right: 24rpx"
          >
            <view class="male"></view>
            <view
              class="u-p-12 flex flex-center"
              style="
                width: 360rpx;
                height: 100rpx;
                background: #edffd7;
                border-radius: 50rpx;
              "
            >
              <u-number-box v-model="maleCount" :min="0">
                <view class="minus-plus flex flex-center" slot="minus">
                  <u-icon
                    name="minus"
                    size="54rpx"
                    color="#ffffff"
                    bold
                  ></u-icon>
                </view>
                <view class="u-mx-32" slot="input" style="width: 120rpx">
                  <u--input
                    border="none"
                    v-model="maleCount"
                    inputAlign="center"
                    fontSize="40rpx"
                  ></u--input>
                </view>
                <view class="minus-plus flex flex-center" slot="plus">
                  <u-icon
                    name="plus"
                    size="54rpx"
                    color="#ffffff"
                    bold
                  ></u-icon>
                </view>
              </u-number-box>
            </view>
          </view>
        </view>
        <view class="flex flex-center u-m-t-40">
          <view
            class="flex flex-between bg-box"
            style="padding-left: 84rpx; padding-right: 24rpx"
          >
            <view class="female"></view>
            <view
              class="u-p-12 flex flex-center"
              style="
                width: 360rpx;
                height: 100rpx;
                background: #edffd7;
                border-radius: 50rpx;
              "
            >
              <u-number-box v-model="femaleCount" :min="0">
                <view class="minus-plus flex flex-center" slot="minus">
                  <u-icon
                    name="minus"
                    size="54rpx"
                    color="#ffffff"
                    bold
                  ></u-icon>
                </view>
                <view class="u-mx-32" slot="input" style="width: 120rpx">
                  <u--input
                    border="none"
                    v-model="femaleCount"
                    inputAlign="center"
                    fontSize="40rpx"
                  ></u--input>
                </view>
                <view class="minus-plus flex flex-center" slot="plus">
                  <u-icon
                    name="plus"
                    size="54rpx"
                    color="#ffffff"
                    bold
                  ></u-icon>
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
            @click="addConfirm"
          ></u-button>
        </view>
      </view>
    </u-popup>
    <u-popup :show="selectedShow" @close="selectedShow = false" round="32rpx">
      <view style="max-height: 1018rpx">
        <view class="u-py-30 u-px-48 flex flex-between">
          <view style="width: 48rpx"></view>
          <view class="font-600 c-333 u-font-34"> 已选择数量 </view>
          <u--image
            :src="$fullLink('icon-close2.png')"
            width="48rpx"
            height="48rpx"
            @click="selectedShow = false"
          ></u--image>
        </view>
        <view class="u-p-24" style="max-height: 762rpx; overflow-y: auto">
          <view
            class="bg-F6F6F8 b-radius-16 u-p-24 flex flex-between u-m-b-24"
            v-for="(item, index) in cartList"
            :key="index"
          >
            <u--image
              :src="item.categoryImage"
              width="108rpx"
              height="108rpx"
            ></u--image>
            <view class="flex-1 u-px-24">
              <view class="c-333 u-font-32 u-m-b-24">
                {{ item.categoryName }}
              </view>
              <view class="flex flex-between">
                <view class="flex align-center flex-1">
                  <view class="male"></view>
                  <view class="c-333 u-font-32 u-m-l-12">
                    {{ item.maleCount }}
                  </view>
                </view>
                <view class="flex align-center flex-1">
                  <view class="female"></view>

                  <view class="c-333 u-font-32 u-m-l-12">
                    {{ item.femaleCount }}
                  </view>
                </view>
              </view>
            </view>
            <view
              class="minus-plus flex flex-center"
              style="width: 88rpx; height: 88rpx"
              @click="cartList.splice(index, 1)"
            >
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
            @click="selectedShow = false"
          ></u-button>
        </view>
      </view>
    </u-popup>
    <u-popup
      :show="timeShow"
      @close="timeShow = false"
      bgColor="transparent"
      mode="center"
      :safeAreaInsetBottom="false"
    >
      <view class="pop-upnotification2 relative">
        <view class="flex align-center flex-col" style="margin-top: 204rpx">
          <view class="font-600 c-333 u-font-40" style="margin-bottom: 120rpx">
            请选择产羔时间
          </view>
          <uni-datetime-picker v-model="createTime" type="date">
            <view
              class="b-radius-16 flex flex-between u-p-28"
              style="
                width: 536rpx;
                height: 100rpx;
                border: 1rpx solid #b9ea9b;
                margin: auto;
              "
            >
              <view class="u-font-34 c-333 font-400">
                {{ createTime }}
              </view>
              <u--image
                :src="$fullLink('icon-calendar.png')"
                width="48rpx"
                height="48rpx"
              ></u--image>
            </view>
          </uni-datetime-picker>
          <view class="" style="margin-top: 82rpx; width: 480rpx">
            <u-button
              text="确认"
              shape="circle"
              size="large"
              color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
              @click="changeSheep"
            ></u-button>
          </view>
        </view>
        <view
          class="absolute flex flex-center"
          style="bottom: -104rpx; right: 0; left: 0; margin: auto"
        >
          <u-icon
            name="close-circle"
            color="#ffffff"
            size="40"
            @click="timeShow = false"
          ></u-icon>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {
  getCutSheepInventory,
  getHistorySheepInventory,
  bigSheepManage,
} from "@/common/request/api/home.js";
export default {
  data() {
    return {
      actionStyle: {
        background: "linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)",
        height: "34px",
        width: "80px",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "17px",
      },
      searchContent: "",
      registerList: [],
      tabOpt: "left",
      eweShow: false,
      eweNum: 0,
      itemShow: false,
      maleCount: 0,
      femaleCount: 0,
      selectedShow: false,
      // 选择的产羔时间弹窗-显示
      timeShow: false,
      // 选择的产羔时间
      createTime: uni.$u.timeFormat(new Date(), "yyyy-mm-dd"),
      // 当前选中的羊羔参数
      currentItem: {},
      // 羊羔添加购物车列表
      cartList: [],
      // 页面类型 add:添加羊羔, lessen:减少羊羔, bigSheep:大羊管理
      type: "",
      // 按钮加载状态
      btnLoading: false,
    };
  },
  computed: {
    bottom() {
      return getApp().globalData.systemInfo.safeAreaInsets.bottom;
    },
    // 计算羊羔总数
    sheepNum() {
      let num = 0;
      this.cartList.forEach((item) => {
        num += Number(item.maleCount) + Number(item.femaleCount);
      });
      return num;
    },
  },
  onLoad(options) {
    this.init(options);
  },
  methods: {
    /**
     * @description 初始化
     * @author c_shunyi 2025-08-05 17:26:49
     */
    init(options) {
      // 初始化数据
      // 获取页面类型
      this.type = options.type || "";
    },
    queryList(pageNo, pageSize) {
      // setTimeout(()=>{
      // 	let list = []
      // 	for(let i=1;i<=20;i++){
      // 		list.push({
      // 			image:'https://env-00jxtkgouyh5.normal.cloudstatic.cn/public/avatarImg.jpg',
      // 			categoryTitle:'羊的品类' + i,
      // 			maleNum:uni.$u.random(1, 99999),
      // 			femaleCount:uni.$u.random(1, 99999),
      // 		})
      // 	}
      // 	this.$refs.paging.completeByTotal(list,list.length);
      // 	this.eweShow = true
      // },1000)

      // 获取羊只品种库存列表
      // type 类型：1-大羊 2-羊羔
      // sfDate 1 不需要数据统计
      const params = {
        type: 1,
        sfDate: 1,
      };
      // 如果有搜索内容，则添加到参数中
      if (this.searchContent) {
        params.categoryName = this.searchContent;
      }
      if (this.tabOpt == "left") {
        // 常用羊只品种库存列表
        getCutSheepInventory(params)
          .then((res) => {
            let list = res.data.inventoryList || [];
            this.registerList = list;
            this.$refs.paging.completeByTotal(list, list.length);
          })
          .catch((err) => {
            this.$refs.paging.completeByError(err);
          });
      } else if (this.tabOpt == "right") {
        // 历史羊只品种库存列表
        getHistorySheepInventory(params)
          .then((res) => {
            let list = res.data.inventoryList || [];
            this.registerList = list;
            this.$refs.paging.completeByTotal(list, list.length);
          })
          .catch((err) => {
            this.$refs.paging.completeByError(err);
          });
      }
    },
    /**
     * @description 切换tab
     * @param type left-常用 right-历史
     * @return
     * @author c_shunyi 2025-08-05 17:29:43
     */
    selectTab(type) {
      // 切换tab
      this.tabOpt = type;
      // 重新查询数据
      this.queryList(1, 10);
    },
    /**
     * @description 提交
     * @author c_shunyi 2025-08-05 17:29:28
     */
    submit() {
      if (this.cartList.length === 0) {
        uni.$u.toast("请至少选择一只羊");
        return;
      }
      // 提交数据
      this.btnLoading = true;
      bigSheepManage({
        changes: this.cartList.map((item) => ({
          categoryId: item.categoryId,
          maleChange: Number(item.maleCount),
          femaleChange: Number(item.femaleCount),
        })),
      })
        .then((res) => {
          uni.$u.toast("提交成功");
          this.cartList = [];
          this.$refs.paging.refresh();
        })
        .catch((err) => {
          uni.$u.toast("提交失败");
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    /**
     * @description 点击列表项，记录选中项
     * @param item 当前点击的项
     * @author c_shunyi 2025-08-05 17:28:58
     */
    clickItem(item) {
      // 记录当前选中的大羊
      this.currentItem = item;
      // 初始化弹窗数据
      this.maleCount = item.maleCount || 0;
      this.femaleCount = item.femaleCount || 0;
      // 显示弹窗
      this.itemShow = true;
    },
    /**
     * @description 添加到羊羔购物车
     * @author c_shunyi 2025-08-05 17:28:38
     */
    addConfirm() {
      // 1.校验
      // 校验是否为数字
      if (isNaN(this.maleCount) || isNaN(this.femaleCount)) {
        uni.$u.toast("请输入合法的数字");
        return;
      }
      // 判断输入框值是都大于等于0
      if (this.maleCount < 0 || this.femaleCount < 0) {
        uni.$u.toast("羊库存最小为0");
        return;
      }
      // 2.判断购物车是否已存在该品类
      let index = this.cartList.findIndex(
        (it) => it.categoryId === this.currentItem.categoryId
      );
      if (index !== -1) {
        // 如果存在，更新数量
        this.cartList[index].maleCount = this.toNumber(this.maleCount);
        this.cartList[index].femaleCount = this.toNumber(this.femaleCount);
      }
      if (index == -1) {
        // 如果不存在，更新数量
        let item = {
          ...this.currentItem,
          maleCount: this.toNumber(this.maleCount),
          femaleCount: this.toNumber(this.femaleCount),
        };
        this.cartList.push(item);
      }
      // 清空输入框
      this.maleCount = 0;
      this.femaleCount = 0;
      // 关闭弹窗
      this.itemShow = false;
    },
    /**
     * @description 确认修改羊羔
     * @author c_shunyi 2025-08-05 17:28:19
     */
    changeSheep() {
      this.timeShow = false;
      if (this.cartList.length === 0) {
        uni.$u.toast("请至少选择一只羊");
        return;
      }
      const params = {
        sheepList: this.cartList.map((item) => ({
          categoryId: item.categoryId,
          maleChange: item.maleCount,
          femaleChange: item.femaleCount,
        })),
        motherSheepCount: this.createTime,
      };
      if (this.type === "add") {
        addLambSheep(params)
          .then((res) => {
            uni.$u.toast("添加成功");
            this.cartList = [];
            this.$refs.paging.refresh();
          })
          .catch((err) => {
            uni.$u.toast("添加失败");
          });
      } else if (this.type === "lessen") {
        // 处理减少羊羔的逻辑
        // 这里可以根据实际需求进行处理
        reduceLambSheep(params)
          .then((res) => {
            uni.$u.toast("减少成功");
            this.cartList = [];
            this.$refs.paging.refresh();
          })
          .catch((err) => {
            uni.$u.toast("减少失败");
          });
      }
    },
    /**
     * @description 根据名字搜索
     * @param e 搜索框输入内容
     * @author c_shunyi 2025-08-05 17:27:01
     */
    search(e) {
      this.queryList(1, 10);
    },
    /**
     * 将字符串变为数字
     * @param str 字符串
     * @returns {number} 返回数字，如果字符串为空或null或undefined，则返回0
     */
    toNumber(str) {
      if (str !== "" && str !== null && str !== undefined) return Number(str);
      else return 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.bg-register {
  width: 100vw;
  height: 100vh;
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-register1.png")
    0 0 no-repeat;
  background-size: contain;
}
.tab {
  width: 702rpx;
  height: 82rpx;
}
.tab-right {
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/tab-right.png")
    0 0 no-repeat;
  background-size: cover;
}
.tab-left {
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/tab-left.png")
    0 0 no-repeat;
  background-size: cover;
}
.common {
  font-weight: 600;
  font-size: 16px;
  color: #70b971;
}
::v-deep .u-badge {
  font-size: 24rpx !important;
  line-height: 36rpx !important;
}
.pop-upnotification1 {
  width: 600rpx;
  height: 814rpx;
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/pop-upnotification1.png")
    0 0 no-repeat;
  background-size: cover;
}
.bg-box {
  width: 654rpx;
  height: 122rpx;
  background: linear-gradient(215deg, #f7fff3, #fbfff0, #f7ffef);
  border: 1px solid;
  border-radius: 16rpx;
  border-image: linear-gradient(
      147deg,
      rgba(224, 255, 188, 1),
      rgba(219, 255, 220, 1)
    )
    1 1;
}
.pop-upnotification2 {
  width: 600rpx;
  height: 796.26rpx;
  background: url("https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/pop-upnotification2.png")
    0 0 no-repeat;
  background-size: cover;
}
</style>
