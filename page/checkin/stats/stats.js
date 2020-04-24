import { getRecord, getOwnDeptRecord } from "/service/record";
import { getStorageSync } from "/service/storage";
import { getDeptInfo } from "/service/dept";
// 有签到信息
const items = {
  checkin: [
    {
      name: "陈士明",
      workcode: "NB1859",
      lastTime: "08:58",
      checkInTimes: 3,
      remark: "test1",
      address: "宁波市公安局北仑分局交通警察大队",
      picUrl: "/assets/images/fake1.jpg",
    },
    {
      name: "李丽",
      workcode: "NB1491",
      lastTime: "09:58",
      checkInTimes: 4,
      address: "宁波市公安局北仑分局交通警察大队",
    },
    {
      name: "邬顶立",
      workcode: "NB1467",
      lastTime: "10:58",
      checkInTimes: 1,
      address: "宁波市公安局北仑分局交通警察大队",
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕",
      workcode: "NB1428",
      lastTime: "09:53",
      checkInTimes: 1,
      address: "宁波市公安局北仑分局交通警察大队",
    },
  ],
  uncheckin: [
    {
      name: "陈士明",
    },
    {
      name: "李丽",
    },
    {
      name: "邬顶立",
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕",
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕1",
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕2",
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕3",
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕4",
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕5",
    },
  ],
};

Page({
  data: {
    tabs: [
      { title: "1", subTitle: "最新签到" },
      { title: "7", subTitle: "未签到" },
    ],
    activeTab: 0,
    items: items,
    dept: "",
  },
  onLoad() {
    //
    this._getOwnDeptRecord();
    this._getDeptInfo();
  },
  onTabClick(e) {
    this.setData({
      activeTab: e.index,
    });
  },
  onGetNewDate(data) {
    console.log("统计页获得日期数据", data);
    this._getOwnDeptRecord({ date: data });
  },
  onGetNewDept(data) {
    console.log("统计页获得部门数据", data);
    this._getOwnDeptRecord({ date: data });
  },
  async _getOwnDeptRecord(opt) {
    getOwnDeptRecord({ ...opt })
      .then((res) => {
        console.log(res);
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
    const dingUserId = await getStorageSync("userinfo").data.user.dingUserId;
    getDeptInfo({ dingUserId, ...opt })
      .then((res) => {
        console.log(res);
        this.setData({
          dept: res.deptName,
        });
      })
      .catch((err) => console.error(err));
  },
});
