import util from "/util/utils";
import { setRecordFile } from "/service/record";
Page({
  data: {
    imageSize: ""
  },
  // 点击加_压缩
  takePhoto() {
    // let imgViewList = that.data.imgViewList; //这个是用来承载页面循环展示图片的
    //拍照、从相册选择上传
    my.chooseImage({
      count: 1, //这个是上传的最大数量，默认为9
      sizeType: ["compressed"], //这个可以理解为上传的图片质量类型（官方给的），虽然没什么卵用，要不然还要我们自己写压缩做什么
      sourceType: ["camera"], //这个是图片来源，相册或者相机
      success: res => {
        console.log("choose img", res);

        var tempFilePaths = res.filePaths; //这个是选择后返回的图片列表
        this.getCanvasImg(0, 0, tempFilePaths); //进行压缩
      }
    });
  },
  //压缩并获取图片，这里用了递归的方法来解决canvas的draw方法延时的问题
  async getCanvasImg(index, failNum, tempFilePaths) {
    my.getImageInfo({
      // src: tempFilePaths[index],// 用于多个图片压缩
      src: tempFilePaths[0], //图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径,
      success: res => {
        console.log("获取手机信息", res);
        // util.imageUtil  用语计算长宽比

        if (index < tempFilePaths.length) {
          util
            .imageUtil(res)
            .then(res => {
              console.log("返回尺寸", res);
              const ctx = my.createCanvasContext("canvas");

              console.log("图片路径", tempFilePaths[index]);

              ctx.drawImage(
                tempFilePaths[index],
                0,
                0,
                res.imageWidth,
                res.imageHeight
              );
              // // 打水印
              // ctx.setFillStyle("white"); //设置填充色为白色
              // ctx.setStrokeStyle("white"); // 设置边线为白色
              // ctx.setLineWidth(2); // 设置线宽
              // ctx.setTextBaseline("top"); // 设置文字基线

              // // 头部竖线
              // ctx.moveTo(20, 20);
              // ctx.lineTo(20, 66);
              // ctx.stroke();
              // // 头部时间 设置大小
              // ctx.setFontSize(26);
              // ctx.fillText("14:39", 30, 20);
              // // 头部日期 设置大小
              // ctx.setFontSize(16);
              // ctx.fillText("2020.04.30 星期四", 30, 50);
              // ctx.setTextAlign("right");
              // // 底部姓名
              // ctx.fillText("张三", res.imageWidth - 20, res.imageHeight - 50);
              // // 底部地址
              // ctx.fillText(
              //   "宁波市公安局北仑分局交通警察大队大碶中队*宁波",
              //   res.imageWidth - 20,
              //   res.imageHeight - 30
              // );
              index = index + 1; //上传成功的数量，上传成功则加1
              ctx.draw();

              setTimeout(() => {
                ctx.toTempFilePath({
                  x: 0,
                  y: 0,
                  width: res.imageWidth,
                  height: res.imageHeight,
                  quality: 1,
                  success: res => {
                    console.log("temp file path", res);
                    my.previewImage({
                      urls: [res.filePath],
                      success: res => {
                        console.log("预览成功", res);
                      },
                      fail: err => {
                        console.log("预览失败", err);
                      }
                    });
                    setRecordFile(res)
                      .then(res => {
                        console.log("上传成功", res);
                      })
                      .catch(err => console.error(err));
                  }
                });
              }, 1000);

              this.setData({
                imageSize: res
              });
            })
            .catch(err => {
              console.error(err);
            });
        }
      },
      fail: () => {},
      complete: () => {}
    });
  }, //上传图片
  uploadCanvasImg(canvasImg) {
    var tempImg = canvasImg;
    my.uploadFile({
      url: uploadhttpurl, // 仅为示例，非真实的接口地址
      filePath: tempImg,
      name: "file",
      success: res => {
        this.setData({
          userAvatar: res.data.result
        });
      }
    });
  },

  test() {
    my.chooseImage({
      count: 2,
      success: res => {
        console.log("选中的图片", res);

        my.alert({
          title: "选中的图片",
          content: JSON.stringify(res.filePaths)
        });
        my.getImageInfo({
          src: res.filePaths[0],
          success: res => {
            console.log(JSON.stringify(res));
          }
        });
      }
    });
  }
});
