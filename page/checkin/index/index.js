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
import _ from "lodash/core";

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
    this._getLoncation();
    this._getRecord();
    this._checkRecordTimes();
    this._getUserInfo();
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this._getClient();
    this._getLoncation();
  },
  adjustLocation() {
    my.navigateTo({
      url: "../location-adjust/location-adjust",
    });
  },
  /**
   *@author steven
   *@function 获取当日签到次数
   */
  _checkRecordTimes() {
    const checkTimes = getStorageSync("Record").data;
    console.log(checkTimes);

    if (checkTimes) {
      this.setData({
        checkTimes: checkTimes.signInHisPage.records[0].quantity,
      });
    }
  },

  /**
   *@author steven
   *@function 获取当前定位信息
   */
  _getLoncation() {
    getStorage("location").then((res) => {
      if (!res.data) {
        // 没有缓存就重新定位获取地址信息
        getLocation().then((res) => {
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            address: res.address,
            "markers[0].id": 1,
            "markers[0].longitude": res.longitude,
            "markers[0].latitude": res.latitude,
          });
          // 同步存入缓存
          setStorageSync({
            key: "location",
            data: {
              longitude: res.longitude,
              latitude: res.latitude,
              address: res.address,
            },
          });
        });
      } else {
        // 有缓存就直接用缓存数据渲染页面
        this.setData({
          longitude: res.data.longitude,
          latitude: res.data.latitude,
          address: res.data.address,
          "markers[0].longitude": res.data.longitude,
          "markers[0].latitude": res.data.latitude,
        });
      }
    });
  },
  /**
   *@author steven
   *@function 获取当前时间
   */
  _getCurrentTime() {
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
   *@function 从缓存中获取拜访对象
   */
  _getClient() {
    getStorage("selectedClient").then((res) => {
      if (res.data) {
        this.setData({
          client: res.data,
        });
      }
    });
  },
  /**
   *获取用户信息
   *
   */
  _getUserInfo() {
    let userinfo = getStorageSync("userinfo");
    if (!userinfo.data) {
      // 获取用户信息
      console.log("没有用户缓存，执行获取用户");
      getUserInfo()
        .then((res) => {
          console.log("用户信息", res);
          setStorageSync({
            key: "userinfo",
            data: res,
          });
          this._getRecord();
        })
        .catch((err) => console.error("获取用户信息报错", err));
    }
  },

  /**
   * 获取历史信息
   *
   */
  async _getRecord() {
    const record = await getStorage("Record");

    if (
      !record.data ||
      record.data.signInHisPage.records[0].time.substr(0, 4) != this.data.ctime
    ) {
      const userinfo = await getStorage("userinfo");
      const userids = userinfo.data.user.dingUserId;

      getRecord({ userids })
        .then((res) => {
          console.log("首页获取当日历史信息", res);
          res.currentTime = this.data.currentTime;
          setStorageSync({
            key: "Record",
            data: res,
          });
          this.setData({
            checkTimes: res.signInHisPage.records[0].quantity,
          });
        })
        .catch((err) => console.error(err));
    }
    this.setData({
      checkTimes: record.data.signInHisPage.records[0].quantity,
    });
  },
});
