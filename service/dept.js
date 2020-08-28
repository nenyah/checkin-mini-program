/*
 * @Description: 获取部门信息
 * @Author: Steven
 * @Date: 2020-04-23 12:38:28
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:58:38
 */
import {request} from "./network"
import {DeptInfo, DeptuserInfo} from "../config/api"

/**
 * 获取部门信息
 * @param {array<number>|undefined} deptIds
 * @return {Promise}
 */
function getDeptInfo({deptIds}) {
  return request({
    url: DeptInfo,
    data: {
      deptIds: deptIds ? deptIds : undefined,
    },
  })
}

/**
 * 获取部门内用户信息
 * @param {array<number>|undefined} deptIds
 * @return {Promise}
 */
function getDeptUserInfo({deptIds}) {
  return request({
    url: DeptuserInfo,
    data: {
      deptIds,
    }
  })
}

module.exports = {
  getDeptInfo,
  getDeptUserInfo,
}
