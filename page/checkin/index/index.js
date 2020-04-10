import { formatDate } from "/util/utils.js";
import { getLocation } from "/libs/location.js";
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
        height: 26
      }
    ],
    visitsPerson: "",
    today: "",
    ctime: "",
    company: "华东宁波医药有限公司"
  },

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    const date = new Date();
    const today = formatDate(date, "YY年MM月DD日");
    const ctime = formatDate(date, "hh:mm");
    this.setData({
      today,
      ctime
    });
    dd.setStorage({
      key: "checkInDate",
      data: {
        date: formatDate(date, "YY-MM-DD hh:mm")
      },
      success: function() {
        console.log({ content: "写入成功" });
      }
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this._getLoncation();
  },
  getValue(e) {
    console.log("index page", e);
    const visitsPerson = e;
    this.setData({
      visitsPerson
    });
  },
  adjustLocation() {
    my.navigateTo({
      url: '../location-adjust/location-adjust'
    });
  },
  _getLoncation() {
    getLocation().then(res => {
      console.log("in promise", res);
      this.setData({
        longitude: res.longitude,
        latitude: res.latitude,
        address: res.address,
        "markers[0].longitude": res.longitude,
        "markers[0].latitude": res.latitude
      });
      dd.setStorage({
        key: "location",
        data: res,
        success: function() {
          console.log("写入成功");
        }
      });
    });
  }
});
