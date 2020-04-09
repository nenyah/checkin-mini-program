Page({
  data: {},
  onLoad() {},
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
