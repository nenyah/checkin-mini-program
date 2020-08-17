/*
 * @Description: 签到历史
 * @Author: Steven
 * @Date: 2020-04-15 15:53:13
 * @LastEditors: Steven
 * @LastEditTime: 2020-08-17 15:07:47
 */
import {markers} from "/config/api"

Page({
  data: {
    today: "2020-04-15",
    checkininfo: [],
    history: false,
    markers: [],
    latitude: 29.903595,
    longitude: 121.796925,
    pageProfile: false,
  },
  onLoad(query) {
    const page = query.page
    let checkininfo =
      page === "stats"
        ? JSON.parse(query.items)
        : JSON.parse(query.items).signInMonthDTOS[0].signInHisVOS
    if (!checkininfo.length) {
      return
    }
    this._parseItem(checkininfo, page)
  },
  onShow() {
    // 页面显示
  },
  onReady() {
    // 页面加载完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  _parseItem(checkininfo, page) {
    // 处理markers
    const mymarkers = checkininfo.map((el, idx) => {
        return {
          ...markers[0],
          id: idx + 1,
          longitude: el.longitude,
          latitude: el.latitude,
        }
      }),
      latitude = checkininfo[0].latitude,
      longitude = checkininfo[0].longitude,
      pageProfile = page !== "stats"
    this.setData({
      checkininfo,
      markers: mymarkers,
      latitude,
      longitude,
      history: true,
      pageProfile,
    })
  },
})
