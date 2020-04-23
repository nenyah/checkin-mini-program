import { setStorageSync, getStorageSync } from "./service/storage.js";

import moment from "moment";
import { debug } from "/config/api.js";

App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", dd.getSystemInfoSync());
    console.log("SDKVersion", dd.SDKVersion);
  },

  onShow() {
    console.log("App Show");
    if (debug) return;
    // 设置当前时间
    this._setCurrentTime();
  },
  onHide() {
    console.log("App Hide");
  },
  globalData: {
    userInfo: null,
    checkinTimes: 0,
  },
  /**
   *获取当前时间
   *
   */
  _setCurrentTime() {
    setStorageSync({
      key: "checkInDate",
      data: {
        date: moment().format(),
      },
    });
  },
});
