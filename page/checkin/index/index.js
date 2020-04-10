Page({
  data: {
    longitude: "",
    latitude: "",
    name: "",
    address: "宁波市公安局北仑分局交通警察大队",
    markers: [
      {
        iconPath: "/assets/images/location.png",
        id: 10,
        latitude: 30.279383,
        longitude: 120.131441,
        width: 26,
        height: 26
      }
    ],
    visitsPerson:"",
  },
  openLocation() {
    dd.openLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      name: this.data.name,
      address: this.data.address
    });
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    my.getLocation({
      success: res => {
        console.log(res);
        this.setData({
          hasLocation: false,
          longitude: res.longitude,
          latitude: res.latitude,
          address: res.address,
          'markers[0].latitude':res.latitude,
          'markers[0].longitude':res.longitude,
        });
      },
      fail: () => {
        dd.alert({ title: "定位失败" });
      }
    });
  },
  getValue(e){
    console.log('index page',e)
    const visitsPerson = e
    this.setData({
      visitsPerson
    })
  },
 
});
