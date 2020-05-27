import { getStorage } from "../../../service/storage";
import { setRecord, setRecordFile } from "../../../service/record";
import { companyName, compressLevel } from "/config/api";
import util from "/util/utils";
import moment from "moment";
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
    console.info(
      `Checkin-submit Page onLoad with query: ${JSON.stringify(query)}`
    );
    let data = JSON.parse(query.params);
    console.log(JSON.parse(query.params));
    data.location.name = data.location.address;
    if (app.globalData.selectedLocation) {
      data.location = app.globalData.selectedLocation;
    }
    this.setData({
      ...data,
      checkinTime: moment(data.timeStamp).format("HH:mm"),
      disabled: false,
    });

    // 清除信息
    this.setData({
      picUrls: [],
    });
  },
  onShow() {
    // this._getAddress();
  },
  onHide() {},
  /**
   *@function 拍照
   *@author steven
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
        dd.compressImage({
          filePaths: res.filePaths,
          compressLevel: 0,
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
  //
  /**
   *@author steven
   *@function 移除图片
   *@param {*} e
   */
  removePic(e) {
    console.log("签到提交:移除图片", e);
    const index = e.target.dataset.index;
    let picUrls = this.data.picUrls;
    picUrls.splice(index, 1);

    this.setData({
      picUrls,
    });
  },

  /**
   *@author steven
   *@function 预览图片
   *
   * @param {*} e
   */
  previewPic(e) {
    console.log("签到提交:预览图片", e);
    const src = e.target.dataset.src;
    my.previewImage({
      urls: [src],
    });
  },
  /**
   *@function 完成文字输入
   *@author steven
   * @param {*} e
   */
  handComfirm(e) {
    console.log("签到提交:完成输入文字", e.detail.value);
  },

  /**
   *@function 获取文字输入
   *@author steven
   * @param {*} e
   */
  handleTextAreaInput(e) {
    console.log("输入文字", e.detail.value);
    this.setData({
      remark: e.detail.value,
    });
  },
  /**
   *@author steven
   *@function 创建签到信息
   */
  async createRecord() {
    this.setData({
      disabled: true,
    });
    // const disabled = this.data.disabled;
    // if (disabled) {
    //   return;
    // }
    console.log(checkInRecord);

    const imageList = this.data.picUrls;

    let checkInRecord = {
      detailPlace: this.data.location.address,
      latitude: `${this.data.location.latitude}`,
      longitude: `${this.data.location.longitude}`,
      org: {
        id: Number(this.data.client.id),
        name: this.data.client.name,
      },
      place: this.data.location.name,
      remark: this.data.remark,
      timeStamp: this.data.timeStamp,
    };

    let response = [];
    for (let i in imageList) {
      console.log(`第${Number(i) + 1}张照片：`, imageList[i]);
      let res = await setRecordFile({
        filePath: imageList[i],
        formData: { detailPlace: checkInRecord.detailPlace },
      });
      response.push(res);
    }
    console.log("提交页:照片提交成功返回数据", response);

    checkInRecord.imageUrlList = response;
    console.log("ready to upload", checkInRecord);

    setRecord(checkInRecord)
      .then((res) => {
        console.log("提交页:上传签到信息", res);
        app.globalData.selectedClient = null;
        app.globalData.selectedLocation = null;
        // 签到动画
        this._sucessAnimation();
        app.globalData.currentTime = moment().format();

        setTimeout(() => {
          dd.reLaunch({
            url: "/page/checkin/index/index",
          });
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        this.setData({
          disabled: false,
        });
      });
  },

  /**
   *@author steven
   *@function 获取地址
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
