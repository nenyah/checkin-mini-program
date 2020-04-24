import moment from "moment";
Page({
  data: {
    item: {
      date: "4月14日",
      time: "10:46",
      place: "宁波市公安局北仑分局交通警察大队大碶中队",
      detailPlace: "浙江省宁波市北仑区大碶街道大浦河北路",
      remark:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aperiam, mollitia repudiandae alias officiis aliquid aliquam repellat, voluptas necessitatibus rerum quae, explicabo unde accusantium fugit vel debitis! Est, nemo quos!",
      org: { name: "华东宁波医药有限公司" },
      picUrls: [],
      latitude: "29.903595",
      longitude: "121.79692",
    },
    markers: [
      {
        iconPath: "/assets/images/location.png",
        id: 1,
        latitude: 29.903595,
        longitude: 121.796925,
        width: 38,
        height: 38,
      },
    ],
  },
  onLoad(query) {
    // console.log('签到详情',query)
    const item = JSON.parse(query.item);
    item.date = moment(item.date, "YYYY-MM-DD").format("MM月dd日");
    item.time = moment(item.time, "hh:mm:ss").format("hh:mm");
    console.log("签到详情", item);
    this.setData({
      item,
    });
  },
});
