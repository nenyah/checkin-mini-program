import { setStorageSync, getStorageSync } from "./service/storage";

import moment from "moment";
import { debug } from "/config/api";

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
    // 清除缓存
    my.removeStorage({
      key: "selectedClient",
      success: function () {
        dd.alert({ content: "删除选择用户成功" });
      },
    });
    my.removeStorage({
      key: "checkInDate",
      success: function () {
        dd.alert({ content: "删除签到时间成功" });
      },
    });
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
