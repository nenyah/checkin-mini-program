import { markers } from "/config/api";
Page({
  data: {
    today: "2020-04-15",
    checkininfo: [],
    history: false,
    markers: [],
    latitude: 29.903595,
    longitude: 121.796925,
    pageProfile: false,
  },
  onLoad(query) {
    const page = query.page;
    if (page == "stats") {
      const checkininfo = JSON.parse(query.items).signInHisPage.records;
      console.log("历史页面", checkininfo);
      if (!checkininfo.length) {
        return;
      }
      this._parseItem(checkininfo);
    } else {
      console.log("历史页面", JSON.parse(query.items).signInMonthDTOS[0]);
      const checkininfo = JSON.parse(query.items).signInMonthDTOS[0]
        .signInHisVOS;

      if (!checkininfo.length) {
        return;
      }
      this.setData({
        pageProfile: true,
      });
      this._parseItem(checkininfo);
    }
  },
  onShow() {
    // 页面显示
  },
  onReady() {
    // 页面加载完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  _parseItem(checkininfo) {
    // 处理markers
    const mymarkers = checkininfo.map((el, idx) => {
      return {
        ...markers[0],
        id: idx + 1,
        longitude: el.longitude,
        latitude: el.latitude,
      };
    });
    const latitude = checkininfo[0].latitude;
    const longitude = checkininfo[0].longitude;
    this.setData({
      checkininfo,
      markers: mymarkers,
      latitude,
      longitude,
      history: true,
    });
  },
});
