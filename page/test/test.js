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
    await this.test();
  },
  async test() {
    getRecord({ userIds: ['NB1685','NB0571'] })
      .then((res) => {
        console.log("获取选择人员签到信息", res);
      })
      .catch((err) => console.error(err));
  },
});
