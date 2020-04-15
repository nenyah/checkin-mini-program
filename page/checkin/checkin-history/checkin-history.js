Page({
  data: {
    today: "2020-04-15",
    checkininfo: [
      {
        user: "张三",
        latitude: 29.904152,
        longitude: 121.795956,
      },
      {
        user: "李四",
        avarta: "/assets/images/pan_avatar.jpg",
        latitude: 29.903595,
        longitude: 121.79692,
      },
    ],
    history: false,
    markers: [],
    latitude: 29.903595,
    longitude: 121.796925,
  },
  onLoad(query) {
    // 页面加载时获取历史数据
    const date = query.date || new Date();
    this._getHistory(date);
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
  _getHistory(date) {
    // TODO: 从服务器中下载还是从缓存中获取
    console.log("历史记录", date);
    let checkininfo = this.data.checkininfo;
    const markers = checkininfo.map((el, idx) => {
      console.log(el, idx);
      return {
        iconPath: "/assets/images/location.png",
        id: idx + 1,
        latitude: el.latitude,
        longitude: el.longitude,
        width: 38,
        height: 38,
      };
    });
    const latitude = checkininfo[0].latitude;
    const longitude = checkininfo[0].longitude;
    this.setData({
      latitude,
      longitude,
      history: false,
      markers,
    });
  },
});
