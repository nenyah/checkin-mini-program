import { request, uploadFile } from "./network"
import {
  CheckInRecord,
  DeptRecord,
  StaffDayRecord,
  StaffMonthRecord,
  TodayCount,
  UploadFile,
} from "/config/api"

/**
 *当天签到记录
 * @author steven
 * @returns Promise
 */
function getTodayCount() {
  return request({
    url: TodayCount,
  })
}
/**
 *获取某人某天签到次数和最新一条签到记录
 * @author steven
 * @param {object} options
 * @returns Promise
 */
function getRecord(options) {
  return request({
    url: CheckInRecord,
    data: {
      ...options,
    },
  })
}

/**
 *上传签到信息
 * @author steven
 * @param {object} options
 * @returns Promise
 */
function setRecord(options) {
  return request({
    url: CheckInRecord,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(options),
  })
}

/**
 *上传文件
 * @author steven
 * @param {object} options
 * @returns Promise
 */
function setRecordFile(options) {
  return uploadFile({
    url: UploadFile,
    filePath: options.filePath,
    formData: options.formData || { detailPlace: "测试地址" },
  })
}

/**
 *获取用户固定日期的签到记录
 * @author steven
 * @param {object} options
 * @returns Promise
 */
function getOneDayRecord(options) {
  return request({
    url: StaffDayRecord,
    data: {
      ...options,
    },
  })
}
/**
 *获取指定用户当月签到记录
 * @author steven
 * @param {*} options
 * @returns Promise
 */
function getMonthRecord(options) {
  return request({
    url: StaffMonthRecord,
    data: {
      ...options,
    },
  })
}
/**
 *获取当前用户所在部门签到记录
 * @author steven
 * @param {*} options
 * @returns Promise
 */
function getOwnDeptRecord(options) {
  return request({
    url: DeptRecord,
    data: {
      ...options,
    },
  })
}

module.exports = {
  getTodayCount,
  getRecord,
  setRecord,
  getOneDayRecord,
  getMonthRecord,
  getOwnDeptRecord,
  setRecordFile,
}
