/*
 * @Description: 封装高德api
 * @Author: Steven
 * @Date: 2020-05-18 16:14:25
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-24 15:02:59
 */

import { request } from "/service/network";
import { limitRange } from "/config/api";
import { key } from "./secret";
const gaodeUrl = "https://restapi.amap.com/v3/";
/**
 *逆地址解析
 *
 * @author Steven
 * @date 2020-06-24
 * @param {object} opt 定位信息
 * @returns Promise
 */
function reGeo(opt) {
  return request({
    url: gaodeUrl + "geocode/regeo",
    data: {
      key: key,
      location: `${opt.longitude},${opt.latitude}`,
      radius: opt.radius || limitRange,
      extensions: "all",
      batch: false,
      homeorcorp: 2,
      poitype: "090000|170000|190000",
    },
    headers: { "content-type": "application/json" },
  });
}

/**
 *根据定位获取周边地址
 *
 * @author Steven
 * @date 2020-06-24
 * @param {object} opt 定位
 * @returns Promise
 */
function getAround(opt) {
  return request({
    url: gaodeUrl + "place/around",
    data: {
      key: key,
      location: `${opt.longitude},${opt.latitude}`,
      radius: opt.radius || limitRange,
      extensions: "all",
      types: "090000|170000|190000",
      offset: 100,
      page: 1,
    },
    headers: { "content-type": "application/json" },
  });
}

module.exports = {
  getAround,
  reGeo,
};
