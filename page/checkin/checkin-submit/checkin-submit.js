Page({
  data: {
    visitsPerson:"",
  },
  onLoad(query) {
// 页面加载
    console.info(`Checkin-submit Page onLoad with query: ${JSON.stringify(query)}`);
    console.log(query)
    this.setData({
      visitsPerson:query.visitsPerson
    })
  },
  useCamera() {
    dd.chooseImage({
      count: 1,
      sourceType:['camera'],
      success: res => {
        dd.alert({
          title: "选中的图片",
          content: JSON.stringify(res.filePaths)
        });
      }
    });
  }
});
