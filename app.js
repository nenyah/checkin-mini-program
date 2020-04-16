import { setStorageSync } from "./service/storage.js";
import { getUserInfo } from "./service/login.js";
import moment from "moment";
import { userinfo } from "./mock/userinfo.js";
App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", dd.getSystemInfoSync());
    console.log("SDKVersion", dd.SDKVersion);

    setStorageSync({
      key: "checkInDate",
      data: {
        date: moment(),
      },
    });
    this._getUserInfo();
    
  },
  _getUserInfo() {
    try {
      getUserInfo().then((res) => {
        console.log("应用开始时加载用户数据", res);
        this.globalData.userInfo = res.userInfo;
      });
    } catch (error) {
      this.globalData.userInfo = userinfo;
    }
    // getUserInfo().then(res=>{
    //   console.log('应用开始时加载用户数据',res)
    //   this.globalData.userInfo = res.userInfo
    // }).catch(err=>{

    // })
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
