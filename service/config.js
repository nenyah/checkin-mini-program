/*
 * @Description: 配置接口
 * @Author: Steven
 * @Date: 2020-05-13 14:44:06
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:58:45
 */

import {request} from "./network"
import {Config} from "/config/api"

function getConfig(params) {
  return request({
    url: Config,
    data: {
      name: params.value,
    },
  })
}

module.exports = {
  getConfig,
}
