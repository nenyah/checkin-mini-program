import moment from "moment"
import {getDeptInfo, getDeptUserInfo} from "/service/dept"
import {getRecord} from "/service/record"
import utils from "/util/utils"
import array from "lodash/array"
import lang from "lodash/lang"


let app = getApp()
Page({
  data: {
    tabs: [
      {title: "0", subTitle: "最新签到"},
      {title: "0", subTitle: "未签到"},
    ],
    activeTab: 0, // 默认显示第一项tab
    items: [],
    notSignRecords: [],
    dept: "",
    userNum: 0,
    userIds: [],
    selectedUserIds: [],
    date: "",
    pages: 0,
    current: 0,
    size: 20,
    currentNum: 0,
    hasMore: true,
  },
  onLoad() {
    console.log("进入统计页面")
    // 初始化事件监听器
    this.initEventListener()
    // 设置显示日期
    this.setData({
      date: moment(app.globalData.currentTime).format("YYYY-MM-DD"),
    })

  },
  onShow() {
    const userInfo = app.globalData.userInfo
    if (!utils.isEmpty(userInfo)) {
      console.log("获取到用户信息", app.globalData.userInfo)
      this._getDeptInfo()
      this._getRecord()
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
        this._getRecord()
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
    this._getRecord()
  },
  /**
   * 下拉时加载更多
   */
  onLower() {
    console.log("统计页向下")
    const size = this.data.size, currentNum = this.data.currentNum
    if (size > currentNum) {
      this.setData({
        hasMore: false,
      })
      return
    }
    this._getRecord()
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
    this._getRecord()
  },
  /**
   * 获取用户
   * @param users
   */
  onGetNewUser(users) {
    console.log("统计页获得人员数据", users)
    const userNum = users.length
    const selectedUserIds = users.map((el) => {
      return el.userId
    })
    this.setData({
      selectedUserIds,
      userNum,
      items: [],
      current: 0,
      pages: 0,
    })
    this._getRecord()
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
  async _getRecord() {
    const date = this.data.date,
      size = this.data.size,
      hasMore = this.data.hasMore
    let current = this.data.current
    let userInfo = await this._getDeptUserInfo()
    let userIds = this.data.userNum > 0 ? this.data.selectedUserIds : userInfo.map(el => el.id)
    if (hasMore) {
      current += 1
      getRecord({current, size, userIds, startDate: date, endDate: date})
        .then((res) => {
          console.log("获取信息", res)
          if (!utils.isEmpty(res.data)) {
            this._renderData(res, userInfo)
          }
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
    /**
     * 1. 判断是否有选择过部门或人员
     * 2. 如果选择过部门或人员直接显示部门或人员信息
     * 3. 没有选择过部门或人员就根据
     */
    getDeptInfo({})
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
  _renderData(res, userInfo) {
    let checkinNums, uncheckinNums, pages, current, notSignRecords = [], items
    checkinNums = res.data.length
    uncheckinNums = userInfo.length - res.data.length
    current = res.current
    let userInfoSet = userInfo.map(({code, name}) => {
        return {code, name}
      }
    )
    let userSignInfoSet = res.data.map(el => {
      return {code: el.jobNumber, name: el.userName}
    })
    notSignRecords = array.differenceWith(userInfoSet, userSignInfoSet, lang.isEqual)
    let newItems = res.data.map(el => {
      if (el.userSignVOList.length > 0) {
        el.userSignVOList[0].quantity = el.userSignCount
        // el.userSignVOList[0].jobNumber = el.jobNumber
        return el.userSignVOList[0]
      }
    })
    items = [...this.data.items, ...newItems]
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
   * 获取本部门用户信息
   * @return {Promise<unknown>}
   * @private
   */
  async _getDeptUserInfo() {
    return getDeptUserInfo({})
      .catch(err => {
        console.error(err)
        my.showToast({
          content: "数据获取错误" + JSON.stringify(err.data),
        })
      })
  }
})
