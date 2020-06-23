import moment from "moment";
import { companyName, markers } from "/config/api";
import { getConfig } from "/service/config";
import { getLocation } from "/service/location";
import { getTodayCount } from "/service/record";
import { handleError } from "/service/network";
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
    this._getLocation();
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
      return;
    }
    my.navigateTo({
      url:
        "../location-adjust/location-adjust?location=" +
        JSON.stringify(this.data.location),
    });
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
    if (!utils.isEmpty(userInfo.selectOrg) && utils.isEmpty(this.data.client)) {
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
   *获取当日签到次数
   *
   * @author Steven
   * @date 2020-06-23
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
   *获取当前定位信息
   *
   * @author Steven
   * @date 2020-06-23
   */
  async _getLocation() {
    let location, longitude, latitude, address;
    if (!utils.isEmpty(app.globalData.selectedLocation)) {
      const res = app.globalData.selectedLocation;
      location = {};
      longitude = res.longitude;
      latitude = res.latitude;
      address = res.address;
    } else {
      const res = await getLocation().catch((err) => {
        console.error(err);
        handleError(err);
      });
      location = res;
      longitude = utils.round(res.longitude, 6);
      latitude = utils.round(res.latitude, 6);
      address = res.address;
      app.globalData.location = {
        longitude,
        latitude,
        name: address,
        address: address,
      };
    }
    this.setData({
      location,
      longitude,
      latitude,
      address,
      "markers[0].id": 1,
      "markers[0].longitude": longitude,
      "markers[0].latitude": latitude,
    });
  },

  /**
   *获取当前时间
   *
   * @author Steven
   * @date 2020-06-23
   * @returns
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
   *从全局中获取拜访对象
   *
   * @author Steven
   * @date 2020-06-23
   * @returns
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
  /**
   *获取配置信息
   *
   * @author Steven
   * @date 2020-06-23
   * @param {object}} params 配置参数
   * @returns Promise
   */
  _getConfig(params) {
    return getConfig(params)
      .then((res) => {
        // console.log("启用获取配置信息", res);
        app.globalData.limitRange = res.value;
      })
      .catch((err) => console.error(err));
  },
});
