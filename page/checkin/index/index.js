import moment from "moment";
import { getUserInfo } from "/service/login";
import { getRecord, getTodayCount } from "/service/record";
import { getLocation } from "/service/location";
import utils from "/util/utils";
import { companyName, markers } from "/config/api";
import { getConfig } from "../../../service/config";
let app = getApp();

Page({
  data: {
    longitude: "",
    latitude: "",
    address: "",
    markers: markers,
    client: "",
    today: "",
    ctime: "",
    company: companyName,
    checkTimes: 0,
  },

  onLoad() {
    // 首页加载 初始化数据
    // 日期 时间 地址 历史签到 签到次数
  },
  onShow() {
    // 页面显示
    console.log("首页显示");
    // 获取当前时间
    this._getCurrentTime();
    this._getUserInfo();
    this._getClient();
    this._getLoncation();
  },
  onUnload() {
    console.log("index unload");
  },
  onReady(e) {},
  onHide() {
    console.log("首页隐藏");
  },
  adjustLocation() {
    console.log("跳转前地址", this.data.location);
    if (!this.data.location) {
      my.showToast({
        type: "fail",
        content: "请稍等，钉钉定位信息还没有获取成功！",
        duration: 2000,
      });
    } else {
      my.navigateTo({
        url:
          "../location-adjust/location-adjust?location=" +
          JSON.stringify(this.data.location),
      });
    }
  },
  onSubmit() {
    console.log("点击提交");
    const params = {
      timeStamp: this.data.mx.valueOf(),
      location: this.data.location,
      client: this.data.client,
    };
    if (this.data.userInfo === null) {
      my.showToast({
        type: "fail",
        content: "请稍等，用户信息还没有获取成功！",
        duration: 2000,
      });
    } else {
      // 已经有用户信息了
      if (!this.data.userInfo.user.selectOrg) {
        // 判断是否需要选择拜访对象
        // 不用选择
        my.navigateTo({
          url:
            "../checkin-submit/checkin-submit?params=" + JSON.stringify(params),
        });
      } else {
        // 需要选择
        if (!this.data.client) {
          // 没有拜访对象
          my.showToast({
            type: "fail",
            content: "还没有选择拜访对象哦！",
            duration: 2000,
          });
        } else {
          // 有拜访对象
          my.navigateTo({
            url:
              "../checkin-submit/checkin-submit?params=" +
              JSON.stringify(params),
          });
        }
      }
    }
  },
  /**
   *@author steven
   *@function 获取当日签到次数
   */
  async _checkRecordTimes() {
    const checkTimes = await getTodayCount();
    console.log("首页：获取当日签到次数", checkTimes);
    this.setData({
      checkTimes,
    });
  },

  /**
   *@author steven
   *@function 获取当前定位信息
   */
  async _getLoncation() {
    if (app.globalData.selectedLocation) {
      const res = app.globalData.selectedLocation;
      console.log("首页：从全局获得选择地址");
      console.info(res);
      this.setData({
        longitude: res.longitude,
        latitude: res.latitude,
        address: res.address,
        "markers[0].id": 1,
        "markers[0].longitude": res.longitude,
        "markers[0].latitude": res.latitude,
      });
    } else {
      getLocation()
        .then((res) => {
          console.log("首页：获取地址成功");
          console.info(res);
          const longitude = utils.round(res.longitude, 6),
            latitude = utils.round(res.latitude, 6);
          app.globalData.location = {
            longitude,
            latitude,
            name: res.address,
            address: res.address,
          };
          this.setData({
            location: res,
            longitude,
            latitude,
            address: res.address,
            "markers[0].id": 1,
            "markers[0].longitude": longitude,
            "markers[0].latitude": latitude,
          });
        })
        .catch((err) => {
          console.error(err);
          if (err.error === 4) {
            my.showToast({
              type: "fail",
              content: "还没有打开定位哦！",
            });
          } else if (err.error === 12) {
            my.showToast({
              type: "fail",
              content: "网络异常，请检查网络！",
            });
          }
        });
    }
  },
  /**
   *@author steven
   *@function 获取当前时间
   */
  async _getCurrentTime() {
    const checkInDate = app.globalData.currentTime;
    if (!checkInDate) {
      return;
    }
    const mx = moment(checkInDate);
    const today = mx.format("YYYY年MM月DD日");
    const ctime = mx.format("HH:mm");
    this.setData({
      today,
      ctime,
      mx,
    });
  },
  /**
   *@author steven
   *@function 从全局中获取拜访对象
   */
  async _getClient() {
    const client = app.globalData.selectedClient;
    if (client) {
      console.log("首页：从全局获得选择对象");
      console.info(client);
      this.setData({
        client,
      });
    }
  },
  /**
   *获取用户信息
   *
   */
  async _getUserInfo() {
    console.log("首页：没有用户信息，执行获取用户");
    getUserInfo()
      .then((res) => {
        console.log("首页：获得用户信息");
        console.info(res);
        app.globalData.userInfo = res;
        this.setData({
          userInfo: res,
        });
        this._checkRecordTimes();
        this._getConfig({ value: "limitRange" });
      })
      .catch((err) => console.error("首页：获取用户信息报错", err));
  },
  _getConfig(params) {
    getConfig(params)
      .then((res) => {
        console.log("启用获取配置信息", res);
        app.globalData.limitRange = res.value;
      })
      .catch((err) => console.error(err));
  },
});
