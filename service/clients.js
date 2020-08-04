/*
 * @Description: 客户接口
 * @Author: Steven
 * @Date: 2020-04-17 15:59:01
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-22 13:12:42
 */

import { request } from "./network"
import { Clientsinfo, Customerinfo } from "/config/api"

function getClients(params) {
  return request({
    url: Clientsinfo,
    data: {
      ...params,
    },
  })
}
function getCustomer(params) {
  return request({
    url: Customerinfo,
    data: {
      ...params,
    },
  })
}
module.exports = {
  getClients,
  getCustomer,
}
