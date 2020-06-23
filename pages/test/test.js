/*
 * @Description:
 * @Author: Steven
 * @Date: 2020-04-30 16:40:02
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-23 17:15:20
 */

Page({
  data: {
    imageSize: "",
  },
  async onLoad() {
    await this._step1(3000);
    await this._step2(2000);
    await this._step3(1000);
  },
  async _step1(n) {
    console.log(`step1 with ${n} --> Time ${new Date().toLocaleTimeString()}`);
    return this.takeLongTime(n);
  },
  async _step2(n) {
    console.log(`step2 with ${n} --> Time ${new Date().toLocaleTimeString()}`);
    return this.takeLongTime(n);
  },
  async _step3(n) {
    console.log(`step3 with ${n} --> Time ${new Date().toLocaleTimeString()}`);
    return this.takeLongTime(n);
  },
  takeLongTime(n) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(n + 200), n);
    });
  },
});
