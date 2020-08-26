/**
 * @Description: 签到小程序
 * @Author: Steven
 * @Date: 2020-05-18 16:33:16
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-25 15:53:58
 */

import moment from "moment"
import EventEmitter from "eventemitter3"
import { login } from "/service/login"
import utils from "/util/utils"
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
    console.log(
      "App Show",
      this.globalData.currentTime,
      this.globalData.location
    )
  },
  onHide() {
    this.globalData.currentTime = {}
    this.globalData.location = {}
    this.globalData.selectedLocation = {}
    this.globalData.selectedClient = {}
    console.log(
      "App Hide",
      this.globalData.currentTime,
      this.globalData.location
    )
  },
  onError(msg) {
    console.log(msg)
  },
  globalData: {
    version: "0.0.69",
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
    if (utils.isEmpty(this.globalData.currentTime)) {
      this.globalData.currentTime = moment()
    }
  },
})
