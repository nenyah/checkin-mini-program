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
    this._getAddress();
    this._getTime();
  },
  onShow() {},
  useCamera() {
    my.chooseImage({
      count: 1,
      sourceType: ["camera"],
      success: (res) => {
        console.info(res);
        // TODO:打水印
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
  createRecord() {
    const disabled = this.data.disabled;
    if (disabled) {
      return;
    }
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
    console.log(checkInRecord);
    this.setData({
      disabled: true,
    });
    setRecordFile({
      filePath: imageList[0],
      formData: { detailPlace: checkInRecord.detailPlace },
    })
      .then((res) => {
        console.log("返回数据", JSON.parse(res));
        checkInRecord.imageUrlList = JSON.parse(res);
        console.log("ready to upload", checkInRecord);

        setRecord(checkInRecord)
          .then((res) => {
            console.log("上传签到信息", res);
            app.globalData.selectedClient = null;
            // 签到动画
            this._sucessAnimation();
            setTimeout(() => {
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
    this.setData({
      location: app.globalData.selectedLocation,
    });
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
