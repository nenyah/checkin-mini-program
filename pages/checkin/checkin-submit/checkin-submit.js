import moment from "moment";
import { companyName } from "/config/api";
import { setRecord, setRecordFile } from "/service/record";
import util from "/util/utils";
let app = getApp();

Page({
  data: {
    checkinTime: "00:00",
    timeStamp: "",
    location: "",
    client: "",
    picUrls: [],
    companyName: companyName,
    animationInfo: {},
    remark: "",
    isShow: false,
    disabled: true,
    imageSize: "",
  },
  onLoad(query) {
    // 页面加载

    let data = JSON.parse(query.params);
    console.log(JSON.parse(query.params));
    data.location.name = data.location.address;
    if (!util.isEmpty(app.globalData.selectedLocation)) {
      data.location = app.globalData.selectedLocation;
    }
    this.setData({
      ...data,
      checkinTime: moment(data.timeStamp).format("HH:mm"),
      disabled: false,
      picUrls: [],
    });
  },

  /**
   *拍照
   *
   * @author Steven
   * @date 2020-06-24
   */
  useCamera() {
    my.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["camera"],
      success: (res) => {
        console.info("拍照成功", res);
        this.setData({
          disabled: true,
        });
        my.compressImage({
          filePaths: res.filePaths,
          compressLevel: 1,
          success: (res) => {
            console.log(JSON.stringify(res));
            let picUrls = this.data.picUrls;
            picUrls.push(res.filePaths[0]);
            this.setData({
              picUrls,
              disabled: false,
            });
          },
        });

        // this._getCanvasImg(0, 0, res.filePaths); //进行压缩
      },
    });
  },
  async _getCanvasImg(index, failNum, tempFilePaths) {
    my.getImageInfo({
      src: tempFilePaths[0],
      success: (res) => {
        console.log("获取图片信息", res);
        if (index < tempFilePaths.length) {
          util
            .imageUtil(res)
            .then((res) => {
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
              index = index + 1; //压缩成功的数量，压缩成功则加1
              ctx.draw();
              setTimeout(() => {
                ctx.toTempFilePath({
                  x: 0,
                  y: 0,
                  width: res.imageWidth,
                  height: res.imageHeight,
                  quality: 1,
                  success: (res) => {
                    console.log("temp file path", res);
                    let picUrls = this.data.picUrls;
                    picUrls.push(res.filePath);
                    this.setData({
                      picUrls,
                      disabled: false,
                    });
                  },
                });
              }, 1000);
              this.setData({
                imageSize: res,
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },

  /**
   *
   *移除图片
   * @author Steven
   * @date 2020-06-24
   * @param {object} e 选项参数
   */
  removePic(e) {
    const index = e.target.dataset.index;
    let picUrls = this.data.picUrls;
    picUrls.splice(index, 1);

    this.setData({
      picUrls,
    });
  },

  /**
   *预览图片
   *
   * @author Steven
   * @date 2020-06-24
   * @param {object} e 选项参数
   */
  previewPic(e) {
    const src = e.target.dataset.src;
    my.previewImage({
      urls: [src],
    });
  },

  /**
   *
   *完成文字输入
   * @author Steven
   * @date 2020-06-24
   * @param {object} e 选项参数
   */
  handComfirm(e) {
    console.log("签到提交:完成输入文字", e.detail.value);
  },

  /**
   *获取文字输入
   *
   * @author Steven
   * @date 2020-06-24
   * @param {object} e 选项参数
   */
  handleTextAreaInput(e) {
    console.log("输入文字", e.detail.value);
    this.setData({
      remark: e.detail.value,
    });
  },

  /**
   *提交签到信息
   *
   * @author Steven
   * @date 2020-06-24
   */
  async createRecord() {
    this.setData({
      disabled: true,
    });

    const imageList = this.data.picUrls;

    let checkInRecord = {
      detailPlace: this.data.location.address,
      latitude: this.data.location.latitude,
      longitude: this.data.location.longitude,
      org: {
        id: Number(this.data.client.id),
        name: this.data.client.name,
      },
      place: this.data.location.name,
      remark: this.data.remark,
      timeStamp: this.data.timeStamp,
    };
    // 上传图片
    const upload = imageList.map((img) => {
      return setRecordFile({
        filePath: img,
        formData: {
          detailPlace: checkInRecord.detailPlace,
        },
      });
    });
    try {
      // 上传图片
      const res = await Promise.all(upload);
      console.log("结果", res);

      checkInRecord.imageUrlList = res;
      // 上传签到信息
      await setRecord(checkInRecord);
      // 清空数据
      app.globalData.selectedClient = {};
      app.globalData.selectedLocation = {};
      // 签到动画
      this._sucessAnimation();
      // 更新时间
      app.globalData.currentTime = moment().format();
      app.emitter.emit("refresh", { type: "refresh" });
      setTimeout(() => {
        my.switchTab({
          url: "/pages/checkin/index/index",
        });
      }, 1000);
    } catch (error) {
      util.ddToast({
        type: "fail",
        text:
          "数据上传错误，请截图联系管理员" +
          JSON.stringify(checkInRecord) +
          JSON.stringify(error.data),
      });
      this.setData({
        disabled: false,
      });
    }
  },

  /**
   *获取地址
   *
   * @author Steven
   * @date 2020-06-24
   */
  _getAddress() {
    console.log("签到提交:获取地址", app.globalData.selectedLocation);

    if (app.globalData.selectedLocation) {
      this.setData({
        location: app.globalData.selectedLocation,
        disabled: false,
      });
    } else {
      this.setData({
        location: app.globalData.location,
        disabled: false,
      });
    }
  },
  /**
   *签到成功动画
   *
   * @author Steven
   * @date 2020-06-24
   */
  _sucessAnimation() {
    let animation = my.createAnimation({
      duration: 1000,
      timeFunction: "ease-in-out",
    });

    this.animation = animation;

    animation.translate(150, -15).rotate(-45).step();

    this.setData({
      isShow: true,
      animationInfo: animation.export(),
    });
  },
});
