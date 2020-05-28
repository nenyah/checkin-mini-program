import { Userinfo } from "/config/api";
import { request } from "/service/network";
import moment from "moment";
moment.locale("zh-cn");
App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", my.getSystemInfoSync());
    console.log("SDKVersion", my.SDKVersion);
    this.login();
  },

  onShow() {
    // 设置当前时间
    this._setCurrentTime();
    console.log("App Show", this.globalData.currentTime);
  },
  onHide() {
    console.log("App Hide", this.globalData.currentTime);
    this.globalData.currentTime = null;
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
    if (!this.globalData.currentTime) {
      this.globalData.currentTime = moment().format();
    }
  },
  login() {
    console.log("获取登录");
    my.getAuthCode({
      success: (res) => {
        request({
          url: Userinfo,
          data: {
            authCode: res.authCode,
          },
        })
          .then((res) => {
            console.log(res);

            if (!res) {
              console.error("登录错误");
            }
            // 储存用户信息、tolen
            this.globalData.userInfo = res.user;
            this.globalData.token = res.token;
          })
          .catch((err) => {
            console.error(err);
          });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  },
});
