import { formatDate } from "/util/utils.js";
Page({
  data: {
    month: "2020-04",
    userInfo: {
      avtarImg: "/assets/images/pan_avatar.jpg",
      name: "潘燕燕",
      monthCheckinTimes: 5,
      company: "华东宁波医药有限公司",
    },
    items: [
      {
        checkIndate: "4月14日",
        ctime: "10:46",
        title: "宁波市公安局北仑分局交通警察大队大碶中队",
        address: "浙江省宁波市北仑区大碶街道大浦河北路",
        remark: "",
        visitsPerons: "华东宁波医药有限公司",
        picUrls: [
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
        ],
        location: [121.796925, 29.903595],
      },
      {
        checkIndate: "4月10日",
        ctime: "10:46",
        title: "宁波市公安局北仑分局交通警察大队大碶中队",
        address: "浙江省宁波市北仑区大碶街道大浦河北路",
        remark:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aperiam, mollitia repudiandae alias officiis aliquid aliquam repellat, voluptas necessitatibus rerum quae, explicabo unde accusantium fugit vel debitis! Est, nemo quos!",
        visitsPerons: "华东宁波医药有限公司",
        picUrls: [],
        location: [121.796925, 29.903595],
      },
      {
        checkIndate: "4月14日",
        ctime: "11:46",
        title: "宁波市公安局北仑分局交通警察大队大碶中队",
        address: "浙江省宁波市北仑区大碶街道大浦河北路",
        remark:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aperiam, mollitia repudiandae alias officiis aliquid aliquam repellat, voluptas necessitatibus rerum quae, explicabo unde accusantium fugit vel debitis! Est, nemo quos!",
        visitsPerons: "华东宁波医药有限公司",
        picUrls: [
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
          "/image/fake1.jpg",
        ],
        location: [121.796925, 29.903595],
      },
    ],
  },
  onLoad(query) {
    console.log("我的", query.user);
    const month = formatDate(new Date(), "YY-MM");
    console.log(month);
    this.setData({
      month,
    });
  },
  pickMonth() {
    // 更改月份
    my.datePicker({
      format: "yyyy-MM",
      currentDate: this.data.month,
      success: res => {
        this.setData({
          month: res.date,
        });
        // TODO 向服务器获取对应月份历史记录
        // 或者从缓存中获取？
      },
    });
  },
  onClickCard(item) {
    console.log("我的页面",item);
  
    my.navigateTo({
      url: `/page/checkin/checkin-detail/checkin-detail?item=${JSON.stringify(item)}`,
    });
  },
});
