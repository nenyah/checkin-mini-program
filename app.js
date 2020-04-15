import { setStorageSync } from "./service/storage.js";
App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", dd.getSystemInfoSync());
    console.log("SDKVersion", dd.SDKVersion);

    setStorageSync({
      key: "checkInDate",
      data: {
        date: new Date(),
      },
    });
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
