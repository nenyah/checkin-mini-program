import { watermark } from "/util/watermark.js";
Page({
  data: {
    navH: ""
  },
  onLoad(options) {
    //自定义头部方法
    watermark("canvas", "/assets/images/fake1.jpg");
  }
});
