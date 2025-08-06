<template>
  <view class="bg-register">
    <z-paging
      ref="paging"
      v-model="recordList"
      @query="queryList"
      auto-show-system-loading
      auto-show-back-to-top
    >
      <template #top>
        <navbar title="填报记录"></navbar>
      </template>
      <view class="u-p-24">
        <view
          class="b-radius-16 u-m-b-24 overflow-hidden"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <view
            class="u-p-24 flex flex-between"
            :class="item.operationType == 1 ? 'bg-add' : 'bg-less'"
          >
            <view class="flex flex-center">
              <u--image
                :src="
                  item.operationType == 1
                    ? $fullLink('icon-add2.png')
                    : $fullLink('icon-less.png')
                "
                width="32rpx"
                height="32rpx"
              ></u--image>
              <view class="u-font-32 c-333 u-m-l-12">
                羊羔{{ item.operationType == 1 ? "增加" : "减少" }}
                {{ item.motherSheepCount || 0 }}只
              </view>
            </view>
            <view class="flex flex-center">
              <u-icon name="clock" color="#333333" size="32rpx"></u-icon>
              <view class="u-font-32 c-333 u-m-l-12 font-400">
                {{ $u.timeFormat(item.createTime, "yyyy-mm-dd") }}
              </view>
            </view>
          </view>
          <view class="u-p-24 bg-fff">
            <view
              class="u-p-24 flex align-center b-radius-20 u-m-b-24"
              style="background-color: #f6f6f8"
              v-for="(it, i) in item.details"
              :key="it.categoryId"
            >
              <u--image
                :src="it.categoryImage"
                width="108rpx"
                height="108rpx"
                radius="8rpx"
              ></u--image>
              <view class="u-m-l-24 flex-1">
                <view class="u-font-32 c-333 u-m-b-24">
                  {{ it.categoryName || "-" }}
                </view>
                <view class="flex align-center">
                  <view class="flex align-center flex-1">
                    <view class="male"></view>
                    <view class="c-333 u-font-32 u-m-l-12">
                      {{ item.operationType == 1 ? "+" : "-"
                      }}{{ it.maleChange }}
                    </view>
                  </view>
                  <view class="flex align-center flex-1">
                    <view class="female"></view>
                    <view class="c-333 u-font-32 u-m-l-12">
                      {{ item.operationType == 1 ? "+" : "-"
                      }}{{ it.femaleChange }}
                    </view>
                  </view>
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
import { getRecordList } from "@/common/request/api/user.js";
export default {
  data() {
    return {
      recordList: [],
    };
  },
  methods: {
    /**
     * @description 获取记录列表
     * @author c_shunyi 2025-08-05 17:40:51
     */
    queryList(pageNo, pageSize) {
      getRecordList({
        page: pageNo,
        size: pageSize,
      })
        .then((res) => {
          let list = res.data.list || [];
          this.$refs.paging.completeByTotal(list, res.data.totalCount);
        })
        .catch(() => {
          this.$refs.paging.completeByTotal([], 0);
        });
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
.bg-add {
  background: linear-gradient(156deg, #b0ea6c, #8fda90);
}
.bg-less {
  background: linear-gradient(88deg, #c0f0ff, #bcd6ff);
}
</style>
