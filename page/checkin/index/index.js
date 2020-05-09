import moment from "moment";
import { getUserInfo } from "/service/login";
import { getRecord, getTodayCount } from "/service/record";
import { getLocation } from "/service/location";
import {
  getStorage,
  getStorageSync,
  setStorage,
  setStorageSync,
} from "/service/storage";
import { companyName, markers } from "/config/api";

var app = getApp();

Page({
  data: {
    longitude: "",
    latitude: "",
    address: "",
    markers: markers,
    client: "",
    today: "",
    ctime: "",
    company: companyName,
    checkTimes: 0,
  },

  onLoad() {
    // 首页加载 初始化数据
    // 日期 时间 地址 历史签到 签到次数
    // 获取当前时间
    this._getCurrentTime();
  },
  onShow() {
    // 页面显示
    console.log("首页显示");

    this._getUserInfo();
    this._getClient();
    this._getLoncation();
  },
  onUnload() {
    console.log("index unload");
  },
  onReady(e) {
  },
  onHide() {
    console.log("首页隐藏");
  },
  adjustLocation() {
    my.navigateTo({
      url: "/page/checkin/location-adjust/location-adjust",
    });
  },

  /**
   *@author steven
   *@function 获取当日签到次数
   */
  async _checkRecordTimes() {
    const checkTimes = await getTodayCount();
    console.log("首页：获取当日签到次数", checkTimes);
    this.setData({
      checkTimes,
    });
  },

  /**
   *@author steven
   *@function 获取当前定位信息
   */
  async _getLoncation() {
    if (app.globalData.selectedLocation) {
      const res = app.globalData.selectedLocation;
      console.log("首页：从全局获得选择地址");
      console.info(res);
      this.setData({
        longitude: res.longitude,
        latitude: res.latitude,
        address: res.address,
        "markers[0].id": 1,
        "markers[0].longitude": res.longitude,
        "markers[0].latitude": res.latitude,
      });
    } else {
      getLocation()
        .then((res) => {
          console.log("首页：获取地址成功");
          console.info(res);
          app.globalData.location = {
            longitude: res.longitude,
            latitude: res.latitude,
            address: res.address,
          };
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            address: res.address,
            "markers[0].id": 1,
            "markers[0].longitude": res.longitude,
            "markers[0].latitude": res.latitude,
          });
        })
        .catch((err) => {
          console.error(err);
          if (err.error === 4) {
            my.showToast({
              type: "fail",
              content: "还没有打开定位哦！",
            });
          } else if (err.error === 12) {
            my.showToast({
              type: "fail",
              content: "网络异常，请检查网络！",
            });
          }
        });
    }
  },
  /**
   *@author steven
   *@function 获取当前时间
   */
  async _getCurrentTime() {
    app.globalData.currentTime = moment().format();
    const checkInDate = app.globalData.currentTime;
    if (checkInDate) {
      const mx = moment(checkInDate);
      const today = mx.format("YYYY年MM月DD日");
      const ctime = mx.format("HH:mm");
      this.setData({
        today,
        ctime,
      });
    }
  },
  /**
   *@author steven
   *@function 从全局中获取拜访对象
   */
  async _getClient() {
    const client = app.globalData.selectedClient;
    if (client) {
      console.log("首页：从全局获得选择对象");
      console.info(client);
      this.setData({
        client,
      });
    }
  },
  /**
   *获取用户信息
   *
   */
  async _getUserInfo() {
    let userinfo = app.globalData.userInfo;

    if (!userinfo) {
      // 获取用户信息
      console.log("首页：没有用户信息，执行获取用户");
      return getUserInfo()
        .then((res) => {
          console.log("首页：获得用户信息");
          console.info(res);
          app.globalData.userInfo = res;
          this._checkRecordTimes();
        })
        .catch((err) => console.error("首页：获取用户信息报错", err));
    }
    this._checkRecordTimes();
  },
});
