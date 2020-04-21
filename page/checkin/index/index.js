import moment from "moment";

import { getLocation } from "/service/location.js";
import {
  getStorage,
  getStorageSync,
  setStorage,
  setStorageSync,
} from "/service/storage.js";
import { companyName, markers } from "../../../config/api.js";
import _ from "lodash/core";

var app = getApp();

Page({
  data: {
    longitude: "",
    latitude: "",
    address: "",
    markers: markers,
    visitsPerson: "",
    today: "",
    ctime: "",
    company: companyName,
    checkTimes: 0,
  },

  onLoad(query) {
    // 页面加载
    console.info(`首页加载成功: ${JSON.stringify(query)}`);
    // console.log(app.globalData);
    // 获取当前时间
    this._getCurrentTime();
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this._getLoncation();
    this._getClient();
    this._getCheckTimes();
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
  _getCheckTimes() {
    const historyRecord = getStorageSync("historyRecord");
    // FIXME: 不稳定，取length

    
    if (historyRecord.data.length) {
      this.setData({
        checkTimes: historyRecord.data.length,
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
    if (checkInDate) {
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
          visitsPerson: res.data.mainTitle,
        });
      }
    });
  },
});
