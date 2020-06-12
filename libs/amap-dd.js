/*
 * @Description: 封装高德api
 * @Author: Steven
 * @Date: 2020-05-18 16:14:25
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-12 11:57:49
 */ 
import { request } from "/service/network";
import { limitRange } from "/config/api";
const gaodeUrl = "https://restapi.amap.com/v3/";
function reGeo(opt) {
  return request({
    url: gaodeUrl + "geocode/regeo",
    data: {
      key: "78afced4810e78fef4e60c9be330ca06",
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

function getAround(opt) {
  return request({
    url: gaodeUrl + "place/around",
    data: {
      key: "78afced4810e78fef4e60c9be330ca06",
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
