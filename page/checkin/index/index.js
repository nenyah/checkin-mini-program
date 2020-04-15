import { formatDate } from "/util/utils.js";
import { getLocation } from "/service/location.js";
import { getStorage } from "/service/storage.js";
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
    my.getStorage({
      key: "location",
      success: (res) => {
        if (!res.data) {
          getLocation().then((res) => {
            this.setData({
              longitude: res.longitude,
              latitude: res.latitude,
              address: res.address,
              "markers[0].longitude": res.longitude,
              "markers[0].latitude": res.latitude,
            });
            dd.setStorage({
              key: "location",
              data: {
                longitude: res.longitude,
                latitude: res.latitude,
                address: res.address,
              },
              success: function () {},
            });
          });
        } else {
          this.setData({
            longitude: res.data.longitude,
            latitude: res.data.latitude,
            address: res.data.address,
            "markers[0].longitude": res.data.longitude,
            "markers[0].latitude": res.data.latitude,
          });
        }
      },
      fail: (res) => {},
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
