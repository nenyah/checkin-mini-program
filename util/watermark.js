function watermark(canvasid, src, msg = "水印") {
  let ctx = my.createCanvasContext(canvasid);
  my.getImageInfo({
    src: src,
    success: res => {
      console.log(JSON.stringify(res));
      let width = res.width;
      let height = res.height;
      //获取屏幕宽度
      let screenWidth = my.getSystemInfoSync().windowWidth;
      //处理一下图片的宽高的比例
      if (width >= height) {
        if (width > screenWidth) {
          width = screenWidth;
        }
        height = (height / res.width) * width;
      } else {
        if (width > screenWidth) {
          width = screenWidth;
        }
        if (height > 400) {
          height = 400;
          width = (res.width / res.height) * height;
        } else {
          height = (height / res.width) * width;
        }
      }
      console.log("宽高", width, height);
      // 画照片
      ctx.drawImage(res.path, 0, 0, width, height);
      // 画竖线
      ctx.setStrokeStyle("white");
      ctx.moveTo(10, 10);
      ctx.lineTo(10, 40);
      ctx.stroke();
      // 画文字
      ctx.setFillStyle("white");
      ctx.setFontSize(12);
      ctx.fillText("22:42", 20, 22);
      ctx.fillText("2020.04.13 星期一", 20, 40);

      ctx.draw();
    }
  });
}

module.exports = {
  watermark
};
