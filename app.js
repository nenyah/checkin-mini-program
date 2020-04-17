import { setStorageSync } from "./service/storage.js";
import { getUserInfo } from "/service/login.js";
import moment from "moment";

App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", dd.getSystemInfoSync());
    console.log("SDKVersion", dd.SDKVersion);
    moment.locale("zh-cn");
    setStorageSync({
      key: "checkInDate",
      data: {
        date: moment().format(),
      },
    });
    this._getUserInfo();
  },
  _getUserInfo() {
    console.log(typeof getUserInfo);
    getUserInfo().then((res) =>
      setStorageSync({
        key: "userinfo",
        data: res,
      })
    );
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
  globalData: {
    userInfo: null,
    hasLogin: false,
  },
});
