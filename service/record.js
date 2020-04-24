import { request } from "./network";
import {
  CheckInRecord,
  StaffDayRecord,
  StaffMonthRecord,
  DeptRecord,
} from "../config/api";

/**
 *@function 获取某人某天签到次数和最新一条签到记录
 *
 * @param {*} options
 * @returns
 */
function getRecord(options) {
  var queryString = Object.keys(options)
    .map((key) => key + "=" + options[key])
    .join("&");
  return request({
    url: CheckInRecord + `?${queryString}`,
    method: "GET",
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
    data: JSON.stringify(options),
  });
}

/**
 *@function 获取用户固定日期的签到记录
 *
 * @param {*} options
 * @returns
 */
function getOneDayRecord(options) {
  var queryString = Object.keys(options)
    .map((key) => key + "=" + options[key])
    .join("&");
  return request({
    url: StaffDayRecord + `?${queryString}`,
    method: "GET",
  });
}
/**
 *@function 获取指定用户当月签到记录
 *
 * @param {*} options
 * @returns
 */
function getMonthRecord(options) {
  var queryString = Object.keys(options)
    .map((key) => key + "=" + options[key])
    .join("&");
  return request({
    url: StaffMonthRecord + `?${queryString}`,
    method: "GET",
  });
}
/**
 *@function 获取当前用户所在部门签到记录
 *
 * @param {*} options
 * @returns
 */
function getOwnDeptRecord(options) {
  var queryString = Object.keys(options)
    .map((key) => key + "=" + options[key])
    .join("&");
  return request({
    url: DeptRecord + `?${queryString}`,
    method: "GET",
  });
}

module.exports = {
  getRecord,
  setRecord,
  getOneDayRecord,
  getMonthRecord,
  getOwnDeptRecord,
};
