import { request, uploadFile } from "./network";
import {
  CheckInRecord,
  StaffDayRecord,
  StaffMonthRecord,
  DeptRecord,
  UploadFile,
  TodayCount,
} from "../config/api";

function getTodayCount() {
  return request({
    url: TodayCount,
  });
}
/**
 *@function 获取某人某天签到次数和最新一条签到记录
 *
 * @param {*} options
 * @returns
 */
function getRecord(options) {
  return request({
    url: CheckInRecord,
    data: {
      ...options,
    },
  });
}

/**
 *@function 上传签到信息
 *
 * @param {*} options
 * @returns
 */
function setRecord(options) {
  return request({
    url: CheckInRecord,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(options),
  });
}

/**
 *@function 上传文件
 *
 * @param {*} options
 * @returns
 */
function setRecordFile(options) {
  return uploadFile({
    url: UploadFile,
    filePath: options.filePath,
    formData: options.formData || { detailPlace: "测试地址" },
  });
}
/**
 *@function 获取用户固定日期的签到记录
 *
 * @param {*} options
 * @returns
 */
function getOneDayRecord(options) {
  return request({
    url: StaffDayRecord,
    data: {
      ...options,
    },
  });
}
/**
 *@function 获取指定用户当月签到记录
 *
 * @param {*} options
 * @returns
 */
function getMonthRecord(options) {
  return request({
    url: StaffMonthRecord,
    data: {
      ...options,
    },
  });
}
/**
 *@function 获取当前用户所在部门签到记录
 *
 * @param {*} options
 * @returns
 */
function getOwnDeptRecord(options) {
  return request({
    url: DeptRecord,
    data: {
      ...options,
    },
  });
}

module.exports = {
  getTodayCount,
  getRecord,
  setRecord,
  getOneDayRecord,
  getMonthRecord,
  getOwnDeptRecord,
  setRecordFile,
};
