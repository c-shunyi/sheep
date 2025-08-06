import api from "../index.js";

/**
 * 获取轮播图
 * @param {*} param
 * @returns
 */
export const getBannerList = (param) =>
  api({
    url: `/xmWeb/v1/bs/banner/get/list`,
    param,
  });
/**
 * 获取新闻列表
 * @param {*} param
 * @returns
 */
export const getNewList = (param) =>
  api({
    url: `/xmWeb/v1/mb/message/get/page/list`,
    param,
  });

/**
 * @description 获取新闻详情
 * @param dateId 新闻ID
 * @author c_shunyi 2025-08-05 18:16:34
 */
export const getNewDetails = (dateId) =>
  api({
    url: `/xmWeb/v1/mb/message/details/${dateId}`,
    method: "POST",
  });
