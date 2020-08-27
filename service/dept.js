/*
 * @Description: 获取部门信息
 * @Author: Steven
 * @Date: 2020-04-23 12:38:28
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:58:38
 */
import {request} from "./network"
import {DeptInfo} from "../config/api"

/**
 * 获取部门信息
 * @param {array<number>} deptIds
 * @return {Promise}
 */
function getDeptInfo({deptIds}) {
  return request({
    url: DeptInfo,
    data: {
      deptIds,
    },
  })
}

module.exports = {
  getDeptInfo,
}
