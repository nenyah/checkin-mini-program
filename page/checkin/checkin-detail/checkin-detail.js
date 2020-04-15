Page({
  data: {
    item: {
      checkIndate: "4月14日",
      ctime: "10:46",
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
    console.log("签到详情", item);
  },
});
