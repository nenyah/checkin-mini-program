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
    dept: "",
    userNum: 0,
    userIds: [],
    date: "",
    pages: 0,
    current: 0,
    size: 50,
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
    // console.log("统计页向下");
    const pages = this.data.pages,
      date = this.data.date,
      userIds = this.data.userIds,
      size = this.data.size;
    let current = this.data.current;

    if (this.data.userNum > 0) {
      if (pages > current) {
        current += current;
        this._getRecord({ userIds, date, current, size });
      }
    } else {
      if (pages > current) {
        current += current;
        this._getOwnDeptRecord({ current, size });
      }
    }
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
      current: 0,
      pages: 0,
    });
    if (this.data.userNum > 0) {
      this._getRecord({ userIds: this.data.userIds, date: data });
    } else {
      this._getOwnDeptRecord({ date: data });
    }
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
      current: 0,
      pages: 0,
    });
    this._getRecord({ userIds: myusers, date: this.data.date });
  },
  onToHistory() {
    console.log("到历史页面");
    my.navigateTo({
      url:
        "/page/checkin/checkin-history/checkin-history?page=stats&items=" +
        JSON.stringify(this.data.items),
    });
  },
  async _getOwnDeptRecord(opt) {
    getOwnDeptRecord({ ...opt })
      .then((res) => {
        console.log("获取本部门签到信息", res);
        this._renderData(res);
      })
      .catch((err) => console.error(err));
  },
  async _getRecord(opt) {
    getRecord({ ...opt })
      .then((res) => {
        console.log("获取选择人员签到信息", res);
        this._renderData(res);
      })
      .catch((err) => console.error(err));
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
      pages = res.signInHisPage.pages,
      current = res.signInHisPage.current,
      items = res;
    this.setData({
      "tabs[0].title": checkinNums,
      "tabs[1].title": uncheckinNums,
      pages,
      current,
      items,
    });
  },
});
