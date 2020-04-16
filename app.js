import { setStorageSync } from "./service/storage.js";
import { getUserInfo } from "./service/login.js";
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
  getUserInfo(){
    getUserInfo().then(res=>{
      console.log('应用开始时加载用户数据',res)
      this.globalData.userInfo = res.userInfo
    })
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
