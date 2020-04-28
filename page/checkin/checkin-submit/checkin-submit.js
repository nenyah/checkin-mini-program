import { getStorage } from "../../../service/storage";
import { setRecord, setRecordFile } from "../../../service/record";
import { companyName } from "/config/api";
import moment from "moment";
var app = getApp();
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
    disabled: false,
  },
  onLoad(query) {
    // 页面加载
    console.info(
      `Checkin-submit Page onLoad with query: ${JSON.stringify(query)}`
    );
    console.log(query);
    this._setVisitPerson(query);
    this._getTime();
  },
  onShow() {
    this._getAddress();
  },
  useCamera() {
    my.chooseImage({
      count: 1,
      sourceType: ["camera"],
      success: (res) => {
        console.info("拍照成功", res);
        let picUrls = this.data.picUrls;
        picUrls.push(res.filePaths[0]);
        this.setData({
          picUrls,
        });
      },
    });
  },
  //
  /**
   *@author steven
   *@function 移除图片
   *@param {*} e
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
   *@author steven
   *@function 预览图片
   *
   * @param {*} e
   */
  previewPic(e) {
    console.log(e);
    const src = e.target.dataset.src;
    my.previewImage({
      urls: [src],
    });
  },
  handComfirm(e) {
    console.log("完成输入文字", e.detail.value);
  },

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
    const disabled = this.data.disabled;
    if (disabled) {
      return;
    }
    const imageList = this.data.picUrls;
    // if (imageList.length < 1) {
    //   my.showToast({
    //     type: "fail",
    //     content: "还没有添加照片哦！",
    //   });
    // }
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
    console.log(checkInRecord);
    this.setData({
      disabled: true,
    });
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
        // 签到动画
        this._sucessAnimation();
        setTimeout(() => {
          this.setData({
            picUrls: [],
          });
          my.reLaunch({
            url: "../index/index",
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
   *@function 获取时间
   */
  _getTime() {
    getStorage("checkInDate")
      .then((res) => {
        const checkinTime = moment(res.data.date).format("HH:mm");
        const timeStamp = moment(res.data.date).valueOf();
        this.setData({
          checkinTime,
          timeStamp,
        });
      })
      .catch((err) => console.error(err));
  },
  /**
   *@author steven
   *@function 设置拜访客户
   * @param {*} query
   */
  _setVisitPerson(query) {
    this.setData({
      client: query,
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
      });
    } else {
      this.setData({
        location: app.globalData.location,
      });
    }
  },
  _sucessAnimation() {
    var animation = my.createAnimation({
      duration: 1000,
      timeFunction: "ease-in-out",
    });

    this.animation = animation;

    animation.translate(150, -20).rotate(-45).step();

    this.setData({
      isShow: true,
      animationInfo: animation.export(),
    });
  },
});
