import { setStorageSync, getStorageSync } from "./service/storage";
import moment from "moment";
moment.locale("zh-cn");
App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", my.getSystemInfoSync());
    console.log("SDKVersion", my.SDKVersion);
  },

  onShow() {
    // 设置当前时间
    this._setCurrentTime();
    console.log("App Show", this.globalData.currentTime);
  },
  onHide() {
    console.log("App Hide", this.globalData.currentTime);
  },
  onError(msg) {
    console.log(msg);
  },
  globalData: {
    userInfo: null,
    records: null,
    selectedClient: null,
    selectedLocation: null,
    checkinTimes: 0,
    location: null,
    currentTime: "",
  },

  /**
   *获取当前时间
   *
   */
  _setCurrentTime() {
    this.globalData.currentTime = moment().format();
  },
});
