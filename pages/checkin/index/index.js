import moment from "moment";
import { companyName, markers } from "/config/api";
import { getConfig } from "/service/config";
import { getLocation } from "/service/location";
import { getTodayCount } from "/service/record";
import utils from "/util/utils";
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
    console.log("首页加载");
    // 首页加载 初始化数据
    // 日期 时间 地址 历史签到 签到次数
  },
  onReady() {
    // 使用 dd.createMapContext 获取 map 上下文
    this.mapCtx = dd.createMapContext("map");
    if (dd.canIUse("createMapContext.return.showsCompass")) {
      this.mapCtx.showsCompass({ isShowsCompass: 1 });
    }
  },
  onShow() {
    // 页面显示
    console.log("首页显示");
    // 获取当前时间
    this._getCurrentTime();
    this._getClient();
    this._getLoncation();
    this._checkRecordTimes();
  },
  onHide() {
    console.log("首页隐藏");
  },
  onUnload() {
    console.log("首页卸载");
  },
  onTitleClick() {
    // 标题被点击
    utils.ddToast({ text: `当前版本号为 v${app.globalData.version}` });
  },
  /**
   *跳转到地点微调
   *
   * @author Steven
   * @date 2020-06-22
   */
  async adjustLocation() {
    // console.log("跳转前地址", this.data.location);
    await this._getConfig({ value: "limitRange" });
    if (!this.data.location) {
      utils.ddToast({
        type: "fail",
        text: "请稍等，钉钉定位信息还没有获取成功！",
      });
    } else {
      my.navigateTo({
        url:
          "../location-adjust/location-adjust?location=" +
          JSON.stringify(this.data.location),
      });
    }
  },
  /**
   *跳转到签到提交
   * @description 判断是否需要选择拜访对象
   * @author Steven
   * @date 2020-06-22
   */
  onSubmit() {
    const params = {
      timeStamp: this.data.mx.valueOf(),
      location: this.data.location,
      client: this.data.client,
    };

    const userInfo = app.globalData.userInfo;
    if (utils.isEmpty(userInfo)) {
      utils.ddToast({
        type: "fail",
        text: "请稍等，用户信息还没有获取成功！",
      });
      return;
    }
    // 需要选择
    if (!utils.isEmpty(userInfo.selectOrg)&&utils.isEmpty(this.data.client)) {
      // 没有拜访对象
      utils.ddToast({
        type: "fail",
        text: "还没有选择拜访对象哦！",
      });
      return;
    } 
    // 有拜访对象
    my.navigateTo({
      url: "../checkin-submit/checkin-submit?params=" + JSON.stringify(params),
    });
  },
  /**
   *@author steven
   *获取当日签到次数
   */
  async _checkRecordTimes() {
    const userinfo = app.globalData.userInfo;
    if (utils.isEmpty(userinfo)) {
      await app.checkLogin();
    }
    const checkTimes = await getTodayCount().catch((err) => console.error(err));
    this.setData({
      checkTimes,
    });
  },

  /**
   *@author steven
   *获取当前定位信息
   */
  _getLoncation() {
    if (!utils.isEmpty(app.globalData.selectedLocation)) {
      const res = app.globalData.selectedLocation;
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
          let message = "请求错误";
          if (err.error) {
            // 判断错误码
            switch (err.error) {
              case 11:
                message = "请确认定位相关权限已开启";
                break;
              case 12:
                message = "网络异常，请稍后再试";
                break;
              case 13:
                message = "定位失败，请稍后再试";
                break;
              case 14:
                message = "业务定位超时，请稍后再试";
                break;
              default:
                break;
            }
          }
          my.showToast({
            type: "fail",
            content: message,
          });
        });
    }
  },
  /**
   *@author steven
   *获取当前时间
   */
  _getCurrentTime() {
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
   *从全局中获取拜访对象
   */
  _getClient() {
    const client = app.globalData.selectedClient;
    if (!client) {
      return;
    }
    this.setData({
      client,
    });
  },
  _getConfig(params) {
    getConfig(params)
      .then((res) => {
        // console.log("启用获取配置信息", res);
        app.globalData.limitRange = res.value;
      })
      .catch((err) => console.error(err));
  },
});
