/*
 * @Description: 签到小程序
 * @Author: Steven
 * @Date: 2020-05-18 16:33:16
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-23 15:40:26
 */

import moment from "moment";
import { login } from "./service/login";
moment.locale("zh-cn");
App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", my.getSystemInfoSync());
    console.log("SDKVersion", dd.ExtSDKVersion || dd.SDKVersion);
    // const updateManager = my.getUpdateManager();

    // updateManager.onCheckForUpdate(function (res) {
    //   // 请求完新版本信息的回调
    //   console.log(res.hasUpdate); // 是否有更新
    // });

    // updateManager.onUpdateReady(function (ret) {
    //   console.log(ret.version); // 更新版本号
    //   my.confirm({
    //     title: "更新提示",
    //     content: "新版本已经准备好，是否重启应用？",
    //     success: function (res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate();
    //       }
    //     },
    //   });
    // });

    // updateManager.onUpdateFailed(function () {
    //   // 新版本下载失败
    // });
    this.checkLogin();
  },

  onShow() {
    // 设置当前时间
    this._setCurrentTime();
    console.log("App Show", this.globalData.currentTime);
  },
  onHide() {
    console.log("App Hide", this.globalData.currentTime);
    this.globalData.currentTime = null;
  },
  onError(msg) {
    console.log(msg);
  },
  globalData: {
    version: "0.0.53",
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
   *@author steven
   */
  _setCurrentTime() {
    if (!this.globalData.currentTime) {
      this.globalData.currentTime = moment().format();
    }
  },
  checkLogin(){
    return login()
  }
});
