import { getStorage } from "/libs/storage.js";
Page({
  data: {
    checkinTime: "00:00",
    address:
      "宁波市公安局北仑分局交通警察大队大碶中队，浙江省宁波北仑大碶华东宁波医药公司",
    visitsPerson: ""
  },
  onLoad(query) {
    // 页面加载
    console.info(
      `Checkin-submit Page onLoad with query: ${JSON.stringify(query)}`
    );
    console.log(query);
    getStorage({ key: "checkInDate" })
      .then(res => {
        this.setData({
          visitsPerson: query.visitsPerson,
          checkinTime: res.data.date.substr(-5)
        });
      })
      .then(() => {
        getStorage({ key: "location" }).then(res => {
          this.setData({
            address: res.data.address
          });
        });
      });
  },
  useCamera() {
    dd.chooseImage({
      count: 1,
      sourceType: ["camera"],
      success: res => {
        dd.alert({
          title: "选中的图片",
          content: JSON.stringify(res.filePaths)
        });
      }
    });
  }
});
