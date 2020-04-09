// 有签到信息
const items = {
  checkin: [
    {
      name: "陈士明",
      lastTime: "08:58",
      checkInTimes: 3,
      remark: "test1",
      address: "宁波市公安局北仑分局交通警察大队",
      picUrl: "/assets/images/fake1.jpg"
    },
    {
      name: "李丽",
      lastTime: "09:58",
      checkInTimes: 4,
      address: "宁波市公安局北仑分局交通警察大队"
    },
    {
      name: "邬顶立",
      lastTime: "10:58",
      checkInTimes: 1,
      address: "宁波市公安局北仑分局交通警察大队"
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕",
      lastTime: "09:53",
      checkInTimes: 1,
      address: "宁波市公安局北仑分局交通警察大队"
    }
  ],
  uncheckin: [
    {
      name: "陈士明"
    },
    {
      name: "李丽"
    },
    {
      name: "邬顶立"
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕"
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕1"
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕2"
    },
    {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕3"
    },
        {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕4"
    },
        {
      thumbAvatar: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕5"
    }
  ]
};

Page({
  data: {
    tabs: [
      { title: "1", subTitle: "最新签到" },
      { title: "7", subTitle: "未签到" }
    ],
    activeTab: 1,
    items: items
  },
  onLoad() {},
  onTabClick(e) {
    this.setData({
      activeTab: e.index
    });
  }
});
