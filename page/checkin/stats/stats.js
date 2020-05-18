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
  },
  onLoad() {
    //
    this.setData({
      date: moment(app.globalData.currentTime).format('YYYY-MM-DD'),
    });
    this._getDeptInfo();
    this._getOwnDeptRecord();
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
    });
    if (this.data.userIds.length) {
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
        const checkinNums = res.signInQty;
        const uncheckinNums = res.notSignInList.length;
        const items = res;
        this.setData({
          "tabs[0].title": checkinNums,
          "tabs[1].title": uncheckinNums,
          items,
        });
      })
      .catch((err) => console.error(err));
  },
  async _getRecord(opt) {
    getRecord({ ...opt })
      .then((res) => {
        console.log("获取选择人员签到信息", res);
        const checkinNums = res.signInQty;
        const uncheckinNums = res.notSignInList.length;
        const items = res;
        this.setData({
          "tabs[0].title": checkinNums,
          "tabs[1].title": uncheckinNums,
          items,
        });
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
});
