import moment from "moment";
import { getUserInfo } from "/service/login";
import { getRecord } from "/service/record";
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
  onReady() {
    // 页面加载完成
    this._getUserInfo();
  },
  onShow() {
    // 页面显示

    this._getClient();
    this._getLoncation();
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
    const record = app.globalData.records;

    if (!record) return;
    const checkTimes = record[0].quantity;
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
      console.log("首页：从全局获得选择地址", res);
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
          console.log("首页：获取地址成功", res);
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
        .catch((err) => console.error(err));
    }
  },
  /**
   *@author steven
   *@function 获取当前时间
   */
  async _getCurrentTime() {
    const checkInDate = getStorageSync("checkInDate");
    if (checkInDate.data) {
      const mx = moment(checkInDate.data.date);
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
      console.log("首页：从全局获得选择对象", client);
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
          console.log("首页：获得用户信息", res);
          app.globalData.userInfo = res;
          this._getRecord();
        })
        .catch((err) => console.error("首页：获取用户信息报错", err));
    }
    this._getRecord();
  },

  /**
   * 获取历史信息
   *
   */
  async _getRecord() {
    const userinfo = app.globalData.userInfo;
    const userIds = userinfo.user.dingUserId;
    console.log("首页：获取记录时，用户信息", userIds);

    getRecord({ userIds })
      .then((res) => {
        console.log("首页：获取当日历史信息", res);
        res.currentTime = this.data.currentTime;
        app.globalData.records = res.signInHisPage.records;
        if (!res.signInHisPage.records.length) {
          return;
        }
        this._checkRecordTimes();
        // this.setData({
        //   checkTimes: res.signInHisPage.records[0].quantity,
        // });
      })
      .catch((err) => console.error(err));
  },
});
