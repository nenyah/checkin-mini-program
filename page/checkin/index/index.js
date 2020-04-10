import { formatDate } from "/util/utils.js";
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
    visitsPerson: "",
    today: "",
    ctime: "",
    company: "华东宁波医药有限公司"
  },
  adjustLocation() {
    dd.openLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      address: this.data.address,
      success:(res)=>{
        console.log(res)
      }
    });
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
    const date = new Date();
    const today = formatDate(date, "YY年MM月DD日");
    this.setData({
      today
    });
    this.mapCtx = my.createMapContext('map')
    // for(let i in this.mapCtx){
    //   console.log('功能',typeof i,i)
    // }
    console.log('element',this.mapCtx.element)
    console.log('page',this.mapCtx.page)
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
          "markers[0].latitude": res.latitude,
          "markers[0].longitude": res.longitude
        });
      },
      fail: () => {
        dd.alert({ title: "定位失败" });
      }
    });
  },
  getValue(e) {
    console.log("index page", e);
    const visitsPerson = e;
    this.setData({
      visitsPerson
    });
  }
});
