/*
 * @Description: 测试
 * @Author: Steven
 * @Date: 2020-04-30 16:40:02
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-04 09:58:14
 */
import {login} from "/service/login"
import {getClients} from "/service/clients"


Page({
  data: {
    imageSize: "",
  },
  async onLoad() {
    // await this._step1(3000)
    // await this._step2(2000)
    // await this._step3(1000)
    await login()
    // const {data: [{userSignCount: checkTimes}], ...rest} = await getRecord({}).catch((err) => console.error(err))
    // console.log("获取内容", checkTimes)
    getClients({current: 2}).then(res => {
      console.log("获取内容", res)
    })
  },
  async _step1(n) {
    console.log(`step1 with ${n} --> Time ${new Date().toLocaleTimeString()}`)
    return this.takeLongTime(n)
  },
  async _step2(n) {
    console.log(`step2 with ${n} --> Time ${new Date().toLocaleTimeString()}`)
    return this.takeLongTime(n)
  },
  async _step3(n) {
    console.log(`step3 with ${n} --> Time ${new Date().toLocaleTimeString()}`)
    return this.takeLongTime(n)
  },
  takeLongTime(n) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(n + 200), n)
    })
  },
})
