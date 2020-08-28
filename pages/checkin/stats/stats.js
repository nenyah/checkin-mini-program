import moment from "moment"
import {getDeptInfo} from "/service/dept"
import {getRecord} from "/service/record"
import utils from "/util/utils"

let app = getApp()
Page({
  data: {
    tabs: [
      {title: "0", subTitle: "最新签到"},
      {title: "0", subTitle: "未签到"},
    ],
    activeTab: 0,
    items: [],
    notSignRecords: [],
    dept: "",
    userNum: 0,
    userIds: [],
    date: "",
    pages: 0,
    current: 0,
    size: 20,
    hasMore: true,
  },
  onLoad() {
    console.log("进入统计页面")
    // 初始化事件监听器
    this.initEventListener()
    // 首次进入显示本部门信息
    this.setData({
      date: moment(app.globalData.currentTime).format("YYYY-MM-DD"),
    })
    const userInfo = app.globalData.userInfo
    if (!utils.isEmpty(userInfo)) {
      console.log("获取到用户信息", app.globalData.userInfo)
      this._getDeptInfo()
      this._getRecords()
    }
  },
  onUnload() {
    console.log("统计页卸载")
    app.emitter.removeListener("freshstat", this.handleEvent, this)
  },
  /**
   * 初始化事件监听器
   */
  initEventListener() {
    app.emitter.on("refresh", this.handleEvent, this)
  },
  /**
   * 事件处理
   */
  handleEvent(event) {
    switch (event.type) {
      case "refresh":
        console.log("触发更新")
        this._getDeptInfo()
        this._getRecords()
        break
      default:
        break
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    console.log("onPullDownRefresh", new Date())
    this.setData({
      items: [],
      current: 0,
    })
    this._getRecords()
  },
  /**
   * 下拉时加载更多
   */
  onLower() {
    console.log("统计页向下")
    const pages = this.data.pages,
      current = this.data.current
    if (current > pages) {
      this.setData({
        hasMore: false,
      })
    }
    this._getRecords()
  },
  /**
   * 点击tab
   * @param e
   */
  onTabClick(e) {
    this.setData({
      activeTab: e.index,
    })
  },
  /**
   * 获取日期
   * @param data
   */
  onGetNewDate(data) {
    console.log("统计页获得日期数据", data)
    this.setData({
      date: data,
      items: [],
      current: 0,
      pages: 0,
    })
    this._getRecords()
  },
  /**
   * 获取用户
   * @param users
   */
  onGetNewUser(users) {
    console.log("统计页获得人员数据", users)
    const userNum = users.length
    const myusers = users.map((el) => {
      return el.userId
    })
    this.setData({
      userIds: myusers,
      userNum,
      items: [],
      current: 0,
      pages: 0,
    })
    this._getRecords()
  },
  /**
   * 跳转历史页面
   */
  onToHistory() {
    console.log("到历史页面")
    if (this.data.items.length > 0) {
      my.navigateTo({
        url:
          "/pages/checkin/checkin-history/checkin-history?page=stats&items=" +
          JSON.stringify(this.data.items),
      })
    } else {
      my.showToast({
        content: "当天没有签到信息或者数据还没有获取完成！",
      })
    }
  },
  /**
   * 获取本部门签到记录
   * @return {Promise<void>}
   * @private
   */
  async _getOwnDeptRecord() {
    const date = this.data.date,
      size = this.data.size,
      hasMore = this.data.hasMore
    let current = this.data.current

    if (hasMore) {
      current += 1
      getRecord({current, size, startDate: date, endDate: date})
        .then((res) => {
          this._renderData(res)
        })
        .catch((err) => {
          console.error(err)
          my.showToast({
            content: "数据获取错误" + JSON.stringify(err.data),
          })
        })
    }
  },
  /**
   * 获取签到记录
   * @return {Promise<void>}
   * @private
   */
  async _getRecord() {
    const date = this.data.date,
      userIds = this.data.userIds,
      size = this.data.size,
      hasMore = this.data.hasMore
    let current = this.data.current
    if (hasMore) {
      current += 1
      getRecord({current, userIds, date, size})
        .then((res) => {
          this._renderData(res)
        })
        .catch((err) => {
          console.error(err)
          my.showToast({
            content: "数据获取错误" + JSON.stringify(err.data),
          })
        })
    }
  },
  /**
   * 获取部门信息
   * @return {Promise<void>}
   * @private
   */
  async _getDeptInfo() {
    const dingUserId = await app.globalData.userInfo.dingUserId
    getDeptInfo({dingUserId})
      .then((res) => {
        this.setData({
          dept: res,
        })
      })
      .catch((err) => {
        console.error(err)
        my.showToast({
          content: "数据获取错误" + JSON.stringify(err.data),
        })
      })
  },
  /**
   * 渲染数据
   * @param res
   * @private
   */
  _renderData(res) {
    let checkinNums, uncheckinNums, pages, current, notSignRecords, items
    checkinNums = res.signInQty
    uncheckinNums = res.notSignInList === null ? 0 : res.notSignInList.length
    pages = Number(res.signInHisPage.pages)
    current = Number(res.signInHisPage.current)
    notSignRecords = res.notSignInList
    items = [...this.data.items, ...res.signInHisPage.records]
    this.setData({
      "tabs[0].title": checkinNums,
      "tabs[1].title": uncheckinNums,
      pages,
      current,
      notSignRecords,
      items,
    })
  },
  /**
   * 获取记录
   * @private
   */
  _getRecords() {
    if (this.data.userNum > 0) {
      this._getRecord()
    } else {
      this._getOwnDeptRecord()
    }
  },
})
