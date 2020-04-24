import { watermark } from "/util/watermark";
import { getUserInfo } from "/service/login";
import { getRecord } from "/service/record";
import {
  getStorage,
  getStorageSync,
  setStorage,
  setStorageSync,
} from "/service/storage";
Page({
  data: {},
  async onLoad(options) {
    await this._getUserInfo();
    await this._getRecord();
  },
  async test() {
    console.log("测试async");
  },
  /**
   *获取用户信息
   *
   */
  async _getUserInfo() {
    getUserInfo()
      .then((res) => {
        console.log("用户信息", res);
        setStorageSync({
          key: "userinfo",
          data: res,
        });
      })
      .catch((err) => console.error("获取用户信息报错", err));
  },
  /**
   * 获取历史信息
   *
   */
  async _getRecord() {
    const userids = getStorageSync("userinfo").data.user.dingUserId;
    getRecord({ userids })
      .then((res) => {
        console.log("首页获取当日历史信息", res);
        setStorageSync({
          key: "Record",
          data: res,
        });
        this.setData({
          checkTimes: res.records.length,
        });
      })
      .catch((err) => console.error(err));
  },
});
