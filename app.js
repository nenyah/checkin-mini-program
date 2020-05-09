import { setStorageSync, getStorageSync } from "./service/storage";
import moment from "moment";

App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", my.getSystemInfoSync());
    console.log("SDKVersion", my.SDKVersion);
  },

  onShow() {
    console.log("App Show");
    // 设置当前时间
    // this._setCurrentTime();
  },
  onHide() {
    console.log("App Hide");
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
  // _setCurrentTime() {
  //   this.globalData.currentTime = moment().format();
  // },
});
