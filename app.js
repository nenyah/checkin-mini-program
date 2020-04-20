import { setStorageSync, getStorageSync } from "./service/storage.js";
import { getUserInfo } from "./service/login.js";
import { getRecord } from "./service/record.js";
import moment from "moment";

App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", dd.getSystemInfoSync());
    console.log("SDKVersion", dd.SDKVersion);
  },

  onShow() {
    console.log("App Show");
    // 设置当前时间
    this._setCurrentTime();
    // 获取用户信息
    this._getUserInfo();
  },
  onHide() {
    console.log("App Hide");
  },
  globalData: {
    userInfo: null,
    hasLogin: false,
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
  /**
   *获取用户信息
   *
   */
  _getUserInfo() {
    console.log(typeof getUserInfo);
    getUserInfo()
      .then((res) => {
        setStorageSync({
          key: "userinfo",
          data: res,
        });
        // 获取用户历史签到信息
        this._getHistoryRecord();
      })
      .catch((err) => console.log(err));
  },
  /**
   * 获取历史信息
   *
   */
  _getHistoryRecord() {
    const checkInDate = getStorageSync("checkInDate");
    const today = moment(moment(checkInDate).format("YYYY-MM-DD")).valueOf();
    const userid = getStorageSync("userinfo").data.userid;
    const params = JSON.stringify({ userid, date: today });
    getRecord({ userid: userid, date: today })
      .then((res) => {
        console.log("首页获取当日历史信息", res);
        setStorageSync({
          key: "historyRecord",
          data: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
