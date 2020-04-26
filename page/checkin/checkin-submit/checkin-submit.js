import { getStorage } from "../../../service/storage";
import { setRecord } from "../../../service/record";
import { companyName } from "/config/api";
import moment from "moment";
Page({
  data: {
    checkinTime: "00:00",
    timeStamp: "",
    location: "",
    client: "",
    picUrls: [],
    companyName: companyName,
    animationInfo: {},
    isShow: false,
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
        // my.getImageInfo({
        //   src: res.filePaths[0],
        //   success: res => {
        //     console.log(JSON.stringify(res));
        //   }
        // });
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

  /**
   *@author steven
   *@function 创建签到信息
   */
  createRecord() {
    let checkInRecord = {
      detailPlace: this.data.location.address,
      imageList: [
        "https://static.dingtalk.com/media/lADPGoGu6xXnOdfNBQDNAuY_742_1280.jpg",
      ],
      latitude: `${this.data.location.latitude}`,
      longitude: `${this.data.location.longitude}`,
      org: {
        id: this.data.client.id,
        name: this.data.client.name,
      },
      place: this.data.location.name,
      remark: "",
      timeStamp: this.data.timeStamp,
    };
    console.log(checkInRecord);

    setRecord(checkInRecord)
      .then((res) => {
        console.log("上传签到信息", res);
        // 签到动画
        this._sucessAnimation();
        setTimeout(() => {
          my.reLaunch({
            url: "../index/index",
          });
        }, 1000);
      })
      .catch((err) => console.error(err));
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
    getStorage("location")
      .then((res) => {
        this.setData({
          location: res.data,
        });
      })
      .catch((err) => console.error(err));
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
