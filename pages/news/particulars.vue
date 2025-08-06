<template>
  <view class="">
    <z-paging
      ref="paging"
      :auto="false"
      :refresher-enabled="false"
      :loading-more-enabled="false"
    >
      <template #top>
        <navbar title="消息详情"></navbar>
      </template>
      <view class="u-p-24">
        <view
          class="u-font-36 c-333 font-600 line-h-36 line-1"
          style="width: 702rpx; text-align: center"
        >
          {{ title || "暂无标题" }}
        </view>
        <view class="u-font-28 font-400 c-999 u-my-14">
          {{ $u.timeFormat(createTime, "yyyy-mm-dd hh:MM:ss") }}&nbsp;&nbsp;发布
        </view>
        <u-parse :content="content"></u-parse>
      </view>
      <template #bottom>
        <view class="u-p-24">
          <u-button text="返回" shape="circle" @click="$navBack()"></u-button>
        </view>
        <view :style="[{ height: bottom + 'px' }]"></view>
      </template>
    </z-paging>
  </view>
</template>

<script>
import { getNewDetails } from "@/common/request/api/news.js";
export default {
  data() {
    return {
      content: "富文本富文本",
      createTime: "",
      newsId: "",
      title: "标题",
    };
  },
  computed: {
    bottom() {
      return getApp().globalData.systemInfo.safeAreaInsets.bottom;
    },
  },
  onLoad(options) {
    this.newsId = options.newsId;
    this.getNewDetails();
  },
  methods: {
    /**
     * @description 获取消息详情
     * @author c_shunyi 2025-08-05 18:18:12
     */
    async getNewDetails() {
      const res = await getNewDetails(this.newsId);
      console.log("消息详情", res);
      this.content = res.data.basicInfo;
      this.title = res.data.labelTitle1;
      this.createTime = uni.$u.timeFormat(
        new Date(res.data.createTime),
        "yyyy-mm-dd hh:MM:ss"
      );
    },
  },
};
</script>

<style></style>
