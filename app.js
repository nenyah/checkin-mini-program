import { setStorageSync, getStorageSync } from "./service/storage";

import moment from "moment";
import { debug } from "/config/api";

App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", my.getSystemInfoSync());
    console.log("SDKVersion", my.SDKVersion);
  },

  onShow() {
    console.log("App Show");
    if (debug) return;
    // 设置当前时间
    this._setCurrentTime();
  },
  onHide() {
    console.log("App Hide");
    // 清除缓存
    // my.removeStorage({
    //   key: "selectedClient",
    //   success: function () {
    //     my.alert({ content: "删除选择用户成功" });
    //   },
    // });
    // my.removeStorage({
    //   key: "checkInDate",
    //   success: function () {
    //     my.alert({ content: "删除签到时间成功" });
    //   },
    // });
  },
  globalData: {
    userInfo: null,
    records: null,
    selectedClient: null,
    selectedLocation: null,
    checkinTimes: 0,
    location: null,
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
