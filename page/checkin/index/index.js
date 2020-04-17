import { formatDate } from "/util/utils.js";
import { getLocation } from "/service/location.js";
import { getStorage, setStorageSync } from "/service/storage.js";

var app = getApp();

Page({
  data: {
    longitude: "",
    latitude: "",
    address: "",
    markers: [
      {
        iconPath: "/assets/images/location.png",
        id: 10,
        latitude: "",
        longitude: "",
        width: 26,
        height: 26,
      },
    ],
    visitsPerson: "",
    today: "",
    ctime: "",
    company: "华东宁波医药有限公司",
    checkTimes: 0,
  },

  onLoad(query) {
    // 页面加载
    console.info(`首页加载成功: ${JSON.stringify(query)}`);
    // console.log(app.globalData);

    this._getCurrentTime();
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this._getLoncation();
    this._getClient();
  },
  adjustLocation() {
    my.navigateTo({
      url: "../location-adjust/location-adjust",
    });
  },

  _getLoncation() {
    getStorage("location").then((res) => {
      console.log("1. 首页获取地址缓存", res);
      if (!res.data) {
        // 没有缓存就重新定位获取地址信息
        getLocation().then((res) => {
          console.log("2. 首页获取地址", res);
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            address: res.address,
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
  _getCurrentTime() {
    my.getStorage({
      key: "checkInDate",
      success: (result) => {
        const checkTime = new Date(result.data.date);
        const today = formatDate(checkTime, "YY年MM月DD日");
        const ctime = formatDate(checkTime, "hh:mm");
        this.setData({
          today,
          ctime,
        });
      },
    });
  },
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
