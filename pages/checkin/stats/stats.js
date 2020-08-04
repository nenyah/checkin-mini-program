import moment from "moment"
import { getDeptInfo } from "/service/dept"
import { getOwnDeptRecord, getRecord } from "/service/record"
let app = getApp()
Page({
  data: {
    tabs: [
      { title: "0", subTitle: "最新签到" },
      { title: "0", subTitle: "未签到" },
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
    // 首次进入显示本部门信息
    this.setData({
      date: moment(app.globalData.currentTime).format("YYYY-MM-DD"),
    })
    this._getDeptInfo()
    this._getRecords()
  },
  onPullDownRefresh() {
    console.log("onPullDownRefresh", new Date())
    this.setData({
      items: [],
      current: 0,
    })
    this._getRecords()
  },
  onLower() {
    // 下拉时加载更多
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
  onTabClick(e) {
    this.setData({
      activeTab: e.index,
    })
  },
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
  async _getOwnDeptRecord() {
    const date = this.data.date,
      size = this.data.size,
      hasMore = this.data.hasMore
    let current = this.data.current

    if (hasMore) {
      current += 1
      getOwnDeptRecord({ current, date, size })
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
  async _getRecord() {
    const date = this.data.date,
      userIds = this.data.userIds,
      size = this.data.size,
      hasMore = this.data.hasMore
    let current = this.data.current
    if (hasMore) {
      current += 1
      getRecord({ current, userIds, date, size })
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
  async _getDeptInfo() {
    const dingUserId = await app.globalData.userInfo.dingUserId
    getDeptInfo({ dingUserId })
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
  _renderData(res) {
    const checkinNums = res.signInQty,
      uncheckinNums = res.notSignInList === null ? 0 : res.notSignInList.length,
      pages = Number(res.signInHisPage.pages),
      current = Number(res.signInHisPage.current),
      notSignRecords = res.notSignInList,
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
  _getRecords() {
    if (this.data.userNum > 0) {
      this._getRecord()
    } else {
      this._getOwnDeptRecord()
    }
  },
})
