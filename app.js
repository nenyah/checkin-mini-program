/*
 * @Description: 签到小程序
 * @Author: Steven
 * @Date: 2020-05-18 16:33:16
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 10:59:22
 */

import moment from "moment"
import EventEmitter from "eventemitter3"
import { login } from "./service/login"
moment.locale("zh-cn")
App({
  // 实例化eventemitter
  emitter: new EventEmitter(),
  onLaunch(options) {
    console.log("App Launch", options)
    console.log("getSystemInfoSync", my.getSystemInfoSync())
    console.log("SDKVersion", dd.ExtSDKVersion || dd.SDKVersion)
    login()
  },
  onShow() {
    // 设置当前时间
    this._setCurrentTime()
    console.log("App Show", this.globalData.currentTime)
  },
  onHide() {
    console.log("App Hide", this.globalData.currentTime)
    this.globalData.currentTime = null
  },
  onError(msg) {
    console.log(msg)
  },
  globalData: {
    version: "0.0.64",
    userInfo: {},
    records: {},
    selectedClient: {},
    selectedLocation: {},
    checkinTimes: 0,
    location: {},
    currentTime: "",
  },
  /**
   *获取当前时间
   *
   * @author Steven
   * @date 2020-06-24
   */
  _setCurrentTime() {
    if (!this.globalData.currentTime) {
      this.globalData.currentTime = moment().format()
    }
  },
})
