import { getRecord, getOwnDeptRecord } from "/service/record";
import { getStorageSync } from "/service/storage";
import { getDeptInfo } from "/service/dept";
import moment from "moment";
var app = getApp();
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
    });
    this._getDeptInfo();
    this._getOwnDeptRecord({ current: 1, size: 50 });
  },
  onLower() {
    // 下拉时加载更多
    console.log("统计页向下");
    const pages = this.data.pages,
      current = this.data.current;
    if (current > pages) {
      this.setData({
        hasMore: false,
      });
    }
    this._getRecords();
  },
  onTabClick(e) {
    this.setData({
      activeTab: e.index,
    });
  },
  onGetNewDate(data) {
    console.log("统计页获得日期数据", data);
    this.setData({
      date: data,
      items: [],
      current: 0,
      pages: 0,
    });
    this._getRecords();
  },
  onGetNewUser(users) {
    console.log("统计页获得人员数据", users);
    const userNum = users.length;
    const myusers = users.map((el) => {
      return el.userId;
    });
    this.setData({
      userIds: myusers,
      userNum,
      items: [],
      current: 0,
      pages: 0,
    });
    this._getRecords();
  },
  onToHistory() {
    console.log("到历史页面");
    my.navigateTo({
      url:
        "/page/checkin/checkin-history/checkin-history?page=stats&items=" +
        JSON.stringify(this.data.items),
    });
  },
  async _getOwnDeptRecord() {
    const date = this.data.date,
      size = this.data.size,
      hasMore = this.data.hasMore;
    let current = this.data.current;

    if (hasMore) {
      current += 1;
      getOwnDeptRecord({ current, date, size })
        .then((res) => {
          console.log("获取本部门签到信息", res);
          this._renderData(res);
        })
        .catch((err) => console.error(err));
    }
  },
  async _getRecord() {
    const date = this.data.date,
      userIds = this.data.userIds,
      size = this.data.size,
      hasMore = this.data.hasMore;
    let current = this.data.current;
    if (hasMore) {
      current += 1;
      getRecord({ current, userIds, date, size })
        .then((res) => {
          console.log("获取选择人员签到信息", res);
          this._renderData(res);
        })
        .catch((err) => console.error(err));
    }
  },
  async _getDeptInfo(opt) {
    const dingUserId = await app.globalData.userInfo.user.dingUserId;
    getDeptInfo({ dingUserId, ...opt })
      .then((res) => {
        console.log("获取当前部门信息", res);
        this.setData({
          dept: res,
        });
      })
      .catch((err) => console.error(err));
  },
  _renderData(res) {
    const checkinNums = res.signInQty,
      uncheckinNums = res.notSignInList.length,
      pages = Number(res.signInHisPage.pages),
      current = Number(res.signInHisPage.current),
      notSignRecords = res.notSignInList,
      items = [...this.data.items, ...res.signInHisPage.records];
    this.setData({
      "tabs[0].title": checkinNums,
      "tabs[1].title": uncheckinNums,
      pages,
      current,
      notSignRecords,
      items,
    });
  },
  _getRecords() {
    if (this.data.userNum > 0) {
      this._getRecord();
    } else {
      this._getOwnDeptRecord();
    }
  },
});
