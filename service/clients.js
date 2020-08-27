/*
 * @Description: 客户接口
 * @Author: Steven
 * @Date: 2020-04-17 15:59:01
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-22 13:12:42
 */

import {request} from "./network"
import {ClientsInfo} from "/config/api"

/**
 * 获取机构信息
 * @param {number} userId 用户id
 * @param {number} groupId 集团id
 * @param {string} orgName 组织名称 可模糊查询
 * @param {number} size 页面数据量
 * @param {number} current 当前页数
 * @return {Promise}
 */
function getClients({current, size, userId, groupId, orgName}) {
  return request({
    url: ClientsInfo,
    data: {
      userId, groupId, orgName
    },
  })
}


module.exports = {
  getClients,
}
